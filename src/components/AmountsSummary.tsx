import { useMemo } from "react";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import GroupMenu from "./GroupMenu";
import { Amounts, Payment } from "@src/utilities/models";

const AmountsSummary = ({
  amounts,
  payments,
  returnPayments,
  handleTCSChange,
}: {
  amounts?: Amounts;
  payments?: Payment[];
  returnPayments?: Payment[];
  handleTCSChange: (tcsPercent: number) => void;
}) => {
  const amountReceived = useMemo(() => {
    let amountReceived = 0;
    payments?.forEach(
      (payment) => (amountReceived += parseFloat(payment.amount)),
    );
    return amountReceived;
  }, [payments]);

  const amountReturned = useMemo(() => {
    let amountReturned = 0;
    returnPayments?.forEach(
      (payment) => (amountReturned += parseFloat(payment.amount)),
    );
    return amountReturned;
  }, [returnPayments]);

  return (
    <Box
      my={2}
      sx={{ display: { lg: "flex" }, justifyContent: { lg: "flex-end" } }}
    >
      <Box
        sx={{
          width: { sm: "100%", lg: "50%" },
          "& .MuiTypography-root": { width: "50%" },
        }}
      >
        <Typography level="title-lg">Amount Summary</Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my={1}
          gap={1}
        >
          <Typography>Sub Total</Typography>
          <Typography>
            &#8377;
            {amounts?.totalAmountWithGst.toFixed(2)}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my={1}
          gap={1}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography mr={2}>TCS</Typography>
            <GroupMenu
              options={["0", "5", "8", "10"]}
              selectedOption={amounts?.tcsPercent?.toString() ?? "0"}
              setSelectedOption={(option) => handleTCSChange(+option)}
            />
            <Typography ml={1}>%</Typography>
          </Box>
          <Typography>
            &#8377;
            {amounts?.tcsAmount.toFixed(2)}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography level="title-lg">Total</Typography>
          <Typography level="title-lg">
            &#8377;{amounts?.totalAmount.toFixed(2)}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my={1}
          gap={1}
        >
          <Typography color="success">Received</Typography>
          <Typography color="success">
            &#8377;{amountReceived.toFixed(2)}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my={1}
          gap={1}
        >
          <Typography color="success">Returned</Typography>
          <Typography color="success">
            &#8377;{amountReturned.toFixed(2)}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          gap={1}
        >
          <Typography color="warning">Balance</Typography>
          <Typography color="warning">
            &#8377;{((amounts?.totalAmount ?? 0) - amountReceived).toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AmountsSummary;
