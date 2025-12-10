import { AxiosError, AxiosResponse } from "axios";
import { PaymentMode, ResponseStatus } from "./types";

export class Customer {
  customerId?: string;
  name: string;
  contact: string;
  email: string;
  passport: string;
  pan: string;
  aadhar: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  constructor(
    name?: string,
    contact?: string,
    email?: string,
    passport?: string,
    pan?: string,
    aadhar?: string,
    addressLine1?: string,
    addressLine2?: string,
    city?: string,
    state?: string,
    country?: string,
  ) {
    this.name = name ?? "";
    this.contact = contact ?? "";
    this.email = email ?? "";
    this.passport = passport ?? "";
    this.pan = pan ?? "";
    this.aadhar = aadhar ?? "";
    this.addressLine1 = addressLine1 ?? "";
    this.addressLine2 = addressLine2 ?? "";
    this.city = city ?? "";
    this.state = state ?? "";
    this.country = country ?? "";
  }
}

export class Amounts {
  qty: number;
  pricePerUnit: number;
  gstPercent: number;
  tcsPercent: number;

  constructor(
    qty?: number,
    pricePerUnit?: number,
    gstPercent?: number,
    tcsPercent?: number,
  ) {
    this.qty = qty ?? 0;
    this.pricePerUnit = pricePerUnit ?? 0;
    this.gstPercent = gstPercent ?? 0;
    this.tcsPercent = tcsPercent ?? 0;
  }

  get totalAmountWithoutGst() {
    return this.qty * this.pricePerUnit;
  }

  get gstAmount() {
    return (this.gstPercent / 100) * this.totalAmountWithoutGst;
  }

  get totalAmountWithGst() {
    return this.totalAmountWithoutGst + this.gstAmount;
  }

  get tcsAmount() {
    return (this.tcsPercent / 100) * this.totalAmountWithoutGst;
  }

  get totalAmount() {
    return this.totalAmountWithGst + this.tcsAmount;
  }
}

export class Payment {
  paymentId?: string;
  paymentNumber: number;
  mode: PaymentMode;
  amount: string;
  date: Date;

  constructor(
    paymentNumber?: number,
    mode?: PaymentMode,
    amount?: string,
    date?: Date,
  ) {
    this.paymentNumber = paymentNumber ?? 0;
    this.mode = mode ?? PaymentMode.CHEQUE;
    this.amount = amount ?? "0";
    this.date = date ?? new Date();
  }
}

export class ReturnPayment {
  paymentId?: string;
  paymentNumber: number;
  mode: PaymentMode;
  amount: string;
  date: Date;

  constructor(
    paymentNumber?: number,
    mode?: PaymentMode,
    amount?: string,
    date?: Date,
  ) {
    this.paymentNumber = paymentNumber ?? 0;
    this.mode = mode ?? PaymentMode.CHEQUE;
    this.amount = amount ?? "0";
    this.date = date ?? new Date();
  }
}

export class Response {
  status: ResponseStatus;
  response?: AxiosResponse;
  error?: unknown;

  constructor(
    status: ResponseStatus,
    response?: AxiosResponse,
    error?: AxiosError,
  ) {
    this.status = status;
    this.response = response;
    this.error = error;
  }
}
