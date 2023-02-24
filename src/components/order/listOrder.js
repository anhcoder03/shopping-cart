import "regenerator-runtime/runtime";
import { apiLink } from "../../firebase/config";
import OrdersService from "../../services/OrdersService";
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
document.addEventListener("DOMContentLoaded", function () {
  const orderService = new OrdersService(apiLink, "Token");
  try {
    const listOrder = document.querySelector("#listOrder");
    orderService.getOrderAll().then((data) => {
      console.log(data);
      let list = "";
      for (const id in data) {
        const el = data[id];
        list += `
        <tr>
        <td>${el.customer_name}</td>
        <td>${el.email}</td>
        <td>${el.customer_address}</td>
        <td>${el.phone}</td>
        <td>${el.created_date}</td>
        <td>
          <a style="color: blue" href="orderDetail.html?id=${id}"><i class="fa fa-pencil" aria-hidden="true"></i> Xem chi tiết </a>
        </td>
      </tr> 
        `;
      }
      listOrder.insertAdjacentHTML("beforeend", list); // list ra html
    });
  } catch (error) {
    console.log(error);
  }
});
