export default class OrderDetail {
  constructor(orderId, productId, quantity, unit_price) {
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
    this.unit_price = unit_price;
  }
}