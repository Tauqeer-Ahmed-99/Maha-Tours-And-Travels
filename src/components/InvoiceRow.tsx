import React, { useMemo, useState } from "react";
import IconButton from "@mui/joy/IconButton";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Invoice } from "@src/context/invoices/invoicesTypes";
import { useNavigate } from "react-router-dom";
import { Routes } from "@src/routes/routes";

const InvoiceRow = (props: { row: Invoice; initialOpen?: boolean }) => {
  const { row } = props;
  const [open, setOpen] = useState(props.initialOpen || false);

  const navigate = useNavigate();

  const amountReceived = useMemo(() => {
    let amountReceived = 0;
    row.payments.forEach((payment) => (amountReceived += parseFloat(payment.amount)));
    return amountReceived;
  }, [row]);

  const handleInvoiceRowClick = () => {
    const url = Routes.InvoiceDetailsScreen.replace(
      ":invoiceId",
      row.invoiceId as string,
    );

    navigate(url);
  };

  return (
    <React.Fragment>
      <tr onClick={handleInvoiceRowClick} style={{ cursor: "pointer" }}>
        <td>
          <IconButton
            aria-label="expand row"
            variant="plain"
            color="neutral"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td>
        <td>{row.travellingType + "-" + row.invoiceNumber}</td>
        <td>
          <b>{row.billToCustomer.name}</b>
        </td>
        <td>{row.amounts.totalAmount}</td>
        <td>{amountReceived}</td>
        <td>{row.amounts.totalAmount - amountReceived}</td>
      </tr>
      <tr>
        <td style={{ height: 0, padding: 0 }} colSpan={6}>
          {open && (
            <Sheet
              variant="soft"
              sx={{
                p: 1,
                pl: 6,
                boxShadow: "inset 0 3px 6px 0 rgba(0 0 0 / 0.08)",
              }}
            >
              <Typography level="body-lg" component="div">
                Payment History
              </Typography>
              {row.payments.length > 0 ? (
                <Table
                  borderAxis="bothBetween"
                  size="sm"
                  aria-label="purchases"
                  sx={{
                    "--TableCell-paddingX": "0.5rem",
                  }}
                >
                  <thead>
                    <tr>
                      <th>Payment Mode</th>
                      <th>Last 4 Digit</th>
                      <th>Amount (&#8377;)</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {row.payments.map((payment) => (
                      <tr key={payment.paymentId}>
                        <th scope="row">{payment.mode}</th>
                        <td>{payment.paymentNumber}</td>
                        <td>&#8377;{payment.amount}</td>
                        <td>{payment.date.toDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <Typography my={2}>No payment history found.</Typography>
              )}
            </Sheet>
          )}
        </td>
      </tr>
    </React.Fragment>
  );
};

export default InvoiceRow;
