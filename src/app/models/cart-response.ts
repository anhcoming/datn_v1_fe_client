export interface CartResponse {
  cartId?: string;
  productId?: string;
  productOptionId?: string;
  productName?: string;
  sizeName?: string;
  colorName?: string;
  quantity?: number;
  quantityAvailable?: number;
  price?: string;
  image?: string;
  subtotal?: string;
  categoryId?: string;
  discount?: string;
}
