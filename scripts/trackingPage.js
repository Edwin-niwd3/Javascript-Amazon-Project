import { tracking } from "../data/tracking.js";
import { products } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

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
      <div class="progress-bar" id = "js-progress-bar"></div>
  </div>
  `
  document.querySelector('.js-main').innerHTML = innerHTML;
  let progressBar = document.getElementById('js-progress-bar');
  progressBar.style.width = '20%';

  let today = dayjs();
  let todayFormat = today.format('D');
  let productArrival = dayjs(product.productArrival).format('D');
  const dayorderPlaced = parseInt(dayjs(product.dateOrderPlaced).format('D'));
  let maththingy = productArrival-dayorderPlaced;
  let totalDays
  if(maththingy < 0)//this means we are in the next month
  {
    totalDays = 31+parseInt(maththingy);
  } else{
    totalDays = maththingy;
  }
  
  const daydifference = productArrival-todayFormat;
  if(daydifference < 0)//we are already past the arrival date
  {
    progressBar.style.width = '100%';
  } else
  {
    const progressPercentage = (1-(daydifference/totalDays))*100;
  }
}