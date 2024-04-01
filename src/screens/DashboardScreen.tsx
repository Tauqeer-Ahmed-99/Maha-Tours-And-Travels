import { useContext } from "react";
import Box from "@mui/joy/Box";
import BalanceSummary from "@src/components/BalanceSummary";
import DahsboardGrid from "@src/components/DahsboardGrid";
import InvoicesContext from "@src/context/invoices/InvoicesContext";
import DashboardSkeleton from "@src/components/DashboardSkeleton";

const DashboardScreen = () => {
  const invoicesContext = useContext(InvoicesContext);

  if (invoicesContext.isLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <Box>
      <BalanceSummary />
      <Box my={2}>
        <DahsboardGrid />
      </Box>
    </Box>
  );
};

export default DashboardScreen;
