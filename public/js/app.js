// import axios from "axios";

const addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector("#cartCounter");

function updateCart(book) {
  axios.post("/update-cart", book).then((res) => {
    cartCounter.innerText = res.data.totalQty;
  });
}

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let book = JSON.parse(btn.dataset.book);
    updateCart(book);
    // console.log(book);
  });
});
