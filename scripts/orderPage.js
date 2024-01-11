import { orders, getOrderByID} from "../data/orders.js";
import { formatCurrency } from "./utils/money.js";
import { getProduct } from "../data/products.js";
import { NumberofItems } from "../data/cart.js";
import { TrackNew } from "../data/tracking.js";


renderOrderPage();

function renderOrderPage() {
  let orderContainerHTML = '';
  let productContainerHTML = '';
  orders.forEach((item) => {
    //For each item we want to create the basic outline first
    orderContainerHTML += `
    <div class="order-container">
            
    <div class="order-header">
      <div class="order-header-left-section">
        <div class="order-date">
          <div class="order-header-label">Order Placed:</div>
          <div>${item.dateOrderPlaced}</div>
        </div>
        <div class="order-total">
          <div class="order-header-label">Total:</div>
          <div>$${formatCurrency(item.priceCents)}</div>
        </div>
      </div>
  
      <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>${item.orderId}</div>
      </div>
    </div>

    <div class="order-details-grid js-products-render-${item.orderId}">
    </div>
  </div>
    `;
});
document.querySelector('.js-order-render')
.innerHTML = orderContainerHTML;
orders.forEach((item) => {
      //this sets up the basic container to insert the product details
      if(item.Products && Array.isArray(item.Products)){
        item.Products.forEach((product) => {
        const productId = product.productId;
        const matchingProduct = getProduct(productId);
        productContainerHTML += `
        <div class="product-image-container">
          <img src="${matchingProduct.image}">
        </div>
    
        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            ${product.productArrival}
          </div>
          <div class="product-quantity">
            Quantity: ${product.productQuantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>
    
        <div class="product-actions">
          <a href = "tracking.html">
            <button class="track-package-button button-secondary js-track-button" data-product-id = "${product.productId}">
              Track package
            </button>
          </a>
        </div>
        `;
      });
      document.querySelector(`.js-products-render-${item.orderId}`)
        .innerHTML = productContainerHTML;
    }
    productContainerHTML = '';
});
  let matchingProduct;
  document.querySelectorAll('.js-track-button')
    .forEach((button) => {
      button.addEventListener('click', () => {
        let productId = button.dataset.productId;
        console.log(productId);
        //we need to know what product to track
        matchingProduct = getOrderByID(productId);
        console.log(matchingProduct);
        TrackNew(matchingProduct);
      });
    });
  const cartquantity = NumberofItems();
  document.querySelector('.js-cart-quantity')
  .innerHTML = cartquantity;
}