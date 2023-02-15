// import "regenerator-runtime/runtime";
// import { apiLink } from "../firebase/config";
// import ProductService from "../services/ProductService";
// document.addEventListener("DOMContentLoaded", () => {
//   const productService = new ProductService(apiLink, "Token");
//   try {
//     productService.getProductAll().then((data) => {
//       for (const key in data) {
//         const el = data[key];
//         const productList = document.querySelector(".product-list");
//         const template = `
//          <div class="product-item">
//             <div class="product-image">
//                <a href="productDetail.html?id=${key}"><img src="${
//           el.image
//         }" alt=""></a>  
//             </div>
//             <div class="product-content">
//                <a href="productDetail.html?id=${key}" data-id="${key}" class="product-name">${
//           el.productName
//         }</a> 
//                <div class="price-product">
//                   <span class="price">${new Intl.NumberFormat("vi-VN", {
//                     style: "currency",
//                     currency: "VND",
//                   }).format(el.price)}</span>
//                   <p class="quantity-sold">đã bán ${el.quantity}</p>
//                </div>
//                <a href="productDetail.html?id=${key}" class="mua-ngay">Mua Ngay</a>
//             </div>
//          </div>`;
//         productList.insertAdjacentHTML("beforeend", template);
//       }
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });
