import Table from "@mui/joy/Table";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/joy";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import DoDisturbAltRoundedIcon from "@mui/icons-material/DoDisturbAltRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { Customer } from "@src/utilities/models";
import React from "react";
import InvoiceInput from "./InvoiceInput";

export default function CustomersTable({
  customers,
  isAddingCustomer,
  customerIndex,
  onAddCustomer,
  onSaveCustomer,
  onCancelSaveCustomer,
  handleCustomerFieldChange,
  onEditCustomer,
  onRemoveCustomer,
  saveEditedCustomer,
}: //   cancelEditingCustomer,
{
  customers: Customer[];
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
  saveEditedCustomer: () => void;
  cancelEditingCustomer: () => void;
}) {
  return (
    <Box my={2}>
      <Typography mb={2} level="title-lg">
        Customers
      </Typography>
      {customers.length > 0 && (
        <Table aria-label="table sizes" size={"md"}>
          <thead>
            <tr>
              <th style={{ width: "12px" }}>#</th>
              <th style={{ width: "30%" }}>Name</th>
              <th>Contact</th>
              <th>Aadhar</th>
              <th>PAN</th>
              <th>Passport</th>
              {!isAddingCustomer && <th style={{ width: "100px" }}>Action</th>}
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, idx) => (
              <tr key={customer.name + idx}>
                <td>{idx + 1}</td>
                <td>
                  {(isAddingCustomer && idx === customers.length - 1) ||
                  customerIndex === idx ? (
                    <InvoiceInput
                      name="name"
                      onChange={(e) => handleCustomerFieldChange(e, idx)}
                      value={customer.name}
                    />
                  ) : (
                    customer.name
                  )}
                </td>
                <td>
                  {(isAddingCustomer && idx === customers.length - 1) ||
                  customerIndex === idx ? (
                    <InvoiceInput
                      name="contact"
                      onChange={(e) => handleCustomerFieldChange(e, idx)}
                      value={customer.contact}
                    />
                  ) : (
                    customer.contact
                  )}
                </td>
                <td>
                  {(isAddingCustomer && idx === customers.length - 1) ||
                  customerIndex === idx ? (
                    <InvoiceInput
                      name="aadhar"
                      onChange={(e) => handleCustomerFieldChange(e, idx)}
                      value={customer.aadhar}
                    />
                  ) : (
                    customer.aadhar
                  )}
                </td>
                <td>
                  {(isAddingCustomer && idx === customers.length - 1) ||
                  customerIndex === idx ? (
                    <InvoiceInput
                      name="pan"
                      onChange={(e) => handleCustomerFieldChange(e, idx)}
                      value={customer.pan}
                    />
                  ) : (
                    customer.pan
                  )}
                </td>
                <td>
                  {(isAddingCustomer && idx === customers.length - 1) ||
                  customerIndex === idx ? (
                    <InvoiceInput
                      name="passport"
                      onChange={(e) => handleCustomerFieldChange(e, idx)}
                      value={customer.passport}
                    />
                  ) : (
                    customer.passport
                  )}
                </td>
                {!isAddingCustomer && (
                  <td>
                    <Box display="flex" justifyContent="space-around">
                      {customerIndex === idx ? (
                        <>
                          {/* <Tooltip
                            title="Cancel"
                            placement="top"
                            variant="outlined"
                          >
                            <IconButton
                              variant="outlined"
                              color="warning"
                              onClick={cancelEditingCustomer}
                            >
                              <CancelOutlinedIcon />
                            </IconButton>
                          </Tooltip> */}
                          <Tooltip
                            title="Save"
                            placement="top"
                            variant="outlined"
                          >
                            <IconButton
                              variant="outlined"
                              color="primary"
                              onClick={saveEditedCustomer}
                            >
                              <SaveRoundedIcon />
                            </IconButton>
                          </Tooltip>
                        </>
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
                              onClick={() => onEditCustomer(idx)}
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
            >
              Cancel
            </Button>
            <Button
              startDecorator={<SaveRoundedIcon />}
              onClick={onSaveCustomer}
            >
              Save
            </Button>
          </>
        ) : (
          <Button
            startDecorator={<AddCircleOutlineRoundedIcon />}
            onClick={onAddCustomer}
          >
            Add Customer
          </Button>
        )}
      </Box>
    </Box>
  );
}
