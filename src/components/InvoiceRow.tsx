import React, { useState } from "react";
import IconButton from "@mui/joy/IconButton";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const InvoiceRow = (props: {
  row: {
    name: string;
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
    price: number;
    history: {
      date: string;
      customerId: string;
      amount: number;
    }[];
  };
  initialOpen?: boolean;
}) => {
  const { row } = props;
  const [open, setOpen] = useState(props.initialOpen || false);

  return (
    <React.Fragment>
      <tr>
        <td>
          <IconButton
            aria-label="expand row"
            variant="plain"
            color="neutral"
            size="sm"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </td>
        <th scope="row">{row.name}</th>
        <td>{row.calories}</td>
        <td>{row.fat}</td>
        <td>{row.carbs}</td>
        <td>{row.protein}</td>
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
                History
              </Typography>
              <Table
                borderAxis="bothBetween"
                size="sm"
                aria-label="purchases"
                sx={{
                  "& > thead > tr > th:nth-child(n + 3), & > tbody > tr > td:nth-child(n + 3)":
                    { textAlign: "right" },
                  "--TableCell-paddingX": "0.5rem",
                }}
              >
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Total price ($)</th>
                  </tr>
                </thead>
                <tbody>
                  {row.history.map((historyRow) => (
                    <tr key={historyRow.date}>
                      <th scope="row">{historyRow.date}</th>
                      <td>{historyRow.customerId}</td>
                      <td>{historyRow.amount}</td>
                      <td>
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Sheet>
          )}
        </td>
      </tr>
    </React.Fragment>
  );
};

export default InvoiceRow;
