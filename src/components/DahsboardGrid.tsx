import { useContext, useMemo } from "react";
import Grid from "@mui/joy/Grid";
import SummaryTile from "./SummaryTile";
import InvoicesContext from "@src/context/invoices/InvoicesContext";
import { getDashboardCardLabel } from "@src/utilities/helpers";

const DahsboardGrid = () => {
  const invoicesContext = useContext(InvoicesContext);

  const dashboardCards = useMemo(() => {
    const invoicesData: { [key: string]: number } = {
      hajjInvoices: 0,
      hajjNetAmount: 0,
      hajjReceivedAmount: 0,
      umrahInvoices: 0,
      umrahNetAmount: 0,
      umrahReceivedAmount: 0,
      otherInvoices: 0,
      otherNetAmount: 0,
      otherReceivedAmount: 0,
    };
    invoicesContext.invoices.forEach((invoice) => {
      const travellingType = invoice.travellingType.toLowerCase();

      invoicesData[`${travellingType}Invoices`] += 1;
      invoicesData[`${travellingType}NetAmount`] += invoice.amounts.totalAmount;
      invoice.payments.forEach(
        (payment) =>
          (invoicesData[`${travellingType}ReceivedAmount`] += parseFloat(
            payment.amount,
          )),
      );
    });
    return Object.entries(invoicesData).map(([name, value]) => ({
      name: getDashboardCardLabel(name),
      value: name.toLowerCase().includes("amount") ? value.toFixed(2) : value,
    }));
  }, [invoicesContext.invoices]);

  return (
    <Grid container spacing={2}>
      {dashboardCards.map((card) => (
        <Grid key={card.name} xs={12} md={6} lg={4}>
          <SummaryTile
            key={card.name}
            heading={card.name}
            content={
              card.name.toLocaleLowerCase().includes("amount")
                ? "₹ " + card.value
                : card.value
            }
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default DahsboardGrid;
