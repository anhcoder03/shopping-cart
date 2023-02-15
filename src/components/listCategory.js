import "regenerator-runtime/runtime";
import { apiLink } from "../firebase/config";
import CategoryService from "../services/CategoryService";

document.addEventListener("DOMContentLoaded", () => {
  const categoryService = new CategoryService(apiLink, "Token");
  try {
    categoryService.getCategoryAll().then((data) => {
      for (const key in data) {
        const el = data[key];
        const categoryList = document.querySelector(".category-list");
        const categoryListAdmin = document.querySelector(
          ".category-list_admin"
        );
        if (categoryList) {
          const template = `
          <div class="category-item" data-cateId=${key} >
            <a href="productCategory.html?id=${key}" class="category-link">${el.name}</a>
          </div>`;
          categoryList.insertAdjacentHTML("beforeend", template);
        } else {
          const template = `
          <tr>
          <td>${key}</td>
          <td>${el.name}</td>
          <td class="text-end">
              <a href="editCategory.html?id=${key}" class="btn btn-outline-info btn-rounded"><i
                      class="fas fa-pen"></i></a>
              <a href="deleteCategory.html?id=${key}" class="btn btn-outline-danger btn-rounded"
                  onclick="return confirm('Bạn có muốn xóa không?')"><i
                      class="fas fa-trash"></i></a>
          </td>
      </tr>`;
          categoryListAdmin.insertAdjacentHTML("beforeend", template);
        }
      }
    });
  } catch (err) {
    console.log(err);
  }
});
