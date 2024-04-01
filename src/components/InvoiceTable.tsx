import Sheet from "@mui/joy/Sheet";
import Table from "@mui/joy/Table";
import InvoiceRow from "./InvoiceRow";
import { Invoice } from "@src/context/invoices/invoicesTypes";

const InvoiceTabel = ({ invoices }: { invoices: Invoice[] }) => {
  return (
    <Sheet>
      <Table
        aria-label="collapsible table"
        sx={{
          '& > tbody > tr:nth-of-type(odd) > td, & > tbody > tr:nth-of-type(odd) > th[scope="row"]':
            {
              borderBottom: 0,
            },
        }}
      >
        <thead>
          <tr>
            <th style={{ width: 40 }} aria-label="empty" />
            <th>Invoice Number</th>
            <th style={{ width: "40%" }}>Customer Name</th>
            <th>Total Amount</th>
            <th>Received</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <InvoiceRow
              key={invoice.invoiceId}
              row={invoice}
              // initialOpen={index === 0}
            />
          ))}
        </tbody>
      </Table>
    </Sheet>
  );
};

export default InvoiceTabel;
