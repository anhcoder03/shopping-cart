document.addEventListener("DOMContentLoaded", () => {
  function sumTotal() {
    const totalCart = document.querySelector(".total-cart");
    const cartList = JSON.parse(localStorage.getItem("addToCart"));
    let total = 0;
    if (cartList.length > 0) {
      for (let i = 0; i < cartList.length; i++) {
        let quantity = parseInt(cartList[i].quantity);
        total += quantity;
      }
      totalCart.textContent = total;
    }
  }
  sumTotal();
});
