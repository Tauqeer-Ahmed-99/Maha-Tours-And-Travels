import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Modal,
  ModalDialog,
  Typography,
} from "@mui/joy";
import CustomersTable from "@src/components/CustomersTable";
import InvoiceInput from "@src/components/InvoiceInput";
import { Customer } from "@src/utilities/models";
import React, { useMemo, useState } from "react";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { useParams } from "react-router-dom";

const getCustomerFieldLabel = (field: string, isBillToCustomer = false) => {
  switch (field) {
    case "name":
      return isBillToCustomer ? "Bill To" : "Customer Name";
    case "contact":
      return "Contact";
    case "passport":
      return "Passport Number";
    case "pan":
      return "PAN Number";
    case "aadhar":
      return "Aadhar Number";
    case "addressLine1":
      return "Address Line 1";
    case "addressLine2":
      return "Address Line 2";
    case "city":
      return "City";
    case "country":
      return "Country";
    default:
      return field;
  }
};

const InvoiceDetailsScreen = () => {
  const { invoiceId } = useParams();

  const [billToCustomer, setBillToCustomer] = useState(new Customer());
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [customerIndex, setCustomerIndex] = useState<null | number>(null);

  const billToCustomerFields = useMemo(() => Object.keys(billToCustomer), []);

  const isCreatingNewInvoice = invoiceId === "new";

  const handleBillToFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillToCustomer((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onAddCustomer = () => {
    setCustomers((prevCustomers) => [...prevCustomers, new Customer()]);
    setIsAddingCustomer(true);
    setCustomerIndex(null);
  };

  const openConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const handleCustomerFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer, i) =>
        i === index
          ? {
              ...customer,
              [e.target.name]: e.target.value,
            }
          : customer,
      ),
    );
  };

  const onSaveCustomer = () => {
    setIsAddingCustomer(false);
  };

  const onCancelSaveCustomer = () => {
    setCustomers((prevCustomers) => {
      prevCustomers.pop();
      return prevCustomers;
    });
    setIsAddingCustomer(false);
  };

  const onRemoveCustomer = (customerIndex: number) => {
    setCustomerIndex(customerIndex);
    openConfirmation();
  };

  const onRemoveCustomerConfirm = () => {
    setCustomers((prevCustomers) =>
      prevCustomers.filter((_, index) => index !== customerIndex),
    );
    setCustomerIndex(null);
    closeConfirmation();
  };

  const onRemoveCustomerCancel = () => {
    closeConfirmation();
    setCustomerIndex(null);
  };

  const onEditCustomer = (customerIndex: number) => {
    setCustomerIndex(customerIndex);
  };

  const saveEditedCustomer = () => {
    setCustomerIndex(null);
  };

  const cancelEditingCustomer = () => {
    setCustomerIndex(null);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography level="title-lg">
          {isCreatingNewInvoice ? "New Invoice" : "Customer's Invoice"}
        </Typography>
        <Typography level="title-md">
          Date:{" "}
          {isCreatingNewInvoice ? new Date().toDateString() : "Customer's Date"}
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={2}>
          {billToCustomerFields.map((field, idx) => (
            <Grid
              key={field}
              xs={12}
              md={idx !== 0 ? 6 : undefined}
              lg={idx !== 0 ? 4 : undefined}
            >
              <InvoiceInput
                label={getCustomerFieldLabel(field, true)}
                name={field}
                value={
                  (billToCustomer as unknown as { [key: string]: string })[
                    field
                  ]
                }
                onChange={handleBillToFieldChange}
              />
            </Grid>
          ))}
        </Grid>
        <CustomersTable
          customers={customers}
          customerIndex={customerIndex}
          isAddingCustomer={isAddingCustomer}
          onAddCustomer={onAddCustomer}
          onSaveCustomer={onSaveCustomer}
          onCancelSaveCustomer={onCancelSaveCustomer}
          handleCustomerFieldChange={handleCustomerFieldChange}
          onEditCustomer={onEditCustomer}
          onRemoveCustomer={onRemoveCustomer}
          saveEditedCustomer={saveEditedCustomer}
          cancelEditingCustomer={cancelEditingCustomer}
        />
      </Box>
      <Modal open={isConfirmationOpen}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            <Typography>Remove Customer?</Typography>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <Box display="flex" alignItems="center">
              <Typography>
                Are you sure? you want to remove this customer?
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="warning"
              onClick={onRemoveCustomerConfirm}
            >
              Yes
            </Button>
            <Button
              variant="solid"
              color="primary"
              onClick={onRemoveCustomerCancel}
            >
              No
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </Box>
  );
};

export default InvoiceDetailsScreen;
