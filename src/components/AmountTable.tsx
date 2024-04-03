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
import TableWrapper from "./TableWrapper";
import { Invoice } from "@src/context/invoices/invoicesTypes";

const AmountTable = ({
  invoice,
  handleAmountsFieldChange,
}: {
  invoice?: Invoice;
  handleAmountsFieldChange: (
    e: React.ChangeEvent<HTMLInputElement> | GroupMenuEvent,
  ) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const invoicesContext = useContext(InvoicesContext);

  const editAmounts = () => {
    setIsEditing(true);
  };

  const saveAmounts = async () => {
    setIsEditing(false);
    setIsLoading(true);
    await invoicesContext.saveAmounts(
      invoice as Invoice,
      invoice?.amounts as Amounts,
    );
    setIsLoading(false);
  };

  return (
    <Box my={2}>
      <Typography mb={2} level="title-lg">
        Amounts
      </Typography>
      <TableWrapper>
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
              <td>{invoice?.amounts?.qty}</td>
              <td>
                {isEditing ? (
                  <InvoiceInput
                    name="pricePerUnit"
                    onChange={(e) => handleAmountsFieldChange(e)}
                    value={invoice?.amounts?.pricePerUnit?.toString()}
                    disabled={isLoading}
                  />
                ) : (
                  invoice?.amounts?.pricePerUnit
                )}
              </td>
              <td>
                {isEditing ? (
                  <GroupMenu
                    options={["5", "10", "15", "18"]}
                    selectedOption={
                      invoice?.amounts?.gstPercent?.toString() ?? "5"
                    }
                    disabled={isLoading}
                    setSelectedOption={(option) =>
                      handleAmountsFieldChange({
                        target: { name: "gstPercent", value: option },
                      })
                    }
                  />
                ) : (
                  invoice?.amounts?.gstPercent + "%"
                )}
              </td>
              <td>{invoice?.amounts?.gstAmount.toFixed(2)}</td>
              <td>{invoice?.amounts?.totalAmountWithGst.toFixed(2)}</td>
              <td>
                <Tooltip
                  title={
                    isEditing
                      ? isLoading
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
                    onClick={isEditing ? saveAmounts : editAmounts}
                    disabled={isLoading}
                  >
                    {isEditing ? (
                      <SaveRoundedIcon />
                    ) : isLoading ? (
                      <CircularProgress />
                    ) : (
                      <EditNoteOutlinedIcon />
                    )}
                  </IconButton>
                </Tooltip>
              </td>
            </tr>
          </tbody>
        </Table>
      </TableWrapper>
    </Box>
  );
};

export default AmountTable;
