export const getCustomerFieldLabel = (
  field: string,
  isBillToCustomer = false,
) => {
  switch (field) {
    case "name":
      return isBillToCustomer ? "Bill To" : "Customer Name";
    case "contact":
      return "Contact";
    case "passport":
      return "Passport Number";
    case "pan":
      return "PAN Number";
    case "aadhar":
      return "Aadhar Number";
    case "addressLine1":
      return "Address Line 1";
    case "addressLine2":
      return "Address Line 2";
    case "state":
      return "State";
    case "city":
      return "City";
    case "country":
      return "Country";
    default:
      return field;
  }
};

export const getDashboardCardLabel = (field: string) => {
  switch (field) {
    case "hajjInvoices":
      return "Hajj Applications";
    case "hajjNetAmount":
      return "Hajj Total Amount";
    case "hajjReceivedAmount":
      return "Hajj Received Amount";
    case "umrahInvoices":
      return "Umrah Applications";
    case "umrahNetAmount":
      return "Umrah Total Amount";
    case "umrahReceivedAmount":
      return "Umrah Received Amount";
    case "otherInvoices":
      return "Other Applications";
    case "otherNetAmount":
      return "Other Total Amount";
    case "otherReceivedAmount":
      return "Other Received Amount";
    default:
      return field;
  }
};
