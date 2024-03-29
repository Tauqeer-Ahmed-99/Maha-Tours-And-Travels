export interface Customer {
  name: string;
  contact: string;
  passport: string;
  pan: string;
  aadhar: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
}

export enum PaymentMode {
  CASH = 0,
  CHEQUE = 1,
  NEFT = 2,
  RTGS = 3,
}

export interface Payment {
  paymentId: string;
  paymentNumber: number;
  mode: PaymentMode;
  qty: number;
  pricePerUnite: number;
  totalAmount: number;
  date: string | Date;
}

export interface Invoice {
  invoiceId: string;
  invoiceNumber: string;
  billToCustomer: Customer;
  customers: Customer[];
  payments: Payment[];
  date: string | Date;
}
