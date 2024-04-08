import { useContext } from "react";
import Box from "@mui/joy/Box";
import {
  PDFViewer,
  Document,
  Page,
  View,
  Text,
  Image,
} from "@react-pdf/renderer";
import React from "@src/assets/haramain-sharifain/Masjid-al-Haram/kaaba-1.jpg";
import RupeeSymbol from "@src/assets/svg/rupee.png";
import InvoicesContext from "@src/context/invoices/InvoicesContext";
import { Invoice } from "@src/context/invoices/invoicesTypes";
import { useParams } from "react-router-dom";

import NotFoundScreen from "./NotFoundScreen";
import { convertAmountInWords } from "@src/utilities/utils";

type Tables = "customers" | "amounts" | "payments";

type ColumnDef = {
  label: string;
  width: string;
  includeRupeeSymbol?: boolean;
  textAlign?: "left" | "center" | "right" | "justify";
};

const columnDefs: { [key in Tables]: ColumnDef[] } = {
  customers: [
    { label: "#", width: "3%" },
    { label: "Customer Name", width: "37%", textAlign: "left" },
    { label: "Contact", width: "15%" },
    { label: "Aadhar", width: "15%" },
    { label: "PAN", width: "15%" },
    { label: "Passport", width: "15%" },
  ],
  amounts: [
    { label: "#", width: "3%" },
    { label: "Quantity", width: "24.25%" },
    { label: "Price / Unit", width: "24.25%", includeRupeeSymbol: true },
    { label: "GST", width: "24.25%", includeRupeeSymbol: true },
    { label: "Amount", width: "24.25%", includeRupeeSymbol: true },
  ],
  payments: [
    { label: "#", width: "3%" },
    { label: "Payment Mode", width: "33.33%", textAlign: "left" },
    { label: "Date", width: "30.33%" },
    { label: "Amount", width: "33.33%", includeRupeeSymbol: true },
  ],
};

const RupeeIcon = (
  <Image src={RupeeSymbol} style={{ height: "6px", width: "6px" }} />
);

const TableRow = ({
  tableName,
  isHeading,
  content,
}: {
  tableName: Tables;
  isHeading?: boolean;
  content?: string[];
}) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        fontWeight: isHeading ? 600 : undefined,
      }}
    >
      {columnDefs[tableName].map((column, index, columns) => (
        <Text
          key={column.label + index + column.width}
          style={{
            width: column.width,
            padding: "2px",
            borderTop: isHeading ? "1px solid black" : undefined,
            borderRight:
              index !== columns.length - 1 ? "1px solid black" : undefined,
            borderBottom: "1px solid black",
            textAlign: column.textAlign ?? "right",
            fontWeight: isHeading ? 1000 : undefined,
            fontSize: isHeading ? "8px" : undefined,
            height: "14px",
          }}
        >
          {column.includeRupeeSymbol && !isHeading && RupeeIcon}
          {isHeading ? column.label : content?.[index]}
        </Text>
      ))}
    </View>
  );
};

