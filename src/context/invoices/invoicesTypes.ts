import { TravellingType } from "@src/utilities/types";
import { Amounts, Customer, Payment } from "@src/utilities/models";

export interface Invoice {
  invoiceId?: string;
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
  createNewInvoice: () => Promise<void>;
  saveInvoice: (invoice: Invoice) => Promise<void>;
  addCustomer: (invoiceId: string, customer: Customer) => Promise<void>;
  editCustomer: (invoiceId: string, customer: Customer) => Promise<void>;
  addPayment: (invoiceId: string, payment: Payment) => Promise<void>;
  editPayment: (invoiceId: string, payment: Payment) => Promise<void>;
  removeCustomer: (invoiceId: string, customerId: string) => Promise<void>;
  removePayment: (invoiceId: string, paymentId: string) => Promise<void>;
}
