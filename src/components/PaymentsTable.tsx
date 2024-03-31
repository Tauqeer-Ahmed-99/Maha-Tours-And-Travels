import Table from "@mui/joy/Table";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/joy";
import PriceCheckOutlinedIcon from "@mui/icons-material/PriceCheckOutlined";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import DoDisturbAltRoundedIcon from "@mui/icons-material/DoDisturbAltRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { Payment } from "@src/utilities/models";
import React from "react";
import InvoiceInput from "./InvoiceInput";
import GroupMenu, { GroupMenuEvent } from "./Menu";

export default function CustomersTable({
  payments,
  isAddingPayment,
  paymentIndex,
  onAddPayment,
  onSavePayment,
  onCancelSavePayment,
  handlePaymentFieldChange,
  onEditPayment,
  onRemovePayment,
  toggleEditingPayment,
}: {
  payments: Payment[];
  isAddingPayment: boolean;
  paymentIndex: number | null;
  onAddPayment: () => void;
  onSavePayment: () => void;
  onCancelSavePayment: () => void;
  handlePaymentFieldChange: (
    e: React.ChangeEvent<HTMLInputElement> | GroupMenuEvent,
    index: number
  ) => void;
  onEditPayment: (paymentIndex: number) => void;
  onRemovePayment: (paymentIndex: number) => void;
  toggleEditingPayment: () => void;
}) {
  return (
    <Box my={2}>
      <Typography mb={2} level="title-lg">
        Payments
      </Typography>
      {payments.length > 0 ? (
        <Table aria-label="table payments" size="md">
          <thead>
            <tr>
              <th style={{ width: "25px" }}>#</th>
              <th>Payment Type</th>
              <th>Last 4 digits</th>
              {/* <th>Quantity</th> */}
              {/* <th>Price / Unit</th> */}
              {/* <th>GST %</th> */}
              {/* <th>GST Amount</th> */}
              <th>Amount</th>
              <th>Date</th>
              {!isAddingPayment && (
                <th style={{ maxWidth: "100px" }}>Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, idx) => (
              <tr key={payment.paymentId ?? idx}>
                <td>{idx + 1}</td>
                <td>
                  {(isAddingPayment && idx === payments.length - 1) ||
                  paymentIndex === idx ? (
                    <GroupMenu
                      options={["CASH", "CHEQUE", "NEFT", "RTGS"]}
                      selectedOption={payment.mode}
                      setSelectedOption={(option) =>
                        handlePaymentFieldChange(
                          { target: { name: "mode", value: option } },
                          idx
                        )
                      }
                    />
                  ) : (
                    payment.mode
                  )}
                </td>
                <td>
                  {(isAddingPayment && idx === payments.length - 1) ||
                  paymentIndex === idx ? (
                    <InvoiceInput
                      name="paymentNumber"
                      onChange={(e) => handlePaymentFieldChange(e, idx)}
                      value={payment.paymentNumber?.toString()}
                    />
                  ) : (
                    payment.paymentNumber
                  )}
                </td>
                {/* <td>
                  {(isAddingPayment && idx === payments.length - 1) ||
                  paymentIndex === idx ? (
                    <InvoiceInput
                      name="qty"
                      onChange={(e) => handlePaymentFieldChange(e, idx)}
                      value={payment.qty?.toString()}
                    />
                  ) : (
                    payment.qty
                  )}
                </td> */}
                {/* <td>
                  {(isAddingPayment && idx === payments.length - 1) ||
                  paymentIndex === idx ? (
                    <InvoiceInput
                      name="pricePerUnit"
                      onChange={(e) => handlePaymentFieldChange(e, idx)}
                      value={payment.pricePerUnit?.toString()}
                    />
                  ) : (
                    payment.pricePerUnit
                  )}
                </td> */}
                {/* <td>
                  {(isAddingPayment && idx === payments.length - 1) ||
                  paymentIndex === idx ? (
                    <GroupMenu
                      options={["5", "10", "15", "18"]}
                      selectedOption={payment.gstPercent?.toString()}
                      setSelectedOption={(option) =>
                        handlePaymentFieldChange(
                          { target: { name: "gstPercent", value: option } },
                          idx
                        )
                      }
                    />
                  ) : (
                    // <InvoiceInput
                    //   name="gstPercent"
                    //   onChange={(e) => handlePaymentFieldChange(e, idx)}
                    //   value={payment.gstPercent?.toString()}
                    // />
                    payment.gstPercent
                  )}
                </td> */}
                {/* <td>
                  {
                    // <InvoiceInput
                    //   name="gstPercent"
                    //   onChange={(e) => handlePaymentFieldChange(e, idx)}
                    //   value={payment.gstPercent?.toString()}
                    // />
                    payment.gstAmount
                  }
                </td> */}
                <td>
                  {(isAddingPayment && idx === payments.length - 1) ||
                  paymentIndex === idx ? (
                    <InvoiceInput
                      name="amount"
                      onChange={(e) => handlePaymentFieldChange(e, idx)}
                      value={payment.amount?.toString()}
                    />
                  ) : (
                    payment.amount
                  )}
                </td>
                <td>
                  {(isAddingPayment && idx === payments.length - 1) ||
                  paymentIndex === idx ? (
                    <InvoiceInput
                      name="date"
                      onChange={(e) => handlePaymentFieldChange(e, idx)}
                      value={payment.date.toDateString()}
                      disabled
                    />
                  ) : (
                    payment.date.toDateString()
                  )}
                </td>
                {!isAddingPayment && (
                  <td>
                    <Box display="flex" justifyContent="space-around">
                      {paymentIndex === idx ? (
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
                              onClick={toggleEditingPayment}
                            >
                              <SaveRoundedIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      ) : (
                        <>
                          <Tooltip
                            title="Delete Payment"
                            placement="top"
                            variant="outlined"
                          >
                            <IconButton
                              variant="outlined"
                              color="warning"
                              onClick={() => onRemovePayment(idx)}
                            >
                              <CancelOutlinedIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            title="Edit Payment"
                            placement="top"
                            variant="outlined"
                          >
                            <IconButton
                              variant="outlined"
                              color="primary"
                              onClick={() => onEditPayment(idx)}
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
      ) : (
        <Box>
          <Typography>No payment available.</Typography>
        </Box>
      )}
      <Box display="flex" justifyContent="flex-end">
        {isAddingPayment ? (
          <>
            <Button
              startDecorator={<DoDisturbAltRoundedIcon />}
              onClick={onCancelSavePayment}
              variant="outlined"
              color="warning"
              sx={{ mr: 2 }}
            >
              Cancel
            </Button>
            <Button
              startDecorator={<SaveRoundedIcon />}
              onClick={onSavePayment}
            >
              Save
            </Button>
          </>
        ) : (
          <Button
            startDecorator={<PriceCheckOutlinedIcon />}
            onClick={onAddPayment}
            sx={{ my: 2 }}
          >
            Add Payment
          </Button>
        )}
      </Box>
    </Box>
  );
}
