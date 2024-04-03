import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import CustomersTable from "@src/components/CustomersTable";
import { Amounts, Customer, Payment } from "@src/utilities/models";
import { useParams } from "react-router-dom";
import PaymentsTable from "@src/components/PaymentsTable";
import { GroupMenuEvent } from "@src/components/GroupMenu";
import AmountTable from "@src/components/AmountTable";
import AmountsSummary from "@src/components/AmountsSummary";
import InvoiceConfirmationDialog from "@src/components/InvoiceConfirmationDialog";
import BillToCustomer from "@src/components/BillToCustomer";
import InvoiceHeading from "@src/components/InvoiceHeading";
import InvoiceFooter from "@src/components/InvoiceFooter";
import { Invoice } from "@src/context/invoices/invoicesTypes";
import { TravellingType } from "@src/utilities/types";
import InvoicesContext from "@src/context/invoices/InvoicesContext";
import InvoiceLoadingSkeleton from "@src/components/InvoiceLoadingSkeleton";
import { useNavigate } from "react-router-dom";
import { Routes } from "@src/routes/routes";
import LoadingDialog from "@src/components/LoadingDialog";
import useSaveShortcut from "@src/hooks/useSaveShortcut";

const InvoiceDetailsScreen = () => {
  const { invoiceId } = useParams();
  const invoicesContext = useContext(InvoicesContext);
  const [isCreatingNewInvoice, setIsCreatingNewInvoice] = useState(
    invoiceId === "new",
  );
  const [isSaving, setIsSaving] = useState(false);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [customerIndex, setCustomerIndex] = useState<number | null>(null);
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [isPaymentConfirmationOpen, setIsPaymentConfirmationOpen] =
    useState(false);
  const [paymentIndex, setPaymentIndex] = useState<number | null>(null);
  const [isDeletingCustomer, setIsDeletingCustomer] = useState(false);
  const [isDeletingPayment, setIsDeletingPayment] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const invoice = invoicesContext.invoices.find(
      (invoice) => invoice.invoiceId === invoiceId,
    ) as Invoice;

    if (invoice) {
      setInvoice(invoice);
    }
  }, [invoiceId, invoicesContext.invoices]);

  useEffect(() => {
    setInvoice((prevInvoice) =>
      prevInvoice
        ? {
            ...prevInvoice,
            amounts: new Amounts(
              invoice?.isBillToATraveller
                ? prevInvoice.customers.length + 1
                : prevInvoice.customers.length,
              prevInvoice.amounts.pricePerUnit,
              prevInvoice.amounts.gstPercent,
              prevInvoice.amounts.tcsPercent,
            ),
          }
        : prevInvoice,
    );
  }, [invoice?.isBillToATraveller, invoice?.customers]);

  useEffect(() => {
    if (!invoicesContext.isError) {
      if (
        invoicesContext.invoices.length > 0 &&
        isCreatingNewInvoice &&
        !invoicesContext.isLoading
      ) {
        const url = Routes.InvoiceDetailsScreen.replace(
          ":invoiceId",
          invoicesContext.invoices[invoicesContext.invoices.length - 1]
            ?.invoiceId as string,
        );
        navigate(url, { replace: true });
      }
    } else {
      navigate(Routes.InvoicesScreen, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    invoicesContext.invoices,
    invoicesContext.isError,
    invoicesContext.isLoading,
  ]);

  const handleBillToFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInvoice((prevInvoice) =>
      prevInvoice
        ? {
            ...prevInvoice,
            billToCustomer: {
              ...prevInvoice.billToCustomer,
              [e.target.name]: e.target.value,
            },
          }
        : prevInvoice,
    );
  };

  const onAddCustomer = () => {
    setInvoice((prevInvoice) =>
      prevInvoice
        ? {
            ...prevInvoice,
            customers: [...prevInvoice.customers, new Customer()],
          }
        : prevInvoice,
    );
    setIsAddingCustomer(true);
    setCustomerIndex(null);
  };

  const onAddPayment = () => {
    setInvoice((prevInvoice) =>
      prevInvoice
        ? { ...prevInvoice, payments: [...prevInvoice.payments, new Payment()] }
        : prevInvoice,
    );
    setIsAddingPayment(true);
    setCustomerIndex(null);
  };

  const openConfirmation = () => {
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  const openPaymentConfirmation = () => {
    setIsPaymentConfirmationOpen(true);
  };

  const closePaymentConfirmation = () => {
    setIsPaymentConfirmationOpen(false);
  };

  const handleCustomerFieldChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setInvoice((prevInvoice) =>
      prevInvoice
        ? {
            ...prevInvoice,
            customers: prevInvoice.customers.map((customer, i) =>
              i === index
                ? {
                    ...customer,
                    [e.target.name]: e.target.value,
                  }
                : customer,
            ),
          }
        : prevInvoice,
    );
  };

  const handlePaymentFieldChange = (
    e: React.ChangeEvent<HTMLInputElement> | GroupMenuEvent,
    index: number,
  ) => {
    setInvoice((prevInvoice) =>
      prevInvoice
        ? {
            ...prevInvoice,
            payments: prevInvoice.payments.map((payment, i) => {
              const newPay = {
                ...payment,
                [e.target.name]:
                  e.target.name === "date"
                    ? new Date(e.target.value)
                    : (e as React.ChangeEvent<HTMLInputElement>).target.value,
              };

              const newPayment = new Payment(
                newPay.paymentNumber,
                newPay.mode,
                newPay.amount === ""
                  ? "0"
                  : newPay.amount.length > 1 && newPay.amount.at(0) == "0"
                  ? parseFloat(newPay.amount).toString()
                  : newPay.amount,
                newPay.date,
              );

              newPayment.paymentId = newPay.paymentId;

              return i === index ? newPayment : payment;
            }),
          }
        : prevInvoice,
    );
  };

  console.log(invoice);

  const handleAmountsFieldChange = (
    e: React.ChangeEvent<HTMLInputElement> | GroupMenuEvent,
  ) => {
    setInvoice((prevInvoice) => {
      if (prevInvoice) {
        const newAmount = {
          ...prevInvoice.amounts,
          [e.target.name]: isNaN(
            Number((e as React.ChangeEvent<HTMLInputElement>).target.value),
          )
            ? (e as React.ChangeEvent<HTMLInputElement>).target.value
            : Number((e as React.ChangeEvent<HTMLInputElement>).target.value),
        };
        return {
          ...prevInvoice,
          amounts: new Amounts(
            newAmount.qty,
            newAmount.pricePerUnit,
            newAmount.gstPercent,
            newAmount.tcsPercent,
          ),
        };
      } else {
        return prevInvoice;
      }
    });
  };

  const onSaveCustomer = () => {
    setIsAddingCustomer(false);
  };

  const onSavePayment = () => {
    setIsAddingPayment(false);
  };

  const onCancelSaveCustomer = () => {
    setInvoice((prevInvoice) =>
      prevInvoice
        ? { ...prevInvoice, customers: prevInvoice.customers.slice(0, -1) }
        : prevInvoice,
    );
    setIsAddingCustomer(false);
  };

  const onCancelSavePayment = () => {
    setInvoice((prevInvoice) =>
      prevInvoice
        ? { ...prevInvoice, payments: prevInvoice.payments.slice(0, -1) }
        : prevInvoice,
    );
    setIsAddingPayment(false);
  };

  const onRemoveCustomer = (customerIndex: number) => {
    setCustomerIndex(customerIndex);
    openConfirmation();
  };

  const onRemovePayment = (paymentIndex: number) => {
    setPaymentIndex(paymentIndex);
    openPaymentConfirmation();
  };

  const onRemoveCustomerConfirm = async () => {
    setIsDeletingCustomer(true);
    closeConfirmation();
    await invoicesContext.removeCustomer(
      invoice as Invoice,
      invoice?.customers[customerIndex as number]?.customerId as string,
    );
    setIsDeletingCustomer(false);
    setCustomerIndex(null);
  };

  const onRemovePaymentConfirm = async () => {
    setIsDeletingPayment(true);
    closePaymentConfirmation();
    await invoicesContext.removePayment(
      invoice as Invoice,
      invoice?.payments[paymentIndex as number]?.paymentId as string,
    );
    setIsDeletingPayment(false);
    setPaymentIndex(null);
  };

  const onRemoveCustomerCancel = () => {
    closeConfirmation();
    setCustomerIndex(null);
  };

  const onRemovePaymentCancel = () => {
    closePaymentConfirmation();
    setPaymentIndex(null);
  };

  const onEditCustomer = (customerIndex: number) => {
    setCustomerIndex(customerIndex);
  };

  const onEditPayment = (paymentIndex: number) => {
    setPaymentIndex(paymentIndex);
  };

  const toggleEditingCustomer = () => {
    setCustomerIndex(null);
  };

  const toggleEditingPayment = () => {
    setPaymentIndex(null);
  };

  const handleTCSChange = (tcsPercent: number) => {
    setInvoice((prevInvoice) =>
      prevInvoice
        ? {
            ...prevInvoice,
            amounts: new Amounts(
              prevInvoice.amounts.qty,
              prevInvoice.amounts.pricePerUnit,
              prevInvoice.amounts.gstPercent,
              tcsPercent,
            ),
          }
        : prevInvoice,
    );
  };

  const onSaveInvoice = async () => {
    setIsSaving(true);
    await invoicesContext.saveInvoice(invoice as Invoice);
    setIsSaving(false);
    setIsCreatingNewInvoice(false);
  };

  useSaveShortcut(onSaveInvoice, [
    invoicesContext.invoices,
    invoiceId,
    invoice,
  ]);

  const setIsBillToATraveller = (isTraveller: boolean) => {
    setInvoice((prevInvoice) =>
      prevInvoice
        ? { ...prevInvoice, isBillToATraveller: isTraveller }
        : prevInvoice,
    );
  };

  const setTravellingType = (travellingType: TravellingType) => {
    setInvoice((prevInvoice) =>
      prevInvoice ? { ...prevInvoice, travellingType } : prevInvoice,
    );
  };

  const setInvoiceDate = (date: string) => {
    setInvoice((prevInvoice) =>
      prevInvoice ? { ...prevInvoice, date: new Date(date) } : prevInvoice,
    );
  };

  if (invoicesContext.isLoading) {
    return <InvoiceLoadingSkeleton />;
  }

  return (
    <Box>
      <InvoiceHeading
        invoice={invoice ?? undefined}
        isCreatingNewInvoice={isCreatingNewInvoice}
        setTravellingType={setTravellingType}
        setInvoiceDate={setInvoiceDate}
      />
      <BillToCustomer
        billToCustomer={invoice?.billToCustomer}
        isBillToATraveller={invoice?.isBillToATraveller}
        setIsBillToATraveller={setIsBillToATraveller}
        handleBillToFieldChange={handleBillToFieldChange}
      />
      <CustomersTable
        invoice={invoice ?? undefined}
        customerIndex={customerIndex}
        isAddingCustomer={isAddingCustomer}
        onAddCustomer={onAddCustomer}
        onSaveCustomer={onSaveCustomer}
        onCancelSaveCustomer={onCancelSaveCustomer}
        handleCustomerFieldChange={handleCustomerFieldChange}
        onEditCustomer={onEditCustomer}
        onRemoveCustomer={onRemoveCustomer}
        toggleEditingCustomer={toggleEditingCustomer}
      />
      <AmountTable
        invoice={invoice ?? undefined}
        handleAmountsFieldChange={handleAmountsFieldChange}
      />
      <PaymentsTable
        invoice={invoice ?? undefined}
        paymentIndex={paymentIndex}
        isAddingPayment={isAddingPayment}
        onAddPayment={onAddPayment}
        onSavePayment={onSavePayment}
        onCancelSavePayment={onCancelSavePayment}
        handlePaymentFieldChange={handlePaymentFieldChange}
        onEditPayment={onEditPayment}
        onRemovePayment={onRemovePayment}
        toggleEditingPayment={toggleEditingPayment}
      />
      <AmountsSummary
        amounts={invoice?.amounts}
        payments={invoice?.payments}
        handleTCSChange={handleTCSChange}
      />
      <InvoiceFooter
        invoice={invoice ?? undefined}
        onSaveInvoice={onSaveInvoice}
      />
      <InvoiceConfirmationDialog
        isConfirmationOpen={isConfirmationOpen}
        isPaymentConfirmationOpen={isPaymentConfirmationOpen}
        onRemoveCustomerCancel={onRemoveCustomerCancel}
        onRemoveCustomerConfirm={onRemoveCustomerConfirm}
        onRemovePaymentCancel={onRemovePaymentCancel}
        onRemovePaymentConfirm={onRemovePaymentConfirm}
      />
      <LoadingDialog
        open={isSaving || isDeletingCustomer || isDeletingPayment}
        loadingMessage={
          isSaving
            ? "Saving Invoice..."
            : isDeletingCustomer
            ? "Deleting Customer..."
            : "Deleting Payment..."
        }
      />
    </Box>
  );
};

export default InvoiceDetailsScreen;
