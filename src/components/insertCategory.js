import "regenerator-runtime/runtime";
import { apiLink } from "../firebase/config";
import Category from "../models/Category";
import CategoryService from "../services/CategoryService";

document.addEventListener("DOMContentLoaded", () => {
  const postBtn = document.querySelector(".btn-post");
  postBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const categoryId = document.querySelector(".input-cateId");
    const categoryName = document.querySelector(".input-name");
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
    const categoryService = new CategoryService(apiLink, "Token");
    try {
      categoryService.insertCategory(cate).then((data) => {
        categoryId.value = data;
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
          }, 1000);
        }
      });
    } catch (err) {
      console.log(err);
    }
  });
});
