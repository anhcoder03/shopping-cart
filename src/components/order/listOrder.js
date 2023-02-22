import "regenerator-runtime/runtime";
import { apiLink } from "../../firebase/config";
import OrderDetailService from "../../services/OrderDetailService";
function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
document.addEventListener("DOMContentLoaded", function () {
  const orderDetailService = new OrderDetailService(apiLink, "Token");
  try {
    const listOrder = document.querySelector("#listOrder");
    orderDetailService.getOrderDetailAll().then((data) => {
      console.log(data);
      let list = "";
      for (const id in data) {
        const el = data[id];
        list += `
                        <tr class="text-center">
                            <td scope="row">${id}</td>
                            <td>
                                <a class="btn btn-primary" href="listInfoUser.html?id=${
                                  el.orderId
                                }">Khách Hàng</a>
                            </td>   
                            <td>
                                <a class="btn btn-success" href="listIdProduct.html?id=${
                                  el.productId
                                }">Sản Phẩm</a>
                            </td>
                            <td>${el.quantity}</td>
                            <td>${formatNumber(el.unit_price)}</td>
                        </tr>  
        `;
      }
      listOrder.insertAdjacentHTML("beforeend", list); // list ra html
    });
  } catch (error) {
    console.log(error);
  }
});
