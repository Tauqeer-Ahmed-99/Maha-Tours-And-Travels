import React, { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import CustomersTable from "@src/components/CustomersTable";
import { Amounts, Customer, Payment } from "@src/utilities/models";
import { useParams } from "react-router-dom";
import PaymentsTable from "@src/components/PaymentsTable";
import { GroupMenuEvent } from "@src/components/Menu";
import AmountTable from "@src/components/AmountTable";
import AmountsSummary from "@src/components/AmountsSummary";
import InvoiceDialog from "@src/components/InvoiceDialog";
import BillToCustomer from "@src/components/BillToCustomer";
import InvoiceHeading from "@src/components/InvoiceHeading";
import InvoiceFooter from "@src/components/InvoiceFooter";

const InvoiceDetailsScreen = () => {
  const { invoiceId } = useParams();

  const [travellingType, setTravellingType] = useState<
    "hajj" | "umrah" | "other"
  >("umrah");

  const [billToCustomer, setBillToCustomer] = useState(new Customer());
  const [isBillToATraveller, setIsBillToATraveller] = useState(true);

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
      5
    )
  );
  const [isEditingAmounts, setIsEditingAmounts] = useState(false);

  useEffect(() => {
    setAmounts(
      (amounts) =>
        new Amounts(
          isBillToATraveller ? customers.length + 1 : customers.length,
          amounts.pricePerUnit,
          amounts.gstPercent,
          amounts.tcsPercent
        )
    );
  }, [isBillToATraveller, customers]);

  const isCreatingNewInvoice = invoiceId === "new";

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
    index: number
  ) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer, i) =>
        i === index
          ? {
              ...customer,
              [e.target.name]: e.target.value,
            }
          : customer
      )
    );
  };

  const handlePaymentFieldChange = (
    e: React.ChangeEvent<HTMLInputElement> | GroupMenuEvent,
    index: number
  ) => {
    setPayments((prevPayments) =>
      prevPayments.map((payment, i) => {
        const newPay = {
          ...payment,
          [e.target.name]: isNaN(
            Number((e as React.ChangeEvent<HTMLInputElement>).target.value)
          )
            ? (e as React.ChangeEvent<HTMLInputElement>).target.value
            : Number((e as React.ChangeEvent<HTMLInputElement>).target.value),
        };

        return i === index
          ? new Payment(newPay.paymentNumber, newPay.mode, newPay.amount)
          : payment;
      })
    );
  };

  const handleAmountsFieldChange = (
    e: React.ChangeEvent<HTMLInputElement> | GroupMenuEvent
  ) => {
    setAmounts((prevAmounts) => {
      const newAmount = {
        ...prevAmounts,
        [e.target.name]: isNaN(
          Number((e as React.ChangeEvent<HTMLInputElement>).target.value)
        )
          ? (e as React.ChangeEvent<HTMLInputElement>).target.value
          : Number((e as React.ChangeEvent<HTMLInputElement>).target.value),
      };

      return new Amounts(
        newAmount.qty,
        newAmount.pricePerUnit,
        newAmount.gstPercent,
        newAmount.tcsPercent
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

  const onRemoveCustomerConfirm = () => {
    setCustomers((prevCustomers) =>
      prevCustomers.filter((_, index) => index !== customerIndex)
    );
    setCustomerIndex(null);
    closeConfirmation();
  };

  const onRemovePaymentConfirm = () => {
    setPayments((prevPayments) =>
      prevPayments.filter((_, index) => index !== paymentIndex)
    );
    setPaymentIndex(null);
    closePaymentConfirmation();
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
          tcsPercent
        )
    );
  };

  const onSaveInvoice = () => {
    console.log(billToCustomer, customers, payments);
  };

  return (
    <Box>
      <InvoiceHeading
        isCreatingNewInvoice={isCreatingNewInvoice}
        travellingType={travellingType}
        setTravellingType={setTravellingType}
      />
      <BillToCustomer
        billToCustomer={billToCustomer}
        isBillToATraveller={isBillToATraveller}
        setIsBillToATraveller={setIsBillToATraveller}
        handleBillToFieldChange={handleBillToFieldChange}
      />
      <CustomersTable
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
        amounts={amounts}
        isEditingAmounts={isEditingAmounts}
        setIsEditingAmounts={setIsEditingAmounts}
        handleAmountsFieldChange={handleAmountsFieldChange}
      />
      <PaymentsTable
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
      <InvoiceFooter onSaveInvoice={onSaveInvoice} />
      <InvoiceDialog
        isConfirmationOpen={isConfirmationOpen}
        isPaymentConfirmationOpen={isPaymentConfirmationOpen}
        onRemoveCustomerCancel={onRemoveCustomerCancel}
        onRemoveCustomerConfirm={onRemoveCustomerConfirm}
        onRemovePaymentCancel={onRemovePaymentCancel}
        onRemovePaymentConfirm={onRemovePaymentConfirm}
      />
    </Box>
  );
};

export default InvoiceDetailsScreen;
