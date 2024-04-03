import { useContext, useMemo } from "react";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CircularProgress from "@mui/joy/CircularProgress";
import Typography from "@mui/joy/Typography";
import SvgIcon from "@mui/joy/SvgIcon";
import InvoicesContext from "@src/context/invoices/InvoicesContext";

const BalanceSummary = () => {
  const invoicesContext = useContext(InvoicesContext);

  const netTotal = useMemo(() => {
    let netAmount = 0;
    let netReceived = 0;
    invoicesContext.invoices.forEach((invoice) => {
      netAmount += invoice.amounts.totalAmount;
      invoice.payments.forEach((payment) => {
        netReceived += parseFloat(payment.amount);
      });
    });
    return {
      netAmount,
      netReceived,
      netBalancePercent: (netReceived / netAmount) * 100,
    };
  }, [invoicesContext.invoices]);

  return (
    <Card variant="solid" color="primary" invertedColors>
      <CardContent orientation="horizontal">
        <CircularProgress
          size="lg"
          determinate
          value={netTotal.netBalancePercent}
        >
          <SvgIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
              />
            </svg>
          </SvgIcon>
        </CircularProgress>
        <CardContent>
          <Typography level="body-md">Amount</Typography>
          <Typography level="h2">
            ₹ {netTotal.netReceived.toFixed(2)}
          </Typography>
          <Typography level="title-sm">
            Received of ₹ {netTotal.netAmount.toFixed(2)}
          </Typography>
        </CardContent>
      </CardContent>
    </Card>
  );
};

export default BalanceSummary;
