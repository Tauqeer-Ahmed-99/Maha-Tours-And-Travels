import { Customer, Payment } from "@src/utilities/models";
import { createContext } from "react";
import { Invoice, InvoiceContext } from "./invoicesTypes";

const invoicesContext: InvoiceContext = {
  invoices: [],
  isLoading: false,
  saveInvoice: async (_invoice: Invoice) => {},
  createNewInvoice: async () => {},
  addCustomer: async (_invoiceId: string, _customer: Customer) => {},
  editCustomer: async (_invoiceId: string, _customer: Customer) => {},
  addPayment: async (_invoiceId: string, _payment: Payment) => {},
  editPayment: async (_invoiceId: string, _payment: Payment) => {},
  removeCustomer: async (_invoiceId: string, _customerId: string) => {},
  removePayment: async (_invoiceId: string, _paymentId: string) => {},
};

const InvoicesContext = createContext<InvoiceContext>(invoicesContext);

export default InvoicesContext;
