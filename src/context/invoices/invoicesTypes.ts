import { TravellingType } from "@src/utilities/types";
import { Amounts, Customer, Payment, Response } from "@src/utilities/models";

export interface Invoice {
  invoiceId?: string;
  invoiceNumber: number;
  travellingType: TravellingType;
  billToCustomer: Customer;
  isBillToATraveller: boolean;
  customers: Customer[];
  payments: Payment[];
  amounts: Amounts;
  date: Date;
}

export interface InvoiceContext {
  invoices: Invoice[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
  createNewInvoice: () => Promise<Response>;
  saveInvoice: (invoice: Invoice) => Promise<Response>;
  addCustomer: (invoiceId: string, customer: Customer) => Promise<Response>;
  editCustomer: (invoiceId: string, customer: Customer) => Promise<Response>;
  saveAmounts: (invoiceId: string, amounts: Amounts) => Promise<Response>;
  addPayment: (invoiceId: string, payment: Payment) => Promise<Response>;
  editPayment: (invoiceId: string, payment: Payment) => Promise<Response>;
  removeCustomer: (invoiceId: string, customerId: string) => Promise<Response>;
  removePayment: (invoiceId: string, paymentId: string) => Promise<Response>;
  deleteInvoice: (invoiceId: string) => Promise<Response>;
  clearErrors: () => void;
}
