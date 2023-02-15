import "regenerator-runtime/runtime";
import { apiLink } from "../../firebase/config";
import ProductService from "../../services/ProductService";

document.addEventListener("DOMContentLoaded", () => {
  const productService = new ProductService(apiLink, "Token");
  try {
    productService.getProductAll().then((data) => {
      for (const key in data) {
        const el = data[key];
        const productList = document.querySelector(".product-list");
        const template = `
         <tr>
            <td>${key}</td>
            <td>${el.productName}</td>
            <td><img src="${el.image}" width="80" alt=""></td>
            <td>${el.price} đ</td>
            <td>${el.description}</td>
            <td class="text-end">
               <a href="editProduct.html?id=${key}" class="btn btn-outline-info btn-rounded"><i class="fas fa-pen"></i></a>
               <a href="deleteProduct.html?id=${key}" class="btn btn-outline-danger btn-rounded" onclick="return confirm(' Bạn có Muốn Xóa Không')">
                  <i class="fas fa-trash"></i></a>
            </td>
         </tr>`;
        productList.insertAdjacentHTML("beforeend", template);
      }
    });
  } catch (err) {
    console.log(err);
  }
});
