import { cart, ClearCart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import {formatCurrency} from "../utils/money.js"
import { MovetoOrders } from "../../data/orders.js";
import { renderOrderSummary } from "./orderSummary.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;
  cart.forEach((cartItem) => {

    const product = getProduct(cartItem.Id);
    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentsummaryHTML = `
  <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (3):</div>
    <div class="payment-summary-money">
      $${formatCurrency(productPriceCents)}
    </div>
  </div>

  <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">
      $${formatCurrency(shippingPriceCents)}
    </div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money"> 
      $${formatCurrency(totalBeforeTaxCents)}
    </div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">
      $${formatCurrency(taxCents)}
    </div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">
      $${formatCurrency(totalCents)}
    </div>
  </div>

  <a href = "orders.html">
    <button class="place-order-button button-primary js-place-order-button">
      Place your order
    </button>
  </a>
  `;
  document.querySelector('.js-payment-summary')
    .innerHTML = paymentsummaryHTML;


  document.querySelector('.js-place-order-button')
    .addEventListener('click', () => {
      const OrderID = generateRandomId(8);
      const totalPriceCents = getTotalPrice();
      cart.forEach((item) => {
        //find the arrival date in Month day format
        const deliveryId = item.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryId);

        const today = dayjs();
        const dateOrderPlaced = today.format('MMMM', 'D');
        const arrivalDate = today.add(
          deliveryOption.deliveryDays, 'days');
        const arrivalString = arrivalDate.format('MMMM', 'D');
        MovetoOrders(item.Id, item.quantity, arrivalString, dateOrderPlaced, OrderID, totalPriceCents);
      });
      ClearCart();
      renderOrderSummary();
      renderPaymentSummary();
    });


    function generateRandomId(length) {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
    
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
    
      return result;
    }


    function getTotalPrice() {
      let productPriceCents = 0;
      let shippingPriceCents = 0;
      cart.forEach((cartItem) => {
    
        const product = getProduct(cartItem.Id);
        productPriceCents += product.priceCents * cartItem.quantity;
    
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        shippingPriceCents += deliveryOption.priceCents;
      });
    
      const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
      const taxCents = totalBeforeTaxCents * 0.1;
      const totalCents = totalBeforeTaxCents + taxCents;
      return totalCents;
    }
}