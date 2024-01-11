export let orders = JSON.parse(localStorage.getItem('orders'));

if(!orders){
  orders = [{
    orderId: '123109284',
    priceCents: 5000,
    dateOrderPlaced: "January 12",
    Products: [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      productQuantity: 1,
      productArrival: "January 15"
    }]
  }];
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}



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
    matchingItem.Products.push({
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

export function getOrderByID(productId){
  let matchingProduct;
  orders.forEach((order) => {
    order.Products.forEach((product) => {
      if(product.productId === productId)
      {
        matchingProduct = product;
        matchingProduct.dateOrderPlaced = order.dateOrderPlaced;
      }
    });
  });
  return matchingProduct;
}