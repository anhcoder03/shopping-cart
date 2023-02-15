import "regenerator-runtime/runtime";
import { apiLink } from "../firebase/config";
import UrlHelper from "../helpers/UrlHelper";
import Category from "../models/Category";
import CategoryService from "../services/CategoryService";

document.addEventListener("DOMContentLoaded", () => {
  const categoryService = new CategoryService(apiLink, "Token");
  const updateBtn = document.querySelector(".btn-update");
  const url = location.href;
  const urlHelper = new UrlHelper();

  const id = urlHelper.readParams(url, "id");
  categoryService.deleteCategory(id).then((data) => {
    location.href = "listCategory.html";
  });
});
