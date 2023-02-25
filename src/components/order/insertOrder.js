import "regenerator-runtime/runtime";
import { apiLink } from "../../firebase/config";
import Orders from "../../models/Order";
import OrderDetail from "../../models/OrderDetail";
import OrderDetailService from "../../services/OrderDetailService";
import OrdersService from "../../services/OrdersService";

document.addEventListener("DOMContentLoaded", () => {
  const totalCart = document.querySelector(".total-cart");
  const cartList = JSON.parse(localStorage.getItem("addToCart"));
  let total = 0;
  if (cartList && cartList.length > 0) {
    for (let i = 0; i < cartList.length; i++) {
      let quantity = parseInt(cartList[i].quantity);
      total += quantity;
    }
  }
  totalCart.textContent = total;
  const ordersService = new OrdersService(apiLink, "Token");
  const orderDetailService = new OrderDetailService(apiLink, "Token");
  const cartItems = JSON.parse(localStorage.getItem("addToCart"));
  const listCart = document.querySelector(".listCart");
  let list = "";
  let totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice = totalPrice + item.price * item.quantity;
  });
  console.log(totalPrice);
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  for (let el of cartItems) {
    list += `
    <div class="cart-item">
      <a class="d-block flex-shrink-0 mr-2" href="#"
        ><img
          class="rounded-1"
          src="${el.image}"
          width="50"
          alt=""
      /></a>
      <div class="ps-1">
        <h6 class="widget-product-title">
          <a href="#">${el.name}</a>
        </h6>
        <div
          class="cart-item-content"
        >
          <span class="text-accent border-end pr-2 mr-2"
            >${formatNumber(el.price * el.quantity)}</span
          ><span class="text-end">SL: ${el.quantity}</span>
        </div>
      </div>
    </div>
  `;
  }
  const priceAll = document.querySelector("#totalPrice");
  priceAll.textContent = `Tổng Tiền : ${formatNumber(totalPrice)}`;
  listCart.insertAdjacentHTML("beforeend", list);
  const postBtn = document.querySelector("#addOrder");
  postBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const idOrder = document.querySelector("#idOrder");
    const name = document.querySelector("#name").value;
    const phone = document.querySelector("#phone").value;
    const email = document.querySelector("#email").value;
    const address = document.querySelector("#address").value;
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${day}/${month}/${year}`;

    const orders = new Orders(
      null,
      currentDate,
      address,
      name,
      phone,
      email,
      "Pendding"
    );

    if (name == "" || phone == "" || email == "" || address == "") {
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
    } else {
      try {
        ordersService.insertOrder(orders).then((data) => {
          idOrder.value = data;
          for (const product of cartItems) {
            const price = formatNumber(product.price * product.quantity);
            const orderDetail = new OrderDetail(
              null,
              data,
              product.id,
              product.quantity,
              price
            );
            orderDetailService.insertOrderDetail(orderDetail).then((data) => {
              console.log(data);
            });
          }
          const template = `
          <div class="sweet-alert">
            <i class="fa fa-check sweet-icon"></i>
            <p class="sweet-text">Đặt hàng thành công</p>
          </div>`;
          document.body.insertAdjacentHTML("beforeend", template);
          const sweetItem = document.querySelector(".sweet-alert");
          if (sweetItem) {
            setTimeout(function () {
              sweetItem.parentElement.removeChild(sweetItem);
              location.href = "./thank.html";
              localStorage.clear();
            }, 1000);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
});
