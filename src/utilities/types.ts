import { AxiosResponse } from "axios";

export enum PaymentMode {
  CASH = "CASH",
  CHEQUE = "CHEQUE",
  NEFT = "NEFT",
  RTGS = "RTGS",
}

export enum TravellingType {
  HAJJ = "Hajj",
  UMRAH = "Umrah",
  OTHERS = "Other",
}

export enum ResponseStatus {
  SUCCESS = "success",
  ERROR = "error",
}

export enum PaymentType {
  PAYMENT = "payments",
  RETURN_PAYMENT = "returnPayments",
}

export interface IResponse {
  status: ResponseStatus;
  response: AxiosResponse;
}
