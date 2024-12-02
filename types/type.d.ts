export interface IUsePrice {
  bzn: string // default: 'DE-LU'
  start: number // default timestamp today 00:00:00
  end: number // default timestamp today 23:59:59
}

export interface IPriceData {
  license_info: string;
  unix_seconds: number[];
  price: number[];
  unit: string;
  deprecated: boolean;
}
