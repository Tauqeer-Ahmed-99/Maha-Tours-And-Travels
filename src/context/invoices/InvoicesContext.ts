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
  addCustomer: async (_invoice: Invoice, _customer: Customer) =>
    new Response(ResponseStatus.SUCCESS),
  editCustomer: async (_invoice: Invoice, _customer: Customer) =>
    new Response(ResponseStatus.SUCCESS),
  saveAmounts: async (_invoice: Invoice, _amounts: Amounts) =>
    new Response(ResponseStatus.SUCCESS),
  addPayment: async (
    _invoice: Invoice,
    _payment: Payment,
    _returnPayment?: boolean,
  ) => new Response(ResponseStatus.SUCCESS),
  editPayment: async (
    _invoice: Invoice,
    _payment: Payment,
    _returnPaymen?: boolean,
  ) => new Response(ResponseStatus.SUCCESS),
  removeCustomer: async (_invoice: Invoice, _customerId: string) =>
    new Response(ResponseStatus.SUCCESS),
  removePayment: async (
    _invoice: Invoice,
    _paymentId: string,
    _returnPaymen?: boolean,
  ) => new Response(ResponseStatus.SUCCESS),
  deleteInvoice: async (_invoice: Invoice) =>
    new Response(ResponseStatus.SUCCESS),
  clearErrors: () => {},
};

const InvoicesContext = createContext<InvoiceContext>(invoicesContext);

export default InvoicesContext;
