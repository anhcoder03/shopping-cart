export default class OrderDetail {
  constructor(id, orderId, productId, quantity, unit_price) {
    this.id = id;
    this.orderId = orderId
    this.productId = productId;
    this.quantity = quantity;
    this.unit_price = unit_price;
  }
}