/* eslint-disable @typescript-eslint/no-explicit-any */
import { Invoice } from "@src/context/invoices/invoicesTypes";
import { PaymentMode, TravellingType } from "./types";
import { Amounts, Customer, Payment } from "./models";

export const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

export const isEmail = (email: string) => emailRegex.test(email);

const parseAmounts = (rawAmounts: any) => {
  return new Amounts(
    rawAmounts.qty,
    rawAmounts.pricePerUnit,
    rawAmounts.gstPercent,
    rawAmounts.tcsPercent,
  );
};

const parseCustomer = ([id, rawCustomer]: [string, any]) => {
  const customer = new Customer(
    rawCustomer.name,
    rawCustomer.contact,
    rawCustomer.email,
    rawCustomer.passport,
    rawCustomer.pan,
    rawCustomer.aadhar,
    rawCustomer.addressLine1,
    rawCustomer.addressLine2,
    rawCustomer.city,
    rawCustomer.state,
    rawCustomer.country,
  );
  customer.customerId = id;
  return customer;
};

const parsePayment = ([id, rawPayment]: [string, any]) => {
  const payment = new Payment(
    rawPayment.paymentNumber,
    rawPayment.mode as PaymentMode,
    rawPayment.amount,
    new Date(rawPayment.date),
  );
  payment.paymentId = id;
  return payment;
};

export const parseInvoices = (rawInvoices: { [key: string]: any }) =>
  rawInvoices
    ? Object.entries(rawInvoices)
        .map(
          ([invoiceId, rawInvoice]) =>
            ({
              invoiceId,
              invoiceNumber: rawInvoice.invoiceNumber,
              travellingType: rawInvoice.travellingType as TravellingType,
              billToCustomer: parseCustomer([
                invoiceId,
                rawInvoice.billToCustomer,
              ]),
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
                    parsePayment(rawPayment),
                  )
                : [],
            } as Invoice),
        )
        .sort((a, b) => parseInt(a.invoiceNumber) - parseInt(b.invoiceNumber))
    : [];

export function convertAmountInWords(amount: any) {
  const a = [
    "",
    "One ",
    "Two ",
    "Three ",
    "Four ",
    "Five ",
    "Six ",
    "Seven ",
    "Eight ",
    "Nine ",
    "Ten ",
    "Eleven ",
    "Twelve ",
    "Thirteen ",
    "Fourteen ",
    "Fifteen ",
    "Sixteen ",
    "Seventeen ",
    "Eighteen ",
    "Nineteen ",
  ];
  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  function transform(value: any): any {
    if (value) {
      const number = parseFloat(value).toFixed(2).split(".");
      const num = parseInt(number[0]);
      const digit = parseInt(number[1]);
      if (num) {
        if (num.toString().length > 9) {
          return "";
        }
        const n = ("000000000" + num)
          .substr(-9)
          .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/) as RegExpMatchArray;
        const d = ("00" + digit).substr(-2).match(/^(\d{2})$/);
        if (!n) {
          return "";
        }
        let str = "";
        str +=
          Number(n[1]) !== 0
            ? (a[Number(n[1])] ||
                b[(n as RegExpMatchArray)[1][0] as unknown as number] +
                  " " +
                  a[(n as RegExpMatchArray)[1][1] as unknown as number]) +
              "Crore "
            : "";
        str +=
          Number(n[2]) !== 0
            ? (a[Number(n[2])] ||
                b[(n as RegExpMatchArray)[2][0] as unknown as number] +
                  " " +
                  a[(n as RegExpMatchArray)[2][1] as unknown as number]) +
              "Lakh "
            : "";
        str +=
          Number(n[3]) !== 0
            ? (a[Number(n[3])] ||
                b[(n as RegExpMatchArray)[3][0] as unknown as number] +
                  " " +
                  a[(n as RegExpMatchArray)[3][1] as unknown as number]) +
              "Thousand "
            : "";
        str +=
          Number(n[4]) !== 0
            ? (a[Number(n[4])] ||
                b[(n as RegExpMatchArray)[4][0] as unknown as number] +
                  " " +
                  a[(n as RegExpMatchArray)[4][1] as unknown as number]) +
              "Hundred "
            : "";
        str +=
          Number(n[5]) !== 0
            ? (a[Number(n[5])] ||
                b[(n as RegExpMatchArray)[5][0] as unknown as number] +
                  " " +
                  a[(n as RegExpMatchArray)[5][1] as unknown as number]) +
              "Rupee "
            : "";
        str +=
          Number(d?.[1]) !== 0
            ? (str !== "" ? "and " : "") +
              (a[Number(d?.[1])] ||
                b[(d as RegExpMatchArray)[1][0] as unknown as number] +
                  " " +
                  a[(d as RegExpMatchArray)[1][1] as unknown as number]) +
              "Paise Only"
            : "Only";
        return str;
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  return transform(amount);
}
