import "regenerator-runtime/runtime";
import { apiLink } from "../../firebase/config";
import UrlHelper from "../../helpers/UrlHelper";
import Product from "../../models/Product";
import CategoryService from "../../services/CategoryService";
import ProductService from "../../services/ProductService";

document.addEventListener("DOMContentLoaded", () => {
  const productService = new ProductService(apiLink, "Token");
  const categoryService = new CategoryService(apiLink, "Token");

  const updateBtn = document.querySelector(".btn_update");
  const url = location.href;
  const urlHelper = new UrlHelper();

  const id = urlHelper.readParams(url, "id");
  const productName = document.querySelector("#product_name");
  const productId = document.querySelector("#product_id");
  const image = document.querySelector("#image");
  const price = document.querySelector("#price");
  const description = document.querySelector(".description");
  const quantity = document.querySelector("#quantity");
  const categoryList = document.querySelector("#categories");
  let categoryId = categoryList;
  productService.getProductById(id).then((data) => {
    console.log(data);
    productId.value = id;
    productName.value = data.productName;
    image.value = data.image;
    price.value = data.price;
    description.value = data.description;
    quantity.value = data.quantity;
    categoryId = data.categoryId;
    categoryService.getCategoryAll().then((data) => {
      for (const key in data) {
        const el = data[key];
        const template = `<option value="${key}" ${
          categoryId === key ? "selected" : ""
        }  class="category-item">${el.name}</option>`;
        categoryList.insertAdjacentHTML("beforeend", template);
      }
    });
  });

  updateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      productName.value == "" ||
      image.value == "" ||
      price.value == "" ||
      description.value == "" ||
      quantity.value == ""
    ) {
      const template = `
          <div class="sweet-alert error">
            <i class="fas fa-exclamation-circle sweet-icon error"></i>
            <p class="sweet-text error">Vui lòng điền đầy đủ thông tin</p>
          </div>`;
      document.body.insertAdjacentHTML("beforeend", template);
      const sweetItem = document.querySelector(".sweet-alert");
      if (sweetItem) {
        setTimeout(function () {
          sweetItem.parentElement.removeChild(sweetItem);
        }, 1000);
      }
      return;
    }
    const product = new Product(
      categoryList.value,
      null,
      productName.value,
      description.value,
      price.value,
      image.value,
      quantity.value
    );
    try {
      productService.updateProduct(productId.value, product).then((data) => {
        const template = `
          <div class="sweet-alert">
            <i class="fa fa-check sweet-icon"></i>
            <p class="sweet-text">Sửa thành công</p>
          </div>`;
        document.body.insertAdjacentHTML("beforeend", template);
        const sweetItem = document.querySelector(".sweet-alert");
        if (sweetItem) {
          setTimeout(function () {
            sweetItem.parentElement.removeChild(sweetItem);
            location.href = "listProduct.html";
          }, 1000);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
});
