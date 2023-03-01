import "regenerator-runtime/runtime";
import OrderDetailService from "../../services/OrderDetailService";
import { apiLink } from "../../firebase/config";

document.addEventListener("DOMContentLoaded", () => {
  const formatPrice = (number) => {
    return new Intl.NumberFormat().format(number);
  };
  const orderDetailService = new OrderDetailService(apiLink, "Token");

  try {
    orderDetailService.getOrderDetailAll().then((data) => {
      console.log(data);
      let arrQuantity = [];
      let arrUnitPrice = [];
      for (const key in data) {
        const el = data[key];
        const convertToNum = Number(el.quantity);
        const convertPriceToNum = Number(el.unit_price.replaceAll(",", ""));

        arrQuantity.push(convertToNum);
        arrUnitPrice.push(convertPriceToNum);
      }
      function getTotalUnitPrice() {
        const totalUnitPrice = arrUnitPrice.reduce(
          (totalUnitPrice, unitPrice) => totalUnitPrice + unitPrice
        );
        const convertUnitPriceToStr = formatPrice(totalUnitPrice);
        console.log(convertUnitPriceToStr);
        const resultUnitPrice = document.querySelector(".totalUnitPrice");
        resultUnitPrice.textContent = convertUnitPriceToStr;
        return totalUnitPrice;
      }
      getTotalUnitPrice();
      function getTotalQuantity() {
        const totalQuantity = arrQuantity.reduce(
          (totalQuantity, quantity) => totalQuantity + quantity
        );
        const resultQuantity = document.querySelector(".totalQuantity");
        resultQuantity.textContent = totalQuantity;
        return totalQuantity;
      }
      console.log(getTotalQuantity());
    });
  } catch (err) {
    console.log(arr);
  }
});
