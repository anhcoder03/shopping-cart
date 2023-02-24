import "regenerator-runtime/runtime";
import { apiLink } from "../../firebase/config";
import OrderDetailService from "../../services/OrderDetailService";
import OrdersService from "../../services/OrdersService";
import UrlHelper from "../../helpers/UrlHelper";

document.addEventListener("DOMContentLoaded", () => {
  const orderService = new OrdersService(apiLink, "Token");
  const orderDetailsService = new OrderDetailService(apiLink, "Token");

  const url = location.href;
  const urlHelper = new UrlHelper();

  const orderId = urlHelper.readParams(url, "orderId");
  const orderDetailsId = urlHelper.readParams(url, "orderDetailsId");

  const handleDeleteOrder = async () => {
    await orderService.deleteOrder(orderId);
    await orderDetailsService.deleteOrderDetail(orderDetailsId);
    location.href = "listOrder.html";
  };

  handleDeleteOrder();
});
