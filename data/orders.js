export let orders = JSON.parse(localStorage.getItem('orders'));

if(!orders){
  orders = [];
}

export let cart = JSON.parse(localStorage.getItem('cart'));

export function MovetoOrders(productId, productQuantity, deliveryOption) {
  orders.push({
    id: productId,
    quantity: productQuantity,
    deliveryOptionId: deliveryOption
  });
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}