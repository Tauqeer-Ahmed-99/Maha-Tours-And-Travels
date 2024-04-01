import { Invoice } from "@src/context/invoices/invoicesTypes";
import { PaymentMode, TravellingType } from "./types";
import { Amounts, Customer, Payment } from "./models";

export const emailRegex = new RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

export const isEmail = (email: string) => emailRegex.test(email);

const parseAmounts = (rawAmounts: any) => {
  return new Amounts(
    rawAmounts.qty,
    rawAmounts.pricePerUnit,
    rawAmounts.gstPercent,
    rawAmounts.tcsPercent
  );
};

const parseCustomer = ([id, rawCustomer]: [string | undefined, any]) => {
  const customer = new Customer(
    rawCustomer.name,
    rawCustomer.contact,
    rawCustomer.passport,
    rawCustomer.pan,
    rawCustomer.aadhar,
    rawCustomer.addressLine1,
    rawCustomer.addressLine2,
    rawCustomer.city,
    rawCustomer.country
  );
  customer.customerId = id;
  return customer;
};

const parsePayment = ([id, rawPayment]: [string, any]) => {
  const payment = new Payment(
    rawPayment.paymentNumber,
    rawPayment.mode as PaymentMode,
    rawPayment.amount,
    new Date(rawPayment.date)
  );
  payment.paymentId = id;
  return payment;
};

export const parseInvoices = (rawInvoices: { [key: string]: any }) =>
  Object.entries(rawInvoices).map(
    ([invoiceId, rawInvoice]) =>
      ({
        invoiceId,
        travellingType: rawInvoice.travellingType as TravellingType,
        billToCustomer: parseCustomer([, rawInvoice.billToCustomer]),
        isBillToATraveller: rawInvoice.isBillToATraveller,
        date: new Date(rawInvoice.date),
        amounts: parseAmounts(rawInvoice.amounts),
        customers: rawInvoice.customers
          ? Object.entries(rawInvoice.customers).map((rawCustomer) => {
              return parseCustomer(rawCustomer);
            })
          : [],
        payments: rawInvoice.payments
          ? Object.entries(rawInvoice.payments).map((rawPayment) =>
              parsePayment(rawPayment)
            )
          : [],
      } as Invoice)
  );
