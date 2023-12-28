export let orders = JSON.parse(localStorage.getItem('orders'));

if(!orders){
  orders = [];
}

/* Basic Idea of the orders array

orders = [{
  orderId: 
  priceCents:
  dateOrderPlaced:
  Products: [{
    productId: 
    productQuantity:
    ProductArrival:
  }]
}]

*/

export let cart = JSON.parse(localStorage.getItem('cart'));

export function MovetoOrders(productId, productQuantity, arrivalDate, dateorderPlaced, orderId, priceCents) {
  let matchingItem;
  orders.forEach((orderItem) => {
    
    if(orderItem.orderId === orderId)
    {//we find a matching item
      matchingItem = orderItem;
    }
  });
  if(matchingItem)
  {//there already exists an order with the same orderId
    matchingItem.products.push({
      productId: productId,
      productQuantity: productQuantity,
      productArrival: arrivalDate
      //no need to push the arrival date or orderId since we already have them (by finding this matching product)
    });
  }
  else{//no matching product was found
    orders.push({
      orderId: orderId,
      priceCents: priceCents,
      dateOrderPlaced: dateorderPlaced,
      Products: [{
        productId: productId,
        productQuantity: productQuantity,
        productArrival: arrivalDate
      }]
    });
  }
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}