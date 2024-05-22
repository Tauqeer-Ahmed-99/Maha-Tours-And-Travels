import React, { useContext, useState, useEffect } from "react";
import InvoicesContext from "./InvoicesContext";
import { Invoice, InvoiceContext } from "./invoicesTypes";
import { Amounts, Customer, Payment, Response } from "@src/utilities/models";
import { ResponseStatus, TravellingType } from "@src/utilities/types";
import axios, { AxiosError } from "axios";
import AuthContext from "../auth/AuthContext";
import { getPaymentType, parseInvoices } from "@src/utilities/utils";

const InvoicesProvider = ({ children }: { children: React.ReactNode }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("No Error.");

  const authContext = useContext(AuthContext);

  const loadInvoices = async () => {
    try {
      setIsLoading(true);
      const authToken = await authContext.user?.getIdToken();

      const url =
        import.meta.env.VITE_RTDB_BASE_URL +
        `/invoices.json?orderBy="isActive"&equalTo=true&auth=${authToken}`;

      const res = await axios.get(url);

      const parsedInvoices = parseInvoices(res.data);

      setInvoices(parsedInvoices);
      setIsLoading(false);

      return new Response(ResponseStatus.SUCCESS, res);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      setIsError(true);
      setErrorMessage(error.message);
      setIsLoading(false);
      return new Response(ResponseStatus.ERROR, undefined, error);
    }
  };

  const generateInvoiceNumber = async () => {
    const authToken = await authContext.user?.getIdToken();
    const url =
      import.meta.env.VITE_RTDB_BASE_URL +
      `/totalNumberOfInvoices.json?auth=${authToken}`;

    const res = await axios.get(url);

    const invoiceNumber = res.data ? parseInt(res.data) + 1 : 1;

    await axios.put(url, invoiceNumber);

    return invoiceNumber;
  };

  const rollbackInvoiceNumber = async () => {
    try {
      const authToken = await authContext.user?.getIdToken();
      const url =
        import.meta.env.VITE_RTDB_BASE_URL +
        `/totalNumberOfInvoices.json?auth=${authToken}`;

      const res = await axios.get(url);

      const invoiceNumber = res.data ? parseInt(res.data) - 1 : 0;

      await axios.put(url, invoiceNumber);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      setIsError(true);
      setErrorMessage(error.message);
    }
  };

  const createNewInvoice = async () => {
    const invoice: Invoice = {
      billToCustomer: new Customer(),
      invoiceNumber: Number(),
      isBillToATraveller: true,
      amounts: new Amounts(1, 0, 5, 5),
      travellingType: TravellingType.HAJJ,
      customers: [],
      payments: [],
      returnPayments: [],
      date: new Date(),
    };

    try {
      setIsLoading(true);
      const authToken = await authContext.user?.getIdToken();

      const url =
        import.meta.env.VITE_RTDB_BASE_URL + `/invoices.json?auth=${authToken}`;

      const invoiceNumber = await generateInvoiceNumber();

      invoice.invoiceNumber = invoiceNumber;

      const res = await axios.post(
        url,
        JSON.stringify({ ...invoice, isActive: true })
      );

      invoice.invoiceId = res.data.name;

      setInvoices((prevInvocies) => [...prevInvocies, invoice]);

      setIsLoading(false);

      return new Response(ResponseStatus.SUCCESS, res);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      await rollbackInvoiceNumber();
      setIsLoading(false);
      setIsError(true);
      setErrorMessage(error.message);
      return new Response(ResponseStatus.ERROR, undefined, error);
    }
  };

  const saveInvoice = async (invoice: Invoice) => {
    try {
      const authToken = await authContext.user?.getIdToken();

      const url =
        import.meta.env.VITE_RTDB_BASE_URL +
        `/invoices/${invoice.invoiceId}.json?auth=${authToken}`;

      const data = JSON.stringify({
        ...invoice,
        customers: undefined,
        payments: undefined,
      });

      const res = await axios.patch(url, data);

      setInvoices((invoices) =>
        invoices.map((_invoice) =>
          _invoice.invoiceId === invoice.invoiceId ? invoice : _invoice
        )
      );

      return new Response(ResponseStatus.SUCCESS, res);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      setIsError(true);
      setErrorMessage(error.message);
      return new Response(ResponseStatus.ERROR, undefined, error);
    }
  };

  const deleteInvoice = async (invoice: Invoice) => {
    try {
      const authToken = await authContext.user?.getIdToken();

      const url =
        import.meta.env.VITE_RTDB_BASE_URL +
        `/invoices/${invoice.invoiceId}.json?auth=${authToken}`;

      const res = await axios.patch(url, JSON.stringify({ isActive: false }));

      setInvoices((invoices) =>
        invoices.filter((_invoice) => _invoice.invoiceId !== invoice.invoiceId)
      );

      return new Response(ResponseStatus.SUCCESS, res);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      setIsError(true);
      setErrorMessage(error.message);
      return new Response(ResponseStatus.ERROR, undefined, error);
    }
  };

  const addCustomer = async (invoice: Invoice, customer: Customer) => {
    try {
      const authToken = await authContext.user?.getIdToken();

      const url =
        import.meta.env.VITE_RTDB_BASE_URL +
        `/invoices/${invoice.invoiceId}/customers.json?auth=${authToken}`;

      delete customer.customerId;

      const res = await axios.post(url, JSON.stringify(customer));

      customer.customerId = res.data.name;

      setInvoices((invoices) =>
        invoices.map((_invoice) =>
          _invoice.invoiceId === invoice.invoiceId
            ? {
                ..._invoice,
                travellingType: invoice.travellingType,
                billToCustomer: invoice.billToCustomer,
                isBillToATraveller: invoice.isBillToATraveller,
                customers: [..._invoice.customers, customer],
                amounts: new Amounts(
                  _invoice.customers.length +
                    (invoice.isBillToATraveller ? 2 : 1),
                  _invoice.amounts.pricePerUnit,
                  _invoice.amounts.gstPercent,
                  _invoice.amounts.tcsPercent
                ),
              }
            : _invoice
        )
      );
      return new Response(ResponseStatus.SUCCESS, res);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      setIsError(true);
      setErrorMessage(error.message);
      return new Response(ResponseStatus.ERROR, undefined, error);
    }
  };

  const saveAmounts = async (invoice: Invoice, amounts: Amounts) => {
    try {
      const authToken = await authContext.user?.getIdToken();

      const url =
        import.meta.env.VITE_RTDB_BASE_URL +
        `/invoices/${invoice.invoiceId}/amounts.json?auth=${authToken}`;

      const res = await axios.put(url, amounts);

      setInvoices((invoices) =>
        invoices.map((_invoice) =>
          _invoice.invoiceId === invoice.invoiceId
            ? {
                ..._invoice,
                travellingType: invoice.travellingType,
                billToCustomer: invoice.billToCustomer,
                isBillToATraveller: invoice.isBillToATraveller,
                amounts,
              }
            : _invoice
        )
      );

      return new Response(ResponseStatus.SUCCESS, res);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      setIsError(true);
      setErrorMessage(error.message);
      return new Response(ResponseStatus.ERROR, undefined, error);
    }
  };

  const addPayment = async (invoice: Invoice, payment: Payment, returnPayment?: boolean | false) => {
    const type = returnPayment ? "returnPayments" : "payments";
    try {
      const authToken = await authContext.user?.getIdToken();

      const url =
        import.meta.env.VITE_RTDB_BASE_URL +
        `/invoices/${invoice.invoiceId}/${type}.json?auth=${authToken}`;

      delete payment.paymentId;

      const res = await axios.post(url, JSON.stringify(payment));

      payment.paymentId = res.data.name;

      setInvoices((invoices) =>
        invoices.map((_invoice) =>
          _invoice.invoiceId === invoice.invoiceId
            ? {
                ..._invoice,
                travellingType: invoice.travellingType,
                billToCustomer: invoice.billToCustomer,
                isBillToATraveller: invoice.isBillToATraveller,
                [type]: [..._invoice[type], payment],
              }
            : _invoice
        )
      );
      return new Response(ResponseStatus.SUCCESS, res);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      setIsError(true);
      setErrorMessage(error.message);
      return new Response(ResponseStatus.ERROR, undefined, error);
    }
  };
  const addReturnPayment = async (invoice: Invoice, payment: Payment) => {
    try {
      const authToken = await authContext.user?.getIdToken();

      const url =
        import.meta.env.VITE_RTDB_BASE_URL +
        `/invoices/${invoice.invoiceId}/payments.json?auth=${authToken}`;

      delete payment.paymentId;

      const res = await axios.post(url, JSON.stringify(payment));

      payment.paymentId = res.data.name;

      setInvoices((invoices) =>
        invoices.map((_invoice) =>
          _invoice.invoiceId === invoice.invoiceId
            ? {
                ..._invoice,
                travellingType: invoice.travellingType,
                billToCustomer: invoice.billToCustomer,
                isBillToATraveller: invoice.isBillToATraveller,
                payments: [..._invoice.returnPayments, payment],
              }
            : _invoice
        )
      );
      return new Response(ResponseStatus.SUCCESS, res);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      setIsError(true);
      setErrorMessage(error.message);
      return new Response(ResponseStatus.ERROR, undefined, error);
    }
  };

  const editCustomer = async (invoice: Invoice, customer: Customer) => {
    try {
      const authToken = await authContext.user?.getIdToken();

      const url =
        import.meta.env.VITE_RTDB_BASE_URL +
        `/invoices/${invoice.invoiceId}/customers/${customer.customerId}.json?auth=${authToken}`;

      const res = await axios.patch(url, customer);

      setInvoices((invoices) =>
        invoices.map((_invoice) =>
          _invoice.invoiceId === invoice.invoiceId
            ? {
                ..._invoice,
                travellingType: invoice.travellingType,
                billToCustomer: invoice.billToCustomer,
                isBillToATraveller: invoice.isBillToATraveller,
                customers: _invoice.customers.map((_customer) =>
                  _customer.customerId === customer.customerId
                    ? customer
                    : _customer
                ),
              }
            : _invoice
        )
      );
      return new Response(ResponseStatus.SUCCESS, res);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      setIsError(true);
      setErrorMessage(error.message);
      return new Response(ResponseStatus.ERROR, undefined, error);
    }
  };

  const editPayment = async (invoice: Invoice, payment: Payment, returnPayment: boolean | false) => {
    const type = getPaymentType(returnPayment);
    try {
      const authToken = await authContext.user?.getIdToken();

      const url =
        import.meta.env.VITE_RTDB_BASE_URL +
        `/invoices/${invoice.invoiceId}/${type}/${payment.paymentId}.json?auth=${authToken}`;

      const res = await axios.patch(url, payment);

      setInvoices((invoices) =>
        invoices.map((_invoice) =>
          _invoice.invoiceId === invoice.invoiceId
            ? {
                ..._invoice,
                travellingType: invoice.travellingType,
                billToCustomer: invoice.billToCustomer,
                isBillToATraveller: invoice.isBillToATraveller,
                [type]: _invoice[type].map((_payment) =>
                  _payment.paymentId === payment.paymentId ? payment : _payment
                ),
              }
            : _invoice
        )
      );
      return new Response(ResponseStatus.SUCCESS, res);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      setIsError(true);
      setErrorMessage(error.message);
      return new Response(ResponseStatus.ERROR, undefined, error);
    }
  };

  const removeCustomer = async (invoice: Invoice, customerId: string) => {
    try {
      const authToken = await authContext.user?.getIdToken();

      const url =
        import.meta.env.VITE_RTDB_BASE_URL +
        `/invoices/${invoice.invoiceId}/customers/${customerId}.json?auth=${authToken}`;

      const res = await axios.delete(url);

      setInvoices((invoices) =>
        invoices.map((_invoice) =>
          _invoice.invoiceId === invoice.invoiceId
            ? {
                ..._invoice,
                travellingType: invoice.travellingType,
                billToCustomer: invoice.billToCustomer,
                isBillToATraveller: invoice.isBillToATraveller,
                customers: _invoice.customers.filter(
                  (_customer) => _customer.customerId !== customerId
                ),
                amounts: new Amounts(
                  _invoice.customers.length -
                    (invoice.isBillToATraveller ? 0 : 1),
                  _invoice.amounts.pricePerUnit,
                  _invoice.amounts.gstPercent,
                  _invoice.amounts.tcsPercent
                ),
              }
            : _invoice
        )
      );
      return new Response(ResponseStatus.SUCCESS, res);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      setIsError(true);
      setErrorMessage(error.message);
      return new Response(ResponseStatus.ERROR, undefined, error);
    }
  };

  const removePayment = async (invoice: Invoice, paymentId: string, returnPayment: boolean | false) => {
    const type = getPaymentType(returnPayment);
    try {
      const authToken = await authContext.user?.getIdToken();

      const url =
        import.meta.env.VITE_RTDB_BASE_URL +
        `/invoices/${invoice.invoiceId}/${type}/${paymentId}.json?auth=${authToken}`;

      const res = await axios.delete(url);

      setInvoices((invoices) =>
        invoices.map((_invoice) =>
          _invoice.invoiceId === invoice.invoiceId
            ? {
                ..._invoice,
                travellingType: invoice.travellingType,
                billToCustomer: invoice.billToCustomer,
                isBillToATraveller: invoice.isBillToATraveller,
                [type]: _invoice[type].filter(
                  (_payment) => _payment.paymentId !== paymentId
                ),
              }
            : _invoice
        )
      );
      return new Response(ResponseStatus.SUCCESS, res);
    } catch (err) {
      const error = err as AxiosError;
      console.log(error);
      setIsError(true);
      setErrorMessage(error.message);
      return new Response(ResponseStatus.ERROR, undefined, error);
    }
  };

  const clearErrors = () => {
    setErrorMessage("No Error.");
    setIsError(false);
  };

  useEffect(() => {
    if (authContext.user) {
      loadInvoices();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authContext.user]);

  const context: InvoiceContext = {
    invoices,
    isLoading,
    isError,
    errorMessage,
    createNewInvoice,
    saveInvoice,
    deleteInvoice,
    addCustomer,
    editCustomer,
    removeCustomer,
    saveAmounts,
    addPayment,
    addReturnPayment,
    editPayment,
    removePayment,
    clearErrors,
  };

  return (
    <InvoicesContext.Provider value={context}>
      {children}
    </InvoicesContext.Provider>
  );
};

export default InvoicesProvider;
