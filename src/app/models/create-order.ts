export interface CreateOrder {
  addressId?: string;
  note?: string;
  paymentMethod?: string;
  shipMethod?: string;
  coupon?: string;
  shipPrice?: number;
  total?: number;
}
