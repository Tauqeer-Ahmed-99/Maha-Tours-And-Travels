import {
  Box,
  Divider,
  FormControl,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/joy";
import { TravellingType } from "@src/utilities/types";

const InvoiceHeading = ({
  isCreatingNewInvoice,
  travellingType,
  setTravellingType,
  invoiceDate,
}: {
  isCreatingNewInvoice: boolean;
  travellingType: TravellingType;
  setTravellingType: (travellingType: TravellingType) => void;
  invoiceDate?: Date;
}) => {
  return (
    <Box
      mb={2}
      sx={{
        display: { lg: "flex" },
        justifyContent: { lg: "space-between" },
        alignItems: { lg: "center" },
      }}
    >
      <Typography level="title-lg">
        {isCreatingNewInvoice ? "New Invoice" : "Customer's Invoice"}
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
              value={travellingType}
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
        <Typography level="title-md">
          Date:{" "}
          {isCreatingNewInvoice
            ? new Date().toDateString()
            : invoiceDate?.toDateString()}
        </Typography>
      </Box>
    </Box>
  );
};

export default InvoiceHeading;
