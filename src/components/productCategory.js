import "regenerator-runtime/runtime";
import axios from "axios";
import UrlHelper from "../helpers/UrlHelper";

document.addEventListener("DOMContentLoaded", () => {
  const url = location.href;
  const urlHelper = new UrlHelper();

  const cateId = urlHelper.readParams(url, "id");
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
  let api = `https://shopping-2840b-default-rtdb.firebaseio.com/products.json?orderBy="categoryId"&equalTo="${cateId}"`;
  totalCart.textContent = total;
  //   const productService = new ProductService(api, "Token");
  const getProductByCategory = async () => {
    const res = await axios.get(api);
    return res.data;
  };
  try {
    getProductByCategory().then((data) => {
      console.log(data);
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
        const categoryItems = document.querySelectorAll(".category-item");
        [...categoryItems].forEach((item) => {
          if (item.dataset.cateid === cateId) {
            const productHeading = document.querySelector(".product-heading");
            productHeading.textContent = item.textContent;
          }
          //  item.addEventListener("click", (e) => {
          //  });
        });
        productList.insertAdjacentHTML("beforeend", template);
      }
    });
  } catch (err) {
    console.log(err);
  }
});
