import {cart, removeFromCart, updateDeliveryOption, NumberofItems, addToCart, UpdateCart} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

export function renderOrderSummary() {
  updateCheckoutNumber();

  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.Id;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM, D'
    );
    
    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-link js-specific-update-${matchingProduct.id}" data-product-id = "${matchingProduct.id}">
              Update
            </span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
    `;
  });
  

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );
      const dateString = deliveryDate.format(
        'dddd, MMMM, D'
      );
      const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option" data-product-id = "${matchingProduct.id}" data-delivery-option-id = "${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked': ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>
      `
    });

    return html;
  }

  document.querySelector('.js-order-summary')
    .innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productID = link.dataset.productId;
        removeFromCart(productID);

        const container = document.querySelector(
            `.js-cart-item-container-${productID}`
        );
        container.remove();
        updateCheckoutNumber();
        renderPaymentSummary();
      });
    });

    document.querySelectorAll('.js-update-link').forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
    
        // Create a text box and a button for updating the quantity
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.className = 'quantity-input';
        quantityInput.placeholder = 'Enter new quantity';
    
        const updateButton = document.createElement('button');
        updateButton.className = 'update-quantity-button';
        updateButton.textContent = 'Update';
    
        // Find the parent container for the product and update the content
        const productContainer = link.closest('.cart-item-details-grid');
        
        // Find the existing update link and replace it with the quantity input and button
        const existingUpdateLink = productContainer.querySelector('.js-update-link');
        existingUpdateLink.replaceWith(quantityInput, updateButton);
    
        // Add an event listener to the update button
        updateButton.addEventListener('click', () => {
          const newQuantity = parseInt(quantityInput.value, 10);
    
          // Update the quantity in your cart data
          if(newQuantity === 0)
          {
            const productID = link.dataset.productId;
            removeFromCart(productID);
    
            const container = document.querySelector(
                `.js-cart-item-container-${productID}`
            );
            container.remove();
            updateCheckoutNumber();
            renderPaymentSummary();
          }
          UpdateCart(productId,newQuantity);
          // Render the updated order summary and payment summary
          renderOrderSummary();
          renderPaymentSummary();
        });
      });
    });

    document.querySelectorAll('.js-delivery-option')
      .forEach((element) => {
        element.addEventListener('click', () => {
          const {productId, deliveryOptionId} = element.dataset;
          updateDeliveryOption(productId, deliveryOptionId);
          renderOrderSummary();
          renderPaymentSummary();
        });
      });
    function updateCheckoutNumber(){
      const CartSize = NumberofItems();
      document.querySelector('.js-home-link').innerHTML = `${CartSize===null ? '0' : CartSize} items`;
    };
}