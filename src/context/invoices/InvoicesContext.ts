/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from "react";
import { Amounts, Customer, Payment, Response } from "@src/utilities/models";
import { Invoice, InvoiceContext } from "./invoicesTypes";
import { ResponseStatus } from "@src/utilities/types";

const invoicesContext: InvoiceContext = {
  invoices: [],
  isLoading: false,
  isError: false,
  errorMessage: "No Error.",
  saveInvoice: async (_invoice: Invoice) =>
    new Response(ResponseStatus.SUCCESS),
  createNewInvoice: async () => new Response(ResponseStatus.SUCCESS),
  addCustomer: async (_invoiceId: string, _customer: Customer) =>
    new Response(ResponseStatus.SUCCESS),
  editCustomer: async (_invoiceId: string, _customer: Customer) =>
    new Response(ResponseStatus.SUCCESS),
  saveAmounts: async (_invocieId: string, _amounts: Amounts) =>
    new Response(ResponseStatus.SUCCESS),
  addPayment: async (_invoiceId: string, _payment: Payment) =>
    new Response(ResponseStatus.SUCCESS),
  editPayment: async (_invoiceId: string, _payment: Payment) =>
    new Response(ResponseStatus.SUCCESS),
  removeCustomer: async (_invoiceId: string, _customerId: string) =>
    new Response(ResponseStatus.SUCCESS),
  removePayment: async (_invoiceId: string, _paymentId: string) =>
    new Response(ResponseStatus.SUCCESS),
  clearErrors: () => {},
};

const InvoicesContext = createContext<InvoiceContext>(invoicesContext);

export default InvoicesContext;
