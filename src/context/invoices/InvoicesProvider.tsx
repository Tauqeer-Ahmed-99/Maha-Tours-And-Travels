import React, { useContext, useState, useEffect } from "react";
import InvoicesContext from "./InvoicesContext";
import { Invoice, InvoiceContext } from "./invoicesTypes";
import { Amounts, Customer, Payment } from "@src/utilities/models";
import { TravellingType } from "@src/utilities/types";
import axios from "axios";
import AuthContext from "../auth/AuthContext";
import { parseInvoices } from "@src/utilities/utils";

const InvoicesProvider = ({ children }: { children: React.ReactNode }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const createNewInvoice = async () => {
    const invoice: Invoice = {
      billToCustomer: new Customer(),
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

      const url = import.meta.env.VITE_RTDB_BASE_URL + `/invoices.json`;

      const res = await axios.post(url, JSON.stringify(invoice), {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      invoice.invoiceId = res.data.name;

      setInvoices((prevInvocies) => [...prevInvocies, invoice]);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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

      await axios.patch(url, data);

      setInvoices((invoices) =>
        invoices.map((_invoice) =>
          _invoice.invoiceId === invoice.invoiceId ? invoice : _invoice
        )
      );
    } catch (error) {
      console.log(error);
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
            : _invoice
        )
      );
    } catch (error) {
      console.log(error);
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
            : _invoice
        )
      );
    } catch (error) {
      console.log(error);
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
                    : _customer
                ),
              }
            : _invoice
        )
      );
    } catch (error) {
      console.log(error);
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
                  _payment.paymentId === payment.paymentId ? payment : _payment
                ),
              }
            : _invoice
        )
      );
    } catch (error) {
      console.log(error);
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
                  (_customer) => _customer.customerId !== customerId
                ),
              }
            : _invoice
        )
      );
    } catch (error) {
      console.log(error);
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
                  (_payment) => _payment.paymentId !== paymentId
                ),
              }
            : _invoice
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (authContext.user) {
      loadInvoices();
    }
  }, [authContext.user]);

  const context: InvoiceContext = {
    invoices,
    isLoading,
    createNewInvoice,
    saveInvoice,
    addCustomer,
    editCustomer,
    removeCustomer,
    addPayment,
    editPayment,
    removePayment,
  };

  return (
    <InvoicesContext.Provider value={context}>
      {children}
    </InvoicesContext.Provider>
  );
};

export default InvoicesProvider;
