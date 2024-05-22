import React, { useContext } from "react";
import Box from "@mui/joy/Box";
import {
  PDFViewer,
  Document,
  Page,
  View,
  Text,
  Image,
} from "@react-pdf/renderer";
import MahaToursLogo from "@src/assets/maha-tours-logo.jpeg";
import MahaToursLogoBW from "@src/assets/maha-tours-logo-b&w.jpeg";
import RupeeSymbol from "@src/assets/svg/rupee.png";
import InvoicesContext from "@src/context/invoices/InvoicesContext";
import { Invoice } from "@src/context/invoices/invoicesTypes";
import { useParams } from "react-router-dom";
import NotFoundScreen from "./NotFoundScreen";
import { convertAmountInWords } from "@src/utilities/utils";

type Tables = "customers" | "amounts" | "payments" | "returnpayment";

type ColumnDef = {
  label: string;
  width: string;
  includeRupeeSymbol?: boolean;
  textAlign?: "left" | "center" | "right" | "justify";
};

const BORDER = "1px solid black";
const MARGIN_THIN = "2px";
const MARGIN_MEDIUM = "4px";
const MARGIN_THICK = "6px";
const PADDING_THIN = "2px";
const PADDING_THICK = "6px";

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
  returnpayment: [
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
            padding: PADDING_THIN,
            borderTop: isHeading ? BORDER : undefined,
            borderRight: index !== columns.length - 1 ? BORDER : undefined,
            borderBottom: BORDER,
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

const Watermark = () => {
  return (
    <View
      style={{
        position: "absolute",
        top: "40%",
        left: "30%",
        transform: "translate(-50%, -50%)",
        opacity: 0.2,
      }}
    >
      <Image
        src={MahaToursLogoBW}
        style={{
          height: "300px",
          width: "400px",
        }}
      />
    </View>
  );
};

const PreviewInvoiceScreen = () => {
  const { invoiceId } = useParams();

  const invoicesContext = useContext(InvoicesContext);

  const invoice = invoicesContext.invoices.find(
    (_invoice) => _invoice.invoiceId === invoiceId,
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
      // eslint-disable-next-line no-unsafe-optional-chaining
      ...(invoice as Invoice)?.customers.map((_customer, index) => [
        `${index + (invoice?.isBillToATraveller ? 2 : 1)}`,
        _customer.name,
        _customer.contact,
        _customer.email,
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
    ],
  );

  const returnPaymentsData: string[][] = (
    invoice as Invoice
  )?.returnPayments.map((_payment, index) => [
    `${index + 1}`,
    `${_payment.mode} - Ending with - ${_payment.paymentNumber}`,
    _payment.date.toDateString(),
    `${parseFloat(_payment.amount).toFixed(2)}`,
  ]);

  const amountReceived = invoice.payments
    .reduce((prevVal, curVal) => (prevVal += parseFloat(curVal.amount)), 0)
    .toFixed(2);

  const amountReturned = invoice.returnPayments
    .reduce((prevVal, curVal) => (prevVal += parseFloat(curVal.amount)), 0)
    .toFixed(2);

  return (
    <Box height="100%" width="100%">
      <PDFViewer style={{ width: "100%", height: "100%" }}>
        <Document title={invoice.travellingType + "-" + invoice.invoiceNumber}>
          {React.Children.map(
            <>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: "8px",
                  marginBottom: MARGIN_THIN,
                }}
              >
                Tax Invoice
              </Text>
              <View
                style={{
                  border: BORDER,
                  fontSize: "8px",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    borderBottom: BORDER,
                  }}
                >
                  <View
                    style={{
                      width: "80%",
                      borderRight: BORDER,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      src={MahaToursLogo}
                      style={{
                        height: "50px",
                        width: "90px",
                        margin: MARGIN_THICK,
                      }}
                    />
                    <View style={{ margin: MARGIN_THICK }}>
                      <Text style={{ fontSize: "12px", fontWeight: 800 }}>
                        MAHA TOURS AND TRAVELS
                      </Text>
                      <Text style={{ marginTop: MARGIN_MEDIUM }}>
                        SHOP NO. 04, DATTA APARTMENT, AVADHUT CHINTAN, CO.OP.
                        HSG SOC, DR. AMBEDKAR
                      </Text>
                      <Text style={{ marginVertical: PADDING_THIN }}>
                        ROAD, KALYAN WEST, THANE, MAHARASHTRA, 421301
                      </Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginVertical: MARGIN_MEDIUM,
                        }}
                      >
                        <Text style={{ width: "50%" }}>
                          Phone No.: 9029080708
                        </Text>
                        <Text style={{ width: "50%" }}>
                          Email.: mahatoursntravels@gmail.com
                        </Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ width: "50%" }}>
                          GSTIN.: 27ABHFM7829H1ZU
                        </Text>
                        <Text style={{ width: "50%" }}>
                          State.: 27-Maharashtra
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "20%",
                    }}
                  >
                    <View
                      style={{
                        width: "100%",
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          borderBottom: BORDER,
                          padding: PADDING_THICK,
                        }}
                      >
                        <Text>Invoice No.</Text>
                        <Text
                          style={{
                            fontSize: "12px",
                            fontWeight: 800,
                            marginTop: MARGIN_MEDIUM,
                          }}
                        >
                          {invoice.travellingType + "-" + invoice.invoiceNumber}
                        </Text>
                      </View>
                      <View style={{ width: "100%", padding: PADDING_THICK }}>
                        <Text>Date</Text>
                        <Text
                          style={{
                            fontSize: "12px",
                            fontWeight: 800,
                            marginTop: MARGIN_MEDIUM,
                          }}
                        >
                          {invoice.date.toDateString()}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    borderBottom: BORDER,
                  }}
                >
                  <View
                    style={{
                      padding: PADDING_THICK,
                      width: "50%",
                      borderRight: BORDER,
                    }}
                  >
                    <Text style={{ marginBottom: MARGIN_THICK }}>Bill To</Text>
                    <Text
                      style={{
                        fontSize: "10px",
                        fontWeight: 800,
                        marginBottom: MARGIN_THICK,
                      }}
                    >
                      {invoice.billToCustomer.name}
                    </Text>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Text style={{ width: "60px" }}>Contact No.:</Text>
                      <Text>{invoice.billToCustomer.contact}</Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginVertical: MARGIN_MEDIUM,
                      }}
                    >
                      <Text style={{ width: "60px" }}>Email Add.:</Text>
                      <Text>{invoice.billToCustomer.email}</Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Text style={{ width: "60px" }}>Passport No.:</Text>
                      <Text>{invoice.billToCustomer.passport}</Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        marginVertical: MARGIN_MEDIUM,
                      }}
                    >
                      <Text style={{ width: "60px" }}>Aadhar No.:</Text>
                      <Text>{invoice.billToCustomer.aadhar}</Text>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Text style={{ width: "60px" }}>PAN No.:</Text>
                      <Text>{invoice.billToCustomer.pan}</Text>
                    </View>
                  </View>
                  <View style={{ padding: PADDING_THICK, width: "50%" }}>
                    <Text style={{ marginBottom: MARGIN_THICK }}>Address</Text>
                    <Text>{invoice.billToCustomer.addressLine1}</Text>
                    <Text style={{ marginVertical: MARGIN_MEDIUM }}>
                      {invoice.billToCustomer.addressLine2}
                    </Text>
                    <Text>{invoice.billToCustomer.city}</Text>
                    <Text style={{ marginVertical: MARGIN_MEDIUM }}>
                      {invoice.billToCustomer.state}
                    </Text>
                    <Text>{invoice.billToCustomer.country}</Text>
                  </View>
                </View>
                <View>
                  <Text style={{ padding: PADDING_THICK }}>Customers</Text>
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
                  <Text style={{ padding: PADDING_THICK }}>Amounts</Text>
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
                  <Text style={{ padding: PADDING_THICK }}>Payments</Text>
                  <TableRow tableName="payments" isHeading />
                  {paymentsData?.map((paymentsData, index) => (
                    <TableRow
                      key={paymentsData[1] + index}
                      tableName="payments"
                      content={paymentsData}
                    />
                  ))}
                </View>
                <View>
                  <Text style={{ padding: PADDING_THICK }}>
                    Return Payments
                  </Text>
                  <TableRow tableName="returnpayment" isHeading />
                  {returnPaymentsData?.map((paymentsData, index) => (
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
                    borderBottom: BORDER,
                  }}
                >
                  <View
                    style={{
                      width: "50%",
                      borderRight: BORDER,
                      padding: PADDING_THICK,
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
                        paddingLeft: PADDING_THICK,
                        paddingTop: PADDING_THICK,
                        paddingBottom: PADDING_THICK,
                        paddingRight: PADDING_THIN,
                        borderBottom: BORDER,
                      }}
                    >
                      <Text>Amounts</Text>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginVertical: MARGIN_THICK,
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
                        paddingLeft: PADDING_THICK,
                        paddingTop: PADDING_THICK,
                        paddingBottom: PADDING_THICK,
                        paddingRight: PADDING_THIN,
                        borderBottom: BORDER,
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
                          marginVertical: MARGIN_THIN,
                          marginTop: MARGIN_THICK,
                        }}
                      >
                        <Text>Received</Text>
                        <Text>
                          {RupeeIcon}
                          {amountReceived}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginVertical: MARGIN_THIN,
                          marginTop: MARGIN_THICK,
                        }}
                      >
                        <Text>Returned</Text>
                        <Text>
                          {RupeeIcon}
                          {amountReturned}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingLeft: PADDING_THICK,
                        paddingTop: PADDING_THICK,
                        paddingBottom: PADDING_THICK,
                        paddingRight: PADDING_THIN,
                      }}
                    >
                      <Text>Balance</Text>
                      <Text>
                        {RupeeIcon}
                        {(
                          invoice.amounts.totalAmount -
                          parseFloat(amountReceived) +
                          parseFloat(amountReturned)
                        ).toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <View
                    style={{
                      width: "50%",
                      padding: PADDING_THICK,
                      borderRight: BORDER,
                    }}
                  >
                    <Text>Terms and Conditions</Text>
                    <Text>Thanks for doing business with us!!!</Text>
                  </View>
                  <View style={{ width: "50%", padding: PADDING_THICK }}>
                    <Text style={{ textAlign: "center", marginBottom: "50px" }}>
                      For : MAHA TOURS AND TRAVELS
                    </Text>
                    <Text style={{ textAlign: "center" }}>
                      Authorized Signatory
                    </Text>
                  </View>
                </View>
              </View>
            </>,
            (child, index) => (
              <Page key={index} size="A4" style={{ padding: 20 }}>
                {child}
                <Watermark />
              </Page>
            ),
          )}
        </Document>
      </PDFViewer>
    </Box>
  );
};

export default PreviewInvoiceScreen;
