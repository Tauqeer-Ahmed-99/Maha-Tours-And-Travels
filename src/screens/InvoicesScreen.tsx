import { useContext, useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Typography from "@mui/joy/Typography";
import InvoiceTabel from "@src/components/InvoiceTable";
import NoteAddRoundedIcon from "@mui/icons-material/NoteAddRounded";
import { useNavigate } from "react-router-dom";
import { Routes } from "@src/routes/routes";
import InvoicesContext from "@src/context/invoices/InvoicesContext";
import InvoiceInput from "@src/components/InvoiceInput";
import InvoicesSkeleton from "@src/components/InvoicesSkeleton";

const InvoicesScreen = () => {
  const navigate = useNavigate();

  const invoicesContext = useContext(InvoicesContext);
  const [filteredInvoices, setFilteredInvoices] = useState(
    invoicesContext.invoices,
  );

  const onNewInvoiceClick = () => {
    invoicesContext.createNewInvoice();
    const route = (Routes.InvoiceDetailsScreen as string).replace(
      ":invoiceId",
      "new",
    );
    navigate(route);
  };

  const handleFilterTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.trim().toLocaleLowerCase();
    if (term.length > 0) {
      const filteredInvocies = invoicesContext.invoices.filter(
        (invoice) =>
          (invoice.travellingType + "-" + invoice.invoiceNumber)
            .toLocaleLowerCase()
            .includes(term) ||
          invoice.billToCustomer.name.toLocaleLowerCase().includes(term) ||
          invoice.customers.some((customer) =>
            customer.name.toLocaleLowerCase().includes(term),
          ),
      );
      setFilteredInvoices(filteredInvocies);
    } else {
      setFilteredInvoices(invoicesContext.invoices);
    }
  };

  useEffect(() => {
    setFilteredInvoices(invoicesContext.invoices);
  }, [invoicesContext.invoices]);

  return (
    <Box>
      <Box
        marginBottom={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography level="title-lg">All Invoices</Typography>
        <Button
          startDecorator={<NoteAddRoundedIcon />}
          onClick={onNewInvoiceClick}
        >
          New Invoice
        </Button>
      </Box>
      {invoicesContext.invoices.length > 0 && (
        <Box my={2}>
          <InvoiceInput
            label="Search Invoices"
            placeholder="Search invoices by Invoice Number or Customer Name"
            mb={1}
            onChange={handleFilterTermChange}
          />
        </Box>
      )}
      <Box>
        {invoicesContext.isLoading ? (
          <InvoicesSkeleton />
        ) : filteredInvoices.length > 0 ? (
          <InvoiceTabel invoices={filteredInvoices} />
        ) : (
          <Typography textAlign="center">
            Invoices not found. Create a new one.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default InvoicesScreen;
