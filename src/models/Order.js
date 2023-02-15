export default class Orders {
  constructor(
    orderId,
    created_date,
    customer_address,
    customer_name,
    phone,
    email,
    status
  ) {
    this.orderId = orderId;
    this.created_date = created_date;
    this.customer_address = customer_address;
    (this.customer_name = customer_name), (this.phone = phone);
    this.email = email;
    this.status = status;
  }
}
