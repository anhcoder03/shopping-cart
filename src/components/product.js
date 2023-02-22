import "regenerator-runtime/runtime";
import { apiLink } from "../firebase/config";
import UrlHelper from "../helpers/UrlHelper";
import CategoryService from "../services/CategoryService";
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
  if (cartList && cartList.length > 0) {
    for (let i = 0; i < cartList.length; i++) {
      let quantity = parseInt(cartList[i].quantity);
      total += quantity;
    }
  }
  totalCart.textContent = total;
  const url = location.href;
  const urlHelper = new UrlHelper();
  const cateId = urlHelper.readParams(url, "cateid");
  const priceFromUrl = urlHelper.readParams(url, "price");
  const btnSearchPrice = document.querySelector(".searchWithPice");
  btnSearchPrice.addEventListener("click", () => {
    const searchControl = document.querySelector(".search-price-control").value;
    location.href = `product.html?price=${searchControl}`;
  });
  const categoryService = new CategoryService(apiLink, "Token");
  try {
    categoryService.getCategoryAll().then((data) => {
      for (const key in data) {
        const el = data[key];
        const categoryList = document.querySelector(".category-list");
        const template = `
          <div class="category-item">
            <a href="product.html?cateid=${key}" class="category-link ${
          key === cateId ? "category__active" : ""
        }">${el.name}</a>
          </div>`;
        categoryList.insertAdjacentHTML("beforeend", template);
      }
    });
  } catch (err) {
    console.log(err);
  }
  const productService = new ProductService(apiLink, "Token");
  try {
    productService.getProductAll().then((data) => {
      for (const key in data) {
        const el = data[key];
        const productList = document.querySelector(".product-list");
        if (el.categoryId === cateId) {
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
        } else if (Number(el.price) <= Number(priceFromUrl)) {
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
        } else if (!cateId && !priceFromUrl) {
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
      }
    });
  } catch (err) {
    console.log(err);
  }
});
