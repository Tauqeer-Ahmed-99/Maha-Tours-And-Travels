import {
  Box,
  Divider,
  FormControl,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/joy";

const InvoiceHeading = ({
  isCreatingNewInvoice,
  travellingType,
  setTravellingType,
}: {
  isCreatingNewInvoice: boolean;
  travellingType: "hajj" | "umrah" | "other";
  setTravellingType: (travellingType: "hajj" | "umrah" | "other") => void;
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
                setTravellingType(e.target.value as "hajj" | "umrah" | "other")
              }
              value={travellingType}
            >
              <Box display="flex" gap={2}>
                <Radio value="hajj" label="Hajj" variant="soft" />
                <Radio value="umrah" label="Umrah" variant="soft" />
                <Radio value="other" label="Others" variant="soft" />
              </Box>
            </RadioGroup>
          </FormControl>
        </Box>
        <Divider orientation="vertical" sx={{ mx: 2 }} />
        <Typography level="title-md">
          Date:{" "}
          {isCreatingNewInvoice ? new Date().toDateString() : "Customer's Date"}
        </Typography>
      </Box>
    </Box>
  );
};

export default InvoiceHeading;
