import { useContext, useState } from "react";
import Box from "@mui/joy/Box";
import CircularProgress from "@mui/joy/CircularProgress";
import IconButton from "@mui/joy/IconButton";
import Table from "@mui/joy/Table";
import Tooltip from "@mui/joy/Tooltip";
import Typography from "@mui/joy/Typography";
import { Amounts } from "@src/utilities/models";
import InvoiceInput from "./InvoiceInput";
import GroupMenu, { GroupMenuEvent } from "./GroupMenu";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import InvoicesContext from "@src/context/invoices/InvoicesContext";

const AmountTable = ({
  invocieId,
  amounts,
  isEditingAmounts,
  setIsEditingAmounts,
  handleAmountsFieldChange,
}: {
  invocieId?: string;
  amounts: Amounts;
  isEditingAmounts: boolean;
  setIsEditingAmounts: (isEditing: boolean) => void;
  handleAmountsFieldChange: (
    e: React.ChangeEvent<HTMLInputElement> | GroupMenuEvent,
  ) => void;
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const invoicesContext = useContext(InvoicesContext);

  const saveAmounts = async () => {
    setIsSaving(true);
    invoicesContext.saveAmounts(invocieId as string, amounts);
    setIsSaving(false);
    setIsEditingAmounts(!isEditingAmounts);
  };

  return (
    <Box my={2}>
      <Typography mb={2} level="title-lg">
        Amounts
      </Typography>
      <Table aria-label="table customers" size="md">
        <thead>
          <tr>
            <th style={{ width: "25px" }}>#</th>
            <th>Quantity</th>
            <th>Price / Unit</th>
            <th>GST %</th>
            <th>GST Amount</th>
            <th>Amount</th>
            <th style={{ maxWidth: "100px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>{amounts.qty}</td>
            <td>
              {isEditingAmounts ? (
                <InvoiceInput
                  name="pricePerUnit"
                  onChange={(e) => handleAmountsFieldChange(e)}
                  value={amounts.pricePerUnit?.toString()}
                  disabled={isSaving}
                />
              ) : (
                amounts?.pricePerUnit
              )}
            </td>
            <td>
              {isEditingAmounts ? (
                <GroupMenu
                  options={["5", "10", "15", "18"]}
                  selectedOption={amounts.gstPercent?.toString()}
                  disabled={isSaving}
                  setSelectedOption={(option) =>
                    handleAmountsFieldChange({
                      target: { name: "gstPercent", value: option },
                    })
                  }
                />
              ) : (
                amounts.gstPercent + "%"
              )}
            </td>
            <td>{amounts?.gstAmount}</td>
            <td>{amounts?.totalAmountWithGst}</td>
            <td>
              <Tooltip
                title={
                  isEditingAmounts
                    ? isSaving
                      ? "Saving Amount"
                      : "Save Amount"
                    : "Edit Amounts"
                }
                placement="top"
                variant="outlined"
              >
                <IconButton
                  variant="outlined"
                  color="primary"
                  onClick={saveAmounts}
                  disabled={isSaving}
                >
                  {isEditingAmounts ? (
                    isSaving ? (
                      <CircularProgress />
                    ) : (
                      <SaveRoundedIcon />
                    )
                  ) : (
                    <EditNoteOutlinedIcon />
                  )}
                </IconButton>
              </Tooltip>
            </td>
          </tr>
        </tbody>
      </Table>
    </Box>
  );
};

export default AmountTable;
