import { tracking } from "../data/tracking.js";
import { products } from "../data/products.js";

renderTrackingPage();

function renderTrackingPage() {
  //we will only ever be tracking one item
  let matchingItem;
  let product = tracking;
  
  products.forEach((item) => {
    if(item.id === product.productId)
    {matchingItem = item;}
  });
  let innerHTML = `
  <div class="order-tracking">
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${product.productArrival}
    </div>

    <div class="product-info">
      ${matchingItem.name}
    </div>

    <div class="product-info">
      Quantity: ${product.productQuantity}
    </div>

    <img class="product-image" src="${matchingItem.image}">

    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
  </div>
  `
  document.querySelector('.js-main').innerHTML = innerHTML;
}