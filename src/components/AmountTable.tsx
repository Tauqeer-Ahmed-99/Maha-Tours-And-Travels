import { Box, IconButton, Table, Tooltip, Typography } from "@mui/joy";
import { Amounts } from "@src/utilities/models";
import InvoiceInput from "./InvoiceInput";
import GroupMenu, { GroupMenuEvent } from "./Menu";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

const AmountTable = ({
  amounts,
  isEditingAmounts,
  setIsEditingAmounts,
  handleAmountsFieldChange,
}: {
  amounts: Amounts;
  isEditingAmounts: boolean;
  setIsEditingAmounts: (isEditing: boolean) => void;
  handleAmountsFieldChange: (
    e: React.ChangeEvent<HTMLInputElement> | GroupMenuEvent
  ) => void;
}) => {
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
                title={isEditingAmounts ? "Save Amount" : "Edit Amounts"}
                placement="top"
                variant="outlined"
              >
                <IconButton
                  variant="outlined"
                  color="primary"
                  onClick={() => setIsEditingAmounts(!isEditingAmounts)}
                >
                  {isEditingAmounts ? (
                    <SaveRoundedIcon />
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
