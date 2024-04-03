import Table from "@mui/joy/Table";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import IconButton from "@mui/joy/IconButton";
import Tooltip from "@mui/joy/Tooltip";
import Typography from "@mui/joy/Typography";
import CircularProgress from "@mui/joy/CircularProgress";
import PriceCheckOutlinedIcon from "@mui/icons-material/PriceCheckOutlined";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import DoDisturbAltRoundedIcon from "@mui/icons-material/DoDisturbAltRounded";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import { Payment } from "@src/utilities/models";
import React, { useContext, useState } from "react";
import InvoiceInput from "./InvoiceInput";
import GroupMenu, { GroupMenuEvent } from "./GroupMenu";
import InvoicesContext from "@src/context/invoices/InvoicesContext";
import TableWrapper from "./TableWrapper";
import { Invoice } from "@src/context/invoices/invoicesTypes";

export default function CustomersTable({
  invoice,
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
  invoice?: Invoice;
  isAddingPayment: boolean;
  paymentIndex: number | null;
  onAddPayment: () => void;
  onSavePayment: () => void;
  onCancelSavePayment: () => void;
  handlePaymentFieldChange: (
    e: React.ChangeEvent<HTMLInputElement> | GroupMenuEvent,
    index: number,
  ) => void;
  onEditPayment: (paymentIndex: number) => void;
  onRemovePayment: (paymentIndex: number) => void;
  toggleEditingPayment: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const invoicesContext = useContext(InvoicesContext);

  const onSave = async () => {
    setIsLoading(true);
    await invoicesContext.addPayment(
      invoice as Invoice,
      invoice?.payments?.[invoice?.payments.length - 1] as Payment,
    );
    setIsLoading(false);
    onSavePayment();
  };

  const onSaveEditing = async (payment: Payment) => {
    setIsLoading(true);
    await invoicesContext.editPayment(invoice as Invoice, payment);
    setIsLoading(false);
    toggleEditingPayment();
  };

  return (
    <Box my={2}>
      <Typography mb={2} level="title-lg">
        Payments
      </Typography>
      {(invoice?.payments?.length ?? 0) > 0 ? (
        <TableWrapper>
          <Table aria-label="table payments" size="md">
            <thead>
              <tr>
                <th style={{ width: "25px" }}>#</th>
                <th>Payment Type</th>
                <th>Last 4 digits</th>
                <th>Amount</th>
                <th>Date</th>
                {!isAddingPayment && (
                  <th style={{ maxWidth: "100px" }}>Action</th>
                )}
              </tr>
            </thead>
            <tbody>
              {invoice?.payments?.map((payment, idx) => (
                <tr key={payment.paymentId ?? idx}>
                  <td>{idx + 1}</td>
                  <td>
                    {(isAddingPayment &&
                      idx === invoice?.payments.length - 1) ||
                    paymentIndex === idx ? (
                      <GroupMenu
                        options={["CASH", "CHEQUE", "NEFT", "RTGS"]}
                        selectedOption={payment.mode}
                        disabled={isLoading}
                        setSelectedOption={(option) =>
                          handlePaymentFieldChange(
                            { target: { name: "mode", value: option } },
                            idx,
                          )
                        }
                      />
                    ) : (
                      payment.mode
                    )}
                  </td>
                  <td>
                    {(isAddingPayment &&
                      idx === invoice?.payments.length - 1) ||
                    paymentIndex === idx ? (
                      <InvoiceInput
                        name="paymentNumber"
                        onChange={(e) => handlePaymentFieldChange(e, idx)}
                        value={payment.paymentNumber?.toString()}
                        disabled={isLoading}
                      />
                    ) : (
                      payment.paymentNumber
                    )}
                  </td>
                  <td>
                    {(isAddingPayment && idx === invoice.payments.length - 1) ||
                    paymentIndex === idx ? (
                      <InvoiceInput
                        name="amount"
                        onChange={(e) => handlePaymentFieldChange(e, idx)}
                        value={payment.amount?.toString()}
                        disabled={isLoading}
                      />
                    ) : (
                      payment.amount
                    )}
                  </td>
                  <td>
                    {(isAddingPayment &&
                      idx === invoice?.payments.length - 1) ||
                    paymentIndex === idx ? (
                      <InvoiceInput
                        name="date"
                        type="date"
                        onChange={(e) => handlePaymentFieldChange(e, idx)}
                        value={payment.date.toISOString().split("T")[0]}
                        disabled={isLoading}
                      />
                    ) : (
                      payment.date.toDateString()
                    )}
                  </td>
                  {!isAddingPayment && (
                    <td>
                      <Box display="flex" justifyContent="space-around">
                        {paymentIndex === idx ? (
                          <Tooltip
                            title={isLoading ? "Saving" : "Save"}
                            placement="top"
                            variant="outlined"
                          >
                            <IconButton
                              variant="outlined"
                              color="primary"
                              onClick={() => onSaveEditing(payment)}
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
        </TableWrapper>
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
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              startDecorator={
                isLoading ? <CircularProgress /> : <SaveRoundedIcon />
              }
              onClick={onSave}
              disabled={isLoading}
            >
              {isLoading ? "Saving" : "Save"}
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
