import "regenerator-runtime/runtime";
import { apiLink } from "../../firebase/config";
import OrderDetailService from "../../services/OrderDetailService";
import UrlHelper from "../../helpers/UrlHelper";
import ProductService from "../../services/ProductService";

document.addEventListener("DOMContentLoaded", function () {
  const url = location.href;
  const urlHelper = new UrlHelper();
  const id = urlHelper.readParams(url, "id");
  const productService = new ProductService(apiLink, "Token");
  const orderDetailService = new OrderDetailService(apiLink, "Token");
  try {
    const listIdOrder = document.querySelector("#listIdOrder");
    orderDetailService.getOrderDetailAll().then((data) => {
      console.log(data);
      for (const key in data) {
        const el = data[key];
        if (el.orderId === id) {
          let list = "";
          list += `
      <tr>
      <td>
        <ul>
          <li style="list-style:none;">Xem sản phẩm: <a href="../../pages/productDetail.html?id=${el.productId}">${el.productId}</a></li> 
        </ul>
      </td>
      <td>${el.quantity}</td>
      <td>${el.unit_price} VNĐ</td>
      <td>
        <a style="color: red" href="deleteOrder.html?orderId=${el.orderId}&orderDetailsId=${key}" onclick="return confirm('Bạn có muốn xóa đơn hàng này không?')"><i class="fa fa-pencil" aria-hidden="true"></i> Xóa đơn hàng </a>
      </td>
    </tr>
        `;
          listIdOrder.insertAdjacentHTML("beforeend", list); // list ra html
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
});
