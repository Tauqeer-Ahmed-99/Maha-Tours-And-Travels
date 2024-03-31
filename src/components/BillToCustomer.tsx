import { Box, Checkbox, Grid } from "@mui/joy";
import React, { useMemo } from "react";
import InvoiceInput from "./InvoiceInput";
import { Customer } from "@src/utilities/models";
import { getCustomerFieldLabel } from "@src/utilities/helpers";

const BillToCustomer = ({
  billToCustomer,
  isBillToATraveller,
  setIsBillToATraveller,
  handleBillToFieldChange,
}: {
  billToCustomer: Customer;
  isBillToATraveller: boolean;
  setIsBillToATraveller: (isTraveller: boolean) => void;
  handleBillToFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const billToCustomerFields = useMemo(
    () => Object.keys(billToCustomer).filter((field) => field !== "customerId"),
    [billToCustomer]
  );

  return (
    <>
      <Grid container spacing={2}>
        {billToCustomerFields.map((field, idx) => (
          <Grid
            key={field}
            xs={12}
            md={idx !== 0 ? 6 : undefined}
            lg={idx !== 0 ? 4 : undefined}
          >
            <InvoiceInput
              label={getCustomerFieldLabel(field, true)}
              name={field}
              value={
                (billToCustomer as unknown as { [key: string]: string })[field]
              }
              onChange={handleBillToFieldChange}
            />
          </Grid>
        ))}
      </Grid>
      <Box my={2}>
        <Checkbox
          label="Is Bill To a Traveller?"
          onChange={(e) => setIsBillToATraveller(e.target.checked)}
          checked={isBillToATraveller}
        />
      </Box>
    </>
  );
};

export default BillToCustomer;
