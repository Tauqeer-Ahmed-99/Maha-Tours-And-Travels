import React, { useContext, useState } from "react";
import Table from "@mui/joy/Table";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Tooltip from "@mui/joy/Tooltip";
import Typography from "@mui/joy/Typography";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import DoDisturbAltRoundedIcon from "@mui/icons-material/DoDisturbAltRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { Customer } from "@src/utilities/models";
import InvoiceInput from "./InvoiceInput";
import InvoicesContext from "@src/context/invoices/InvoicesContext";
import CircularProgress from "@mui/joy/CircularProgress";
import TableWrapper from "./TableWrapper";
import { Invoice } from "@src/context/invoices/invoicesTypes";

export default function CustomersTable({
  invoice,
  isAddingCustomer,
  customerIndex,
  onAddCustomer,
  onSaveCustomer,
  onCancelSaveCustomer,
  handleCustomerFieldChange,
  onEditCustomer,
  onRemoveCustomer,
  toggleEditingCustomer,
}: {
  invoice?: Invoice;
  isAddingCustomer: boolean;
  customerIndex: number | null;
  onAddCustomer: () => void;
  onSaveCustomer: () => void;
  onCancelSaveCustomer: () => void;
  handleCustomerFieldChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void;
  onEditCustomer: (customerIndex: number) => void;
  onRemoveCustomer: (customerIndex: number) => void;
  toggleEditingCustomer: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  const invoicesContext = useContext(InvoicesContext);

  const onSave = async () => {
    setIsLoading(true);
    await invoicesContext.addCustomer(
      invoice as Invoice,
      invoice?.customers?.[invoice?.customers.length - 1] as Customer,
    );
    onSaveCustomer();
    setIsLoading(false);
  };

  const onSaveEditing = async (customer: Customer) => {
    setIsLoading(true);
    await invoicesContext.editCustomer(invoice as Invoice, customer);
    setIsLoading(false);
    toggleEditingCustomer();
  };

  return (
    <Box my={2}>
      <Typography mb={2} level="title-lg">
        Customers
      </Typography>
      {(invoice?.customers?.length ?? 0) > 0 ? (
        <TableWrapper>
          <Table aria-label="table customers" size="md">
            <thead>
              <tr>
                <th style={{ width: "25px" }}>#</th>
                <th style={{ width: "30%" }}>Name</th>
                <th>Contact</th>
                <th>Aadhar</th>
                <th>PAN</th>
                <th>Passport</th>
                {!isAddingCustomer && (
                  <th style={{ maxWidth: "100px" }}>Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {invoice?.customers?.map((customer, idx) => (
                <tr key={customer.customerId ?? idx}>
                  <td>{idx + 1}</td>
                  <td>
                    {(isAddingCustomer &&
                      idx === invoice?.customers.length - 1) ||
                    customerIndex === idx ? (
                      <InvoiceInput
                        name="name"
                        onChange={(e) => handleCustomerFieldChange(e, idx)}
                        value={customer.name}
                        disabled={isLoading}
                      />
                    ) : (
                      customer.name
                    )}
                  </td>
                  <td>
                    {(isAddingCustomer &&
                      idx === invoice?.customers.length - 1) ||
                    customerIndex === idx ? (
                      <InvoiceInput
                        name="contact"
                        onChange={(e) => handleCustomerFieldChange(e, idx)}
                        value={customer.contact}
                        disabled={isLoading}
                      />
                    ) : (
                      customer.contact
                    )}
                  </td>
                  <td>
                    {(isAddingCustomer &&
                      idx === invoice?.customers.length - 1) ||
                    customerIndex === idx ? (
                      <InvoiceInput
                        name="aadhar"
                        onChange={(e) => handleCustomerFieldChange(e, idx)}
                        value={customer.aadhar}
                        disabled={isLoading}
                      />
                    ) : (
                      customer.aadhar
                    )}
                  </td>
                  <td>
                    {(isAddingCustomer &&
                      idx === invoice?.customers.length - 1) ||
                    customerIndex === idx ? (
                      <InvoiceInput
                        name="pan"
                        onChange={(e) => handleCustomerFieldChange(e, idx)}
                        value={customer.pan}
                        disabled={isLoading}
                      />
                    ) : (
                      customer.pan
                    )}
                  </td>
                  <td>
                    {(isAddingCustomer &&
                      idx === invoice?.customers.length - 1) ||
                    customerIndex === idx ? (
                      <InvoiceInput
                        name="passport"
                        onChange={(e) => handleCustomerFieldChange(e, idx)}
                        value={customer.passport}
                        disabled={isLoading}
                      />
                    ) : (
                      customer.passport
                    )}
                  </td>
                  {!isAddingCustomer && (
                    <td>
                      <Box display="flex" justifyContent="space-around">
                        {customerIndex === idx ? (
                          <Tooltip
                            title={isLoading ? "Saving" : "Save"}
                            placement="top"
                            variant="outlined"
                          >
                            <IconButton
                              variant="outlined"
                              color="primary"
                              onClick={() => onSaveEditing(customer)}
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <CircularProgress />
                              ) : (
                                <SaveRoundedIcon />
                              )}
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <>
                            <Tooltip
                              title="Delete Customer"
                              placement="top"
                              variant="outlined"
                            >
                              <IconButton
                                variant="outlined"
                                color="warning"
                                onClick={() => onRemoveCustomer(idx)}
                              >
                                <CancelOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title="Edit Customer"
                              placement="top"
                              variant="outlined"
                            >
                              <IconButton
                                variant="outlined"
                                color="primary"
                                onClick={() => {
                                  onEditCustomer(idx);
                                }}
                              >
                                <EditNoteOutlinedIcon />
                              </IconButton>
                            </Tooltip>
                          </>
                        )}
                      </Box>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      ) : (
        <Box>
          <Typography>
            Bill to Customer is the only customer, no additional customer
            available.
          </Typography>
        </Box>
      )}
      <Box display="flex" justifyContent="flex-end">
        {isAddingCustomer ? (
          <>
            <Button
              startDecorator={<DoDisturbAltRoundedIcon />}
              onClick={onCancelSaveCustomer}
              variant="outlined"
              color="warning"
              sx={{ mr: 2 }}
              disabled={isLoading}
            >
              Cancel
            </Button>

            <Button
              startDecorator={
                isLoading ? (
                  <CircularProgress variant="solid" />
                ) : (
                  <SaveRoundedIcon />
                )
              }
              onClick={onSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving" : "Save"}
            </Button>
          </>
        ) : (
          <Button
            startDecorator={<PersonAddOutlinedIcon />}
            onClick={onAddCustomer}
            sx={{ my: 2 }}
          >
            Add Customer
          </Button>
        )}
      </Box>
    </Box>
  );
}
