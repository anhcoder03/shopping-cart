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
  const categoryId = document.querySelector(".input-cateId");
  const categoryName = document.querySelector(".input-name");

  categoryService.getCategoryById(id).then((data) => {
    const { name } = data;
    categoryId.value = id;
    categoryName.value = name;
  });

  updateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (categoryName.value == "") {
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
    const cate = new Category(null, categoryName.value);
    try {
      categoryService.updateCategory(categoryId.value, cate).then((data) => {
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
          }, 1000);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
});
