import "regenerator-runtime/runtime";
import { apiLink } from "../firebase/config";
import UrlHelper from "../helpers/UrlHelper";
import ProductService from "../services/ProductService";

document.addEventListener("DOMContentLoaded", () => {
  function sumTotal() {
    const totalCart = document.querySelector(".total-cart");
    const cartList = JSON.parse(localStorage.getItem("addToCart"));
    let total = 0;
    if (cartList > 0) {
      for (let i = 0; i < cartList.length; i++) {
        let quantity = parseInt(cartList[i].quantity);
        total += quantity;
      }
      totalCart.textContent = total;
    }
  }
  sumTotal();
  const productService = new ProductService(apiLink, "Token");

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
  try {
    productService.getProductById(id).then((data) => {
      console.log(data);
      const productMain = document.querySelector(".main-product-detail");
      const template = `
  <div class="product-briefing">
  <div class="product__image">
    <div class="image__shown">
      <img class="image-show" src="${data.image}" alt="">
    </div>
  </div>
  <div class="product__information">
    <div class="product__information-wrapper">
      <div>
        <div class="product__name--title">
          <p class="_name--title">${data.productName}</p>
        </div>
        <div class="product--assess-container">
          <div class="product-assess-wrapper">
            <div class="_product--assess">
              <span class="_assess">4.0</span>
            </div>
            <div class="_product--star">
              <i class="fa-solid fa-star _star"></i>
              <i class="fa-solid fa-star _star"></i>
              <i class="fa-solid fa-star _star"></i>
              <i class="fa-solid fa-star _star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
          </div>
          <div class="_product--quantity-sold">
            <span class="_quantity">${data.quantity}</span>
            <span class="_sold">đã bán</span>
          </div>
        </div>
        <div class="product--price">
          <div class="_product-price-new">
            <p class="price-new"> ${new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(data.price)}</p>
          </div>
        </div>
        <div class="_product--quantity-wrapper">
          <div class="_product--quantity">
            <p class="__quantity">Số lượng</p>
          </div>
          <div class="_product--selected">
            <button class="btn btn-reduce">-</button>
            <input type="text" name="" class="input__product--selected" value="1">
            <button class="btn btn-increase">+</button>
          </div>
        </div>
      </div>
      <div class="_product--cart_buy">
        <a href="cart.html" class="add--cart" data-id="${id}">
          <i class="fa-solid fa-cart-plus"></i>
          <p>Thêm vào giỏ hàng</p>
        </a>
      </div>
      <div class="description">
      <h3>MÔ TẢ</h3>
         <p>${data.description}</p>
      </div>
    </div>
  </div>
</div>`;
      productMain.insertAdjacentHTML("beforeend", template);
      const reduceBtn = document.querySelector(".btn-reduce");
      const increaseBtn = document.querySelector(".btn-increase");
      const inputSelected = document.querySelector(".input__product--selected");

      reduceBtn.addEventListener("click", () => {
        if (inputSelected.value == 1) {
          inputSelected.value = 1;
        } else {
          inputSelected.value = inputSelected.value - 1;
        }
      });
      increaseBtn.addEventListener("click", () => {
        inputSelected.value = Number(inputSelected.value) + 1;
      });

      const addToCart = document.querySelector(".add--cart");
      const idProduct = addToCart.dataset.id;
      addToCart.addEventListener("click", (e) => {
        let carts = localStorage?.getItem("addToCart")
          ? JSON.parse(localStorage.getItem("addToCart"))
          : [];
        const idx = carts.findIndex((product) => {
          return product.id === idProduct;
        });
        const quantity = document.querySelector(".input__product--selected");
        const htmlCv = {
          id: idProduct,
          name: data.productName,
          image: data.image,
          price: data.price,
          quantity: quantity.value,
        };
        if (idx !== -1) {
          carts[idx].quantity = +quantity.value + +carts[idx].quantity;
        } else {
          carts.push(htmlCv);
        }
        localStorage?.setItem("addToCart", JSON.stringify(carts));
        sumTotal();
      });
    });
  } catch (err) {
    console.log(err);
  }
});
