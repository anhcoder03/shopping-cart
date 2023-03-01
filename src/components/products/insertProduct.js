import "regenerator-runtime/runtime";
import { apiLink } from "../../firebase/config";
import Product from "../../models/Product";
import CategoryService from "../../services/CategoryService";
import ProductService from "../../services/ProductService";

document.addEventListener("DOMContentLoaded", () => {
  const productService = new ProductService(apiLink, "Token");
  const categoryService = new CategoryService(apiLink, "Token");
  try {
    categoryService.getCategoryAll().then((data) => {
      for (const key in data) {
        const el = data[key];
        const categoryList = document.querySelector("#categories");
        const template = `<option value="${key}" class="category-item">${el.name}</option>`;
        categoryList.insertAdjacentHTML("beforeend", template);
      }
    });
  } catch (err) {
    console.log(err);
  }

  const postBtn = document.querySelector(".btn-post");
  postBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const categoryId = document.querySelector("#categories").value;
    const productName = document.querySelector("#product_name").value;
    const productId = document.querySelector("#product_id");
    const image = document.querySelector("#image").value;
    const price = document.querySelector("#price").value;
    const description = document.querySelector(".description").value;
    const quantity = document.querySelector("#quantity").value;

    if (
      productName == "" ||
      image == "" ||
      price == "" ||
      description == "" ||
      quantity == ""
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
      categoryId,
      null,
      productName,
      description,
      price,
      image,
      quantity
    );
    try {
      productService.insertProduct(product).then((data) => {
        productId.value = data;
        const template = `
          <div class="sweet-alert">
            <i class="fa fa-check sweet-icon"></i>
            <p class="sweet-text">Thêm mới thành công</p>
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
