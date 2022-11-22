export interface OrderDetail {
  nameOfRecipient?: string;
  phoneNumber?: string;
  note?: string;

  shipAddress?: string;
  orderCode?: string;
  createDate?: string;
  totalPrice?: string;
  shipPrice?: string;
  paymentMethod?: string;
  payed?: boolean;
  statusOrder?: string;
  status?: string;
  totalDiscount?: string;
}
