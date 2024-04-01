import React, { useContext, useState, useEffect } from "react";
import InvoicesContext from "./InvoicesContext";
import { Invoice, InvoiceContext } from "./invoicesTypes";
import { Amounts, Customer, Payment, Response } from "@src/utilities/models";
import { ResponseStatus, TravellingType } from "@src/utilities/types";
import axios, { AxiosError } from "axios";
import AuthContext from "../auth/AuthContext";
import { parseInvoices } from "@src/utilities/utils";

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
        import.meta.env.VITE_RTDB_BASE_URL + `/invoices.json?auth=${authToken}`;

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
      amounts: new Amounts(1, 500000, 5, 5),
      travellingType: TravellingType.HAJJ,
      customers: [],
      payments: [],
      date: new Date(),
    };

    try {
      setIsLoading(true);
      const authToken = await authContext.user?.getIdToken();

      const url =
        import.meta.env.VITE_RTDB_BASE_URL + `/invoices.json?auth=${authToken}`;

      const invoiceNumber = await generateInvoiceNumber();

      invoice.invoiceNumber = invoiceNumber;

      const res = await axios.post(url, JSON.stringify(invoice));

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
          _invoice.invoiceId === invoice.invoiceId ? invoice : _invoice,
        ),
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

  const deleteInvoice = async (invoiceId: string) => {
    try {
      const authToken = await authContext.user?.getIdToken();

      const url =
        import.meta.env.VITE_RTDB_BASE_URL +
        `/invoices/${invoiceId}.json?auth=${authToken}`;

      const res = await axios.delete(url);

      setInvoices((invoices) =>
        invoices.filter((invoice) => invoice.invoiceId !== invoiceId),
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

  const addCustomer = async (invoiceId: string, customer: Customer) => {
    try {
      const authToken = await authContext.user?.getIdToken();

      const url =
        import.meta.env.VITE_RTDB_BASE_URL +
        `/invoices/${invoiceId}/customers.json?auth=${authToken}`;

      delete customer.customerId;

      const res = await axios.post(url, JSON.stringify(customer));

      customer.customerId = res.data.name;

      setInvoices((invoices) =>
        invoices.map((_invoice) =>
          _invoice.invoiceId === invoiceId
            ? { ..._invoice, customers: [..._invoice.customers, customer] }
            : _invoice,
        ),
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

  const saveAmounts = async (invoiceId: string, amounts: Amounts) => {
    try {
      const authToken = await authContext.user?.getIdToken();

      const url =
        import.meta.env.VITE_RTDB_BASE_URL +
        `/invoices/${invoiceId}/amounts.json?auth=${authToken}`;

      const res = await axios.put(url, amounts);

      setInvoices((invoices) =>
        invoices.map((_invoice) =>
          _invoice.invoiceId === invoiceId
            ? { ..._invoice, amounts }
            : _invoice,
        ),
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

  const addPayment = async (invoiceId: string, payment: Payment) => {
    try {
      const authToken = await authContext.user?.getIdToken();

      const url =
        import.meta.env.VITE_RTDB_BASE_URL +
        `/invoices/${invoiceId}/payments.json?auth=${authToken}`;

      delete payment.paymentId;

      const res = await axios.post(url, JSON.stringify(payment));

      payment.paymentId = res.data.name;

      setInvoices((invoices) =>
        invoices.map((_invoice) =>
          _invoice.invoiceId === invoiceId
            ? { ..._invoice, payments: [..._invoice.payments, payment] }
            : _invoice,
        ),
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

  const editCustomer = async (invoiceId: string, customer: Customer) => {
    try {
      const authToken = await authContext.user?.getIdToken();

      const url =
        import.meta.env.VITE_RTDB_BASE_URL +
        `/invoices/${invoiceId}/customers/${customer.customerId}.json?auth=${authToken}`;

      const res = await axios.patch(url, customer);

      setInvoices((invoices) =>
        invoices.map((_invoice) =>
          _invoice.invoiceId === invoiceId
            ? {
                ..._invoice,
                customers: _invoice.customers.map((_customer) =>
                  _customer.customerId === customer.customerId
                    ? customer
                    : _customer,
                ),
              }
            : _invoice,
        ),
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

  const editPayment = async (invoiceId: string, payment: Payment) => {
    try {
      const authToken = await authContext.user?.getIdToken();

      const url =
        import.meta.env.VITE_RTDB_BASE_URL +
        `/invoices/${invoiceId}/payments/${payment.paymentId}.json?auth=${authToken}`;

      const res = await axios.patch(url, payment);

      setInvoices((invoices) =>
        invoices.map((_invoice) =>
          _invoice.invoiceId === invoiceId
            ? {
                ..._invoice,
                payments: _invoice.payments.map((_payment) =>
                  _payment.paymentId === payment.paymentId ? payment : _payment,
                ),
              }
            : _invoice,
        ),
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

  const removeCustomer = async (invoiceId: string, customerId: string) => {
    try {
      const authToken = await authContext.user?.getIdToken();

      const url =
        import.meta.env.VITE_RTDB_BASE_URL +
        `/invoices/${invoiceId}/customers/${customerId}.json?auth=${authToken}`;

      const res = await axios.delete(url);

      setInvoices((invoices) =>
        invoices.map((_invoice) =>
          _invoice.invoiceId === invoiceId
            ? {
                ..._invoice,
                customers: _invoice.customers.filter(
                  (_customer) => _customer.customerId !== customerId,
                ),
              }
            : _invoice,
        ),
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

  const removePayment = async (invoiceId: string, paymentId: string) => {
    try {
      const authToken = await authContext.user?.getIdToken();

      const url =
        import.meta.env.VITE_RTDB_BASE_URL +
        `/invoices/${invoiceId}/payments/${paymentId}.json?auth=${authToken}`;

      const res = await axios.delete(url);

      setInvoices((invoices) =>
        invoices.map((_invoice) =>
          _invoice.invoiceId === invoiceId
            ? {
                ..._invoice,
                payments: _invoice.payments.filter(
                  (_payment) => _payment.paymentId !== paymentId,
                ),
              }
            : _invoice,
        ),
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
