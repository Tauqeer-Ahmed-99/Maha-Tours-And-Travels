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
  returnPayments: Payment[];
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
  addCustomer: (invoice: Invoice, customer: Customer) => Promise<Response>;
  editCustomer: (invoice: Invoice, customer: Customer) => Promise<Response>;
  saveAmounts: (invoice: Invoice, amounts: Amounts) => Promise<Response>;
  addPayment: (invoice: Invoice, payment: Payment, returnPayment?: boolean) => Promise<Response>;
  addReturnPayment: (invoice: Invoice, payment: Payment) => Promise<Response>;
  editPayment: (invoice: Invoice, payment: Payment, returnPayment?: boolean) => Promise<Response>;
  removeCustomer: (invoice: Invoice, customerId: string) => Promise<Response>;
  removePayment: (invoice: Invoice, paymentId: string,returnPayment?: boolean) => Promise<Response>;
  deleteInvoice: (invoice: Invoice) => Promise<Response>;
  clearErrors: () => void;
}
