import { apiLink } from "../../firebase/config";
import OrdersService from "../../services/OrdersService";
import UrlHelper from "../../helpers/UrlHelper";

document.addEventListener("DOMContentLoaded", function () {
  const orderService = new OrdersService(apiLink, "Token");
  const url = location.href;
  const urlHelper = new UrlHelper();
  const id = urlHelper.readParams(url, "id");
  try {
    const listIdOrder = document.querySelector("#listIdOrder");
    orderService.getOrderById(id).then((data) => {
      console.log(data);
      let list = "";
      list += `
                        <tr class="text-center">
                            <td scope="row">${id}</td>
                            <td>${data.customer_name}</td>   
                            <td>${data.email}</td>
                            <td>${data.customer_address}</td>
                            <td>${data.phone}</td>
                            <td>${data.status}</td>
                        </tr>  
        `;
      listIdOrder.insertAdjacentHTML("beforeend", list); // list ra html
    });
  } catch (error) {
    console.log(error);
  }
});
