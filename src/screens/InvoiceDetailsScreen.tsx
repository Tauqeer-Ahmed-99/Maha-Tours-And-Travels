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
  const [isCreatingNewInvoice, setIsCreatingNewInvoice] = useState(
    invoiceId === "new",
  );
  const [isSaving, setIsSaving] = useState(false);

  const invoicesContext = useContext(InvoicesContext);

  const [travellingType, setTravellingType] = useState<TravellingType>(
    TravellingType.HAJJ,
  );
  const [invoiceNumber, setInvoiceNumber] = useState(Number());
  const [billToCustomer, setBillToCustomer] = useState(new Customer());
  const [isBillToATraveller, setIsBillToATraveller] = useState(true);
  const [invoiceDate, setInvoiceDate] = useState<Date>(new Date());

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [customerIndex, setCustomerIndex] = useState<null | number>(null);

  const [payments, setPayments] = useState<Payment[]>([]);
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [isPaymentConfirmationOpen, setIsPaymentConfirmationOpen] =
    useState(false);
  const [paymentIndex, setPaymentIndex] = useState<null | number>(null);

  const [amounts, setAmounts] = useState(
    new Amounts(
      isBillToATraveller ? customers.length + 1 : customers.length,
      500000,
      5,
      5,
    ),
  );
  const [isDeletingCustomer, setIsDeletingCustomer] = useState(false);
  const [isDeletingPayment, setIsDeletingPayment] = useState(false);

  const navigate = useNavigate();

  const invoice = invoicesContext.invoices.find(
    (invoice) => invoice.invoiceId === invoiceId,
  ) as Invoice;

  useEffect(() => {
    if (invoice) {
      setBillToCustomer(invoice.billToCustomer);
      setTravellingType(invoice.travellingType);
      setInvoiceNumber(invoice.invoiceNumber);
      setIsBillToATraveller(invoice.isBillToATraveller);
      setCustomers(invoice.customers);
      setPayments(invoice.payments);
      setAmounts(invoice.amounts);
      setInvoiceDate(invoice.date);
    }
  }, [invoice, invoiceId, invoicesContext.invoices]);

  useEffect(() => {
    setAmounts(
      (amounts) =>
        new Amounts(
          isBillToATraveller ? customers.length + 1 : customers.length,
          amounts.pricePerUnit,
          amounts.gstPercent,
          amounts.tcsPercent,
        ),
    );
  }, [isBillToATraveller, customers, invoicesContext.invoices]);

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
    setBillToCustomer((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onAddCustomer = () => {
    setCustomers((prevCustomers) => [...prevCustomers, new Customer()]);
    setIsAddingCustomer(true);
    setCustomerIndex(null);
  };

  const onAddPayment = () => {
    setPayments((prevPayments) => [...prevPayments, new Payment()]);
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
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer, i) =>
        i === index
          ? {
              ...customer,
              [e.target.name]: e.target.value,
            }
          : customer,
      ),
    );
  };

  const handlePaymentFieldChange = (
    e: React.ChangeEvent<HTMLInputElement> | GroupMenuEvent,
    index: number,
  ) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment, i) => {
        const newPay = {
          ...payment,
          [e.target.name]: isNaN(
            Number((e as React.ChangeEvent<HTMLInputElement>).target.value),
          )
            ? (e as React.ChangeEvent<HTMLInputElement>).target.value
            : Number((e as React.ChangeEvent<HTMLInputElement>).target.value),
        };

        const newPayment = new Payment(
          newPay.paymentNumber,
          newPay.mode,
          newPay.amount,
        );

        newPayment.paymentId = newPay.paymentId;

        return i === index ? newPayment : payment;
      }),
    );
  };

  const handleAmountsFieldChange = (
    e: React.ChangeEvent<HTMLInputElement> | GroupMenuEvent,
  ) => {
    setAmounts((prevAmounts) => {
      const newAmount = {
        ...prevAmounts,
        [e.target.name]: isNaN(
          Number((e as React.ChangeEvent<HTMLInputElement>).target.value),
        )
          ? (e as React.ChangeEvent<HTMLInputElement>).target.value
          : Number((e as React.ChangeEvent<HTMLInputElement>).target.value),
      };

      return new Amounts(
        newAmount.qty,
        newAmount.pricePerUnit,
        newAmount.gstPercent,
        newAmount.tcsPercent,
      );
    });
  };

  const onSaveCustomer = () => {
    setIsAddingCustomer(false);
  };

  const onSavePayment = () => {
    setIsAddingPayment(false);
  };

  const onCancelSaveCustomer = () => {
    setCustomers((prevCustomers) => prevCustomers.slice(0, -1));
    setIsAddingCustomer(false);
  };

  const onCancelSavePayment = () => {
    setPayments((prevPayments) => prevPayments.slice(0, -1));
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
      invoiceId as string,
      customers[customerIndex as number].customerId as string,
    );
    setIsDeletingCustomer(false);
    setCustomerIndex(null);
  };

  const onRemovePaymentConfirm = async () => {
    setIsDeletingPayment(true);
    closePaymentConfirmation();
    await invoicesContext.removePayment(
      invoiceId as string,
      payments[paymentIndex as number].paymentId as string,
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
    setAmounts(
      (prevAmounts) =>
        new Amounts(
          prevAmounts.qty,
          prevAmounts.pricePerUnit,
          prevAmounts.gstPercent,
          tcsPercent,
        ),
    );
  };

  const onSaveInvoice = async () => {
    setIsSaving(true);
    const invoice: Invoice = {
      invoiceId,
      invoiceNumber,
      billToCustomer,
      amounts,
      customers,
      date: invoiceDate,
      isBillToATraveller,
      payments,
      travellingType,
    };

    await invoicesContext.saveInvoice(invoice);
    setIsSaving(false);
    setIsCreatingNewInvoice(false);
  };

  useSaveShortcut(onSaveInvoice, [
    invoicesContext.invoices,
    invoiceId,
    invoiceNumber,
    billToCustomer,
    amounts,
    customers,
    invoiceDate,
    isBillToATraveller,
    payments,
    travellingType,
  ]);

  if (invoicesContext.isLoading) {
    return <InvoiceLoadingSkeleton />;
  }

  return (
    <Box>
      <InvoiceHeading
        isCreatingNewInvoice={isCreatingNewInvoice}
        billToCustomerName={billToCustomer.name}
        travellingType={travellingType}
        setTravellingType={setTravellingType}
        invoiceDate={invoiceDate}
        invoiceNumber={invoice?.invoiceNumber}
      />
      <BillToCustomer
        billToCustomer={billToCustomer}
        isBillToATraveller={isBillToATraveller}
        setIsBillToATraveller={setIsBillToATraveller}
        handleBillToFieldChange={handleBillToFieldChange}
      />
      <CustomersTable
        invoiceId={invoice?.invoiceId}
        customers={customers}
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
        invocieId={invoiceId}
        amounts={amounts}
        handleAmountsFieldChange={handleAmountsFieldChange}
      />
      <PaymentsTable
        invoiceId={invoice?.invoiceId}
        payments={payments}
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
        amounts={amounts}
        payments={payments}
        handleTCSChange={handleTCSChange}
      />
      <InvoiceFooter
        invoiceId={invoice?.invoiceId}
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
