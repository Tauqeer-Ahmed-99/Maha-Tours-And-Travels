export class Customer {
  name: string;
  contact: string;
  passport: string;
  pan: string;
  aadhar: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  country: string;
  constructor(
    name?: string,
    contact?: string,
    passport?: string,
    pan?: string,
    aadhar?: string,
    addressLine1?: string,
    addressLine2?: string,
    city?: string,
    country?: string,
  ) {
    this.name = name ?? "";
    this.contact = contact ?? "";
    this.passport = passport ?? "";
    this.pan = pan ?? "";
    this.aadhar = aadhar ?? "";
    this.addressLine1 = addressLine1 ?? "";
    this.addressLine2 = addressLine2 ?? "";
    this.city = city ?? "";
    this.country = country ?? "";
  }
}
