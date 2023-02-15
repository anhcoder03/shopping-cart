import "regenerator-runtime/runtime";
import { apiLink } from "../../firebase/config";
import UrlHelper from "../../helpers/UrlHelper";
import ProductService from "../../services/ProductService";

document.addEventListener("DOMContentLoaded", () => {
  const productService = new ProductService(apiLink, "Token");
  const url = location.href;
  const urlHelper = new UrlHelper();

  const id = urlHelper.readParams(url, "id");
  productService.deleteProduct(id).then((data) => {
    location.href = "listProduct.html";
  });
});
