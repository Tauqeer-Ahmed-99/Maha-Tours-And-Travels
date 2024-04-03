import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import Radio from "@mui/joy/Radio";
import RadioGroup from "@mui/joy/RadioGroup";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";

import { TravellingType } from "@src/utilities/types";
import { Invoice } from "@src/context/invoices/invoicesTypes";
import InvoiceInput from "./InvoiceInput";

const InvoiceHeading = ({
  invoice,
  isCreatingNewInvoice,
  setTravellingType,
  setInvoiceDate,
}: {
  invoice?: Invoice;
  isCreatingNewInvoice: boolean;
  setTravellingType: (travellingType: TravellingType) => void;
  setInvoiceDate: (date: string) => void;
}) => {
  return (
    <>
      <Box
        mb={2}
        sx={{
          display: { lg: "flex" },
          justifyContent: { lg: "space-between" },
          alignItems: { lg: "center" },
        }}
      >
        <Typography level="title-lg">
          {isCreatingNewInvoice
            ? "New Invoice"
            : invoice?.billToCustomer.name?.trim() &&
              invoice?.billToCustomer.name?.trim().length > 0
            ? `${invoice?.billToCustomer.name}'s Invoice`
            : "Customer's Invoice"}
        </Typography>
        <Box
          sx={{
            display: { lg: "flex" },
            justifyContent: { lg: "space-between" },
            alignItems: { lg: "center" },
          }}
        >
          <Box>
            <FormControl>
              {/* <FormLabel>Travellerage Type</FormLabel> */}
              <RadioGroup
                onChange={(e) =>
                  setTravellingType(e.target.value as TravellingType)
                }
                value={invoice?.travellingType ?? ""}
              >
                <Box display="flex" gap={2}>
                  <Radio value="Hajj" label="Hajj" variant="soft" />
                  <Radio value="Umrah" label="Umrah" variant="soft" />
                  <Radio value="Other" label="Others" variant="soft" />
                </Box>
              </RadioGroup>
            </FormControl>
          </Box>
          <Divider orientation="vertical" sx={{ mx: 2 }} />
          <Typography level="title-md" sx={{ my: { xs: 2, lg: 0 } }}>
            Invoice Number:{" "}
            <b>{invoice?.travellingType + "-" + invoice?.invoiceNumber}</b>
          </Typography>
          <Divider orientation="vertical" sx={{ mx: 2 }} />
          <Typography level="title-md" mr={1}>
            Date:
          </Typography>
          <InvoiceInput
            value={
              invoice?.date.toISOString().split("T")[0] ??
              new Date().toISOString().split("T")[0]
            }
            onChange={(e) => setInvoiceDate(e.target.value)}
            type="date"
          />
        </Box>
      </Box>
      <Typography level="body-sm" mb={2}>
        Quickly save invoice with ctrl+s
      </Typography>
    </>
  );
};

export default InvoiceHeading;