const PreviewInvoiceScreen = () => {
  const { invoiceId } = useParams();

  const invoicesContext = useContext(InvoicesContext);

  const invoice = invoicesContext.invoices.find(
    (_invoice) => _invoice.invoiceId === invoiceId
  );

  if (!invoice) {
    return <NotFoundScreen isAutomated={false} />;
  }

  const billToATraveller: string[][] = [];

  if (invoice?.isBillToATraveller) {
    const billToCustomerData = [
      "1",
      invoice.billToCustomer.name,
      invoice.billToCustomer.contact,
      invoice.billToCustomer.aadhar,
      invoice.billToCustomer.pan,
      invoice.billToCustomer.passport,
    ];
    billToATraveller.push(billToCustomerData);
  }

  let customersData: string[][] = [...billToATraveller];
  if (invoice) {
    customersData = [
      ...customersData,
      ...(invoice as Invoice)?.customers.map((_customer, index) => [
        `${index + (invoice?.isBillToATraveller ? 2 : 1)}`,
        _customer.name,
        _customer.contact,
        _customer.aadhar,
        _customer.pan,
        _customer.passport,
      ]),
    ];
  }

  const amountsData: string[][] = [
    [
      "",
      `${invoice?.amounts.qty}`,
      `${invoice?.amounts.pricePerUnit.toFixed(2)}`,
      `${invoice?.amounts.gstAmount.toFixed(2)} (${
        invoice?.amounts.gstPercent
      }%)`,
      `${invoice?.amounts.totalAmountWithGst.toFixed(2)}`,
    ],
  ];

  const paymentsData: string[][] = (invoice as Invoice)?.payments.map(
    (_payment, index) => [
      `${index + 1}`,
      `${_payment.mode} - Ending with - ${_payment.paymentNumber}`,
      _payment.date.toDateString(),
      `${parseFloat(_payment.amount).toFixed(2)}`,
    ]
  );

  const amountReceived = invoice.payments
    .reduce((prevVal, curVal) => (prevVal += parseFloat(curVal.amount)), 0)
    .toFixed(2);

  return (
    <Box height="100%" width="100%">
      <PDFViewer style={{ width: "100%", height: "100%" }}>
        <Document title={invoice.travellingType + "-" + invoice.invoiceNumber}>
          <Page size="A4" style={{ padding: 20 }}>
            <Text style={{ textAlign: "center", fontSize: "10px" }}>
              Tax Invoice
            </Text>
            <View
              style={{
                border: "1px solid black",
                fontSize: "8px",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderBottom: "1px solid black",
                }}
              >
                <View
                  style={{
                    width: "50%",
                    borderRight: "1px solid black",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={React}
                    style={{ height: "50px", width: "50px", margin: "6px " }}
                  />
                  <View style={{ margin: "6px" }}>
                    <Text style={{ fontSize: "12px", fontWeight: 800 }}>
                      MAHA TOURS AND TRAVELS
                    </Text>
                    <Text style={{ marginVertical: "2px" }}>
                      SHOP NO. 04, DATTA APARTMENT, AVADHUTCHINTA
                    </Text>
                    <Text>CO.OP. HSG SOC, DR. AMBEDKAR ROAD, KALYAN</Text>
                    <Text style={{ marginVertical: "2px" }}>
                      WEST, THANE, MAHARASHTRA, 421301
                    </Text>
                    <Text>Phone No.: 9819195267</Text>
                    <Text style={{ marginVertical: "2px" }}>
                      Email.: mahatoursntravels@gmail.com
                    </Text>
                    <Text>GSTIN.: 27ABHFM7829H1ZU</Text>
                    <Text style={{ marginVertical: "2px" }}>
                      State.: 27-Maharashtra
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      borderBottom: "1px solid black",
                    }}
                  >
                    <View
                      style={{
                        width: "50%",
                        borderRight: "1px solid black",
                        padding: "6px",
                      }}
                    >
                      <Text>Invoice No.</Text>
                      <Text
                        style={{
                          fontSize: "12px",
                          fontWeight: 800,
                          marginTop: "4px",
                        }}
                      >
                        {invoice.travellingType + "-" + invoice.invoiceNumber}
                      </Text>
                    </View>
                    <View style={{ width: "50%", padding: "6px" }}>
                      <Text>Date</Text>
                      <Text
                        style={{
                          fontSize: "12px",
                          fontWeight: 800,
                          marginTop: "4px",
                        }}
                      >
                        {invoice.date.toDateString()}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ padding: "6px" }}>
                <Text>Bill To</Text>
                <Text
                  style={{
                    fontSize: "10px",
                    fontWeight: 800,
                    marginVertical: "2px",
                  }}
                >
                  {invoice.billToCustomer.name}
                </Text>
                <Text>{invoice.billToCustomer.addressLine1}</Text>
                <Text style={{ marginVertical: "2px" }}>
                  {invoice.billToCustomer.addressLine2}
                </Text>
                <Text>{invoice.billToCustomer.city}</Text>
                <Text style={{ marginVertical: "2px" }}>
                  {invoice.billToCustomer.state}
                </Text>
                <Text>{invoice.billToCustomer.country}</Text>
                <Text style={{ marginVertical: "2px" }}>
                  Contact No.: {invoice.billToCustomer.contact}
                </Text>
                <Text>Passport No.: {invoice.billToCustomer.passport}</Text>
                <Text style={{ marginVertical: "2px" }}>
                  Aadhar No.: {invoice.billToCustomer.aadhar}
                </Text>
                <Text>PAN No.: {invoice.billToCustomer.pan}</Text>
              </View>
              <View>
                <Text style={{ padding: "6px" }}>Customers</Text>
                <TableRow tableName="customers" isHeading />
                {customersData.map((customerData, index) => (
                  <TableRow
                    key={customerData[1] + index}
                    tableName="customers"
                    content={customerData}
                  />
                ))}
              </View>
              <View>
                <Text style={{ padding: "6px" }}>Amounts</Text>
                <TableRow tableName="amounts" isHeading />
                {amountsData.map((amountsData, index) => (
                  <TableRow
                    key={index}
                    tableName="amounts"
                    content={amountsData}
                  />
                ))}
              </View>
              <View>
                <Text style={{ padding: "6px" }}>Payments</Text>
                <TableRow tableName="payments" isHeading />
                {paymentsData?.map((paymentsData, index) => (
                  <TableRow
                    key={paymentsData[1] + index}
                    tableName="payments"
                    content={paymentsData}
                  />
                ))}
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderBottom: "1px solid black",
                }}
              >
                <View
                  style={{
                    width: "50%",
                    borderRight: "1px solid black",
                    padding: "6px",
                  }}
                >
                  <Text>Invoice Amount In Words</Text>
                  <Text>
                    {convertAmountInWords(invoice.amounts.totalAmount)}
                  </Text>
                </View>
                <View style={{ width: "50%" }}>
                  <View
                    style={{
                      paddingLeft: "6px",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      paddingRight: "2px",
                      borderBottom: "1px solid black",
                    }}
                  >
                    <Text>Amounts</Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginVertical: "6px",
                      }}
                    >
                      <Text>Sub Total</Text>
                      <Text>
                        {RupeeIcon}
                        {invoice.amounts.totalAmountWithGst.toFixed(2)}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>{`TCS (${invoice.amounts.tcsPercent}%)`}</Text>
                      <Text>
                        {RupeeIcon}
                        {invoice.amounts.tcsAmount.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      paddingLeft: "6px",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      paddingRight: "2px",
                      borderBottom: "1px solid black",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>Total</Text>
                      <Text>
                        {RupeeIcon}
                        {invoice.amounts.totalAmount.toFixed(2)}
                      </Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginVertical: "2px",
                        marginTop: "6px",
                      }}
                    >
                      <Text>Received</Text>
                      <Text>
                        {RupeeIcon}
                        {amountReceived}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingLeft: "6px",
                      paddingTop: "6px",
                      paddingBottom: "6px",
                      paddingRight: "2px",
                    }}
                  >
                    <Text>Balance</Text>
                    <Text>
                      {RupeeIcon}
                      {(
                        invoice.amounts.totalAmount - parseFloat(amountReceived)
                      ).toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View
                  style={{
                    width: "50%",
                    padding: "6px",
                    borderRight: "1px solid black",
                  }}
                >
                  <Text>Terms and Conditions</Text>
                  <Text>Thanks for doing business with us!!!</Text>
                </View>
                <View style={{ width: "50%", padding: "6px" }}>
                  <Text style={{ textAlign: "center", marginBottom: "50px" }}>
                    For : MAHA TOURS AND TRAVELS
                  </Text>
                  <Text style={{ textAlign: "center" }}>
                    Authorized Signatory
                  </Text>
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </Box>
  );
};

export default PreviewInvoiceScreen;
