export default class Product {
  constructor(
    categoryId,
    productId,
    productName,
    description,
    price,
    image,
    quantity
  ) {
    this.categoryId = categoryId;
    this.productId = productId;
    this.productName = productName;
    this.description = description;
    this.price = price;
    this.image = image;
    this.quantity = quantity;
  }
}
