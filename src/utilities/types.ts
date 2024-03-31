export enum PaymentMode {
  CASH = "CASH",
  CHEQUE = "CHEQUE",
  NEFT = "NEFT",
  RTGS = "RTGS",
}

export interface ITableRow {
  name: string;
  data: unknown;
}

export interface ITableColumn {
  name: string;
  width?: string;
  renderer?: (data: unknown) => React.ReactNode;
}
