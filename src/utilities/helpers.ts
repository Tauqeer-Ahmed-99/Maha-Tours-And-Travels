export const getCustomerFieldLabel = (
  field: string,
  isBillToCustomer = false
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
    case "city":
      return "City";
    case "country":
      return "Country";
    default:
      return field;
  }
};
