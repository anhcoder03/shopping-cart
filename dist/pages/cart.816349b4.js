document.addEventListener("DOMContentLoaded", ()=>{
    const cartProduct = document.getElementById("cart-product");
    const formatPrice = (number)=>{
        return new Intl.NumberFormat().format(number);
    };
    function renderCartProduct() {
        const dbCartJson = localStorage.getItem("addToCart");
        const dbCart = JSON.parse(dbCartJson);
        if (dbCart.length > 0) {
            const html = dbCart.map((e)=>{
                const priceNewNumber = Number(e.price);
                const price = priceNewNumber * e.quantity;
                return `
         <div class="cart-product--item" data-id="${e.id}">
           <div class="product__img-title">
             <div class="__img-title">
               <div class="__img-product">
                 <img src="${e.image}" alt="">
               </div>
               <div class="__img-title">
                 <p>${e.name}</p>
               </div>
             </div>
           </div>
           <div class="product__unit_price">
               <p class="unit-price-new">${formatPrice(e.price)}đ</p>
           </div>
           <div class="product__amount">
             <input type="text" name="" class="input__product--selected" disabled readonly value="${e.quantity}">
           </div>
           <div class="product__amount_money">đ<span>${formatPrice(price)}</span></div>
           <div class="product__manipulation">
             <p class="__manipulation--delete">Xoá</p>
           </div>
         </div>`;
            });
            cartProduct.innerHTML = html.join(" ");
            const priceList = document.querySelectorAll(".product__amount_money span");
            let arr = [];
            [
                ...priceList
            ].forEach((item)=>{
                const textContentPrice = item.textContent;
                const convertToNum = Number(textContentPrice.replaceAll(".", ""));
                arr.push(convertToNum);
            });
            const totalPayment = document.querySelector(".total-payment span");
            const getTotalPrice = ()=>{
                const total = arr.reduce((total, price)=>total + price);
                totalPayment.textContent = formatPrice(total);
                return total;
            };
            getTotalPrice();
        } else {
            const mainCart = document.querySelector("#main-cart");
            const mainCartContent = document.querySelector(".main-cart-content");
            mainCart.removeChild(mainCartContent);
            const template = `
      <div class="no-cart-wrapper">
         <h3 class="no-cart">Không có sản phẩm nào trong giỏ hàng</h3>
         <div class="no-cart-img">
            <img src="https://www.nicepng.com/png/detail/285-2852098_no-cart-items-found-carrito-de-compras-icono.png" alt="" />
         </div>
         <a href="product.html" class="to-page-product">MUA HÀNG</a>
      </div>
      `;
            mainCart.insertAdjacentHTML("beforeend", template);
        }
    }
    if (cartProduct) renderCartProduct();
    const totalCart = document.querySelector(".total-cart");
    const cartList = JSON.parse(localStorage.getItem("addToCart"));
    function sumTotal() {
        let total = 0;
        if (cartList.length >= 0) {
            for(let i = 0; i < cartList.length; i++){
                let quantity = parseInt(cartList[i].quantity);
                total += quantity;
            }
            totalCart.textContent = total;
        }
    }
    sumTotal();
    const deleteBtn = document.querySelectorAll(".__manipulation--delete");
    [
        ...deleteBtn
    ].forEach((item)=>item.addEventListener("click", function(e) {
            const cartItem = e.target.parentNode.parentNode;
            cartItem.parentNode.removeChild(cartItem);
            const cartId = cartItem.dataset.id;
            const dbCartJson = localStorage.getItem("addToCart");
            const dbCart = JSON.parse(dbCartJson);
            const newCarts = dbCart.filter((item)=>item.id !== cartId);
            localStorage.setItem("addToCart", JSON.stringify(newCarts));
            location.href = "cart.html";
        }));
});

//# sourceMappingURL=cart.816349b4.js.map
