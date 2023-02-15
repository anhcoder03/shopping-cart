import "regenerator-runtime/runtime";
import { apiLink } from "../firebase/config";
import ProductService from "../services/ProductService";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("#header");
  const headerTop = document.querySelector(".header-top");
  const main = document.querySelector("#main");
  const ratio = 20;
  window.addEventListener("scroll", () => {
    if (window.scrollY > header.clientHeight - ratio) {
      headerTop.style = "display : none";
      header.classList.add("fixed");
      main.style = `margin-top: ${header.clientHeight}px`;
    } else {
      headerTop.style = "display : flex";
      header.classList.remove("fixed");
      main.style = "margin-top: 0";
    }
  });
  const totalCart = document.querySelector(".total-cart");
  const cartList = JSON.parse(localStorage.getItem("addToCart"));
  let total = 0;
  if (cartList > 0) {
    for (let i = 0; i < cartList.length; i++) {
      let quantity = parseInt(cartList[i].quantity);
      total += quantity;
    }
  }
  totalCart.textContent = total;
  const productService = new ProductService(apiLink, "Token");
  try {
    productService.getProductAll().then((data) => {
      for (const key in data) {
        const el = data[key];
        const productList = document.querySelector(".product-list");
        const template = `
         <div class="product-item">
            <div class="product-image">
               <a href="productDetail.html?id=${key}"><img src="${
          el.image
        }" alt=""></a>  
            </div>
            <div class="product-content">
               <a href="productDetail.html?id=${key}" data-id="${key}" class="product-name">${
          el.productName
        }</a> 
               <div class="price-product">
                  <span class="price">${new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(el.price)}</span>
                  <p class="quantity-sold">đã bán ${el.quantity}</p>
               </div>
               <a href="productDetail.html?id=${key}" class="mua-ngay">Mua Ngay</a>
            </div>
         </div>`;
        productList.insertAdjacentHTML("beforeend", template);
      }
    });
  } catch (err) {
    console.log(err);
  }
});
