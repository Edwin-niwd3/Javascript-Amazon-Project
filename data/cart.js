export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart)
{cart = [{
  Id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,
  deliveryOptionId: '1'
}, {
  Id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1,
  deliveryOptionId: '2'
}];
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, selectedAmount){
  let matchingItem;

  cart.forEach((cartitem) => {
    if(productId === cartitem.Id){
      matchingItem = cartitem;
    }
  });

  if(matchingItem) {
    matchingItem.quantity += selectedAmount;
  }
  else{        
    cart.push({
      Id: productId,
      quantity: selectedAmount,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

export function removeFromCart(productID){
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.Id != productID)
    {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartitem) => {
    if(productId === cartitem.Id){
      matchingItem = cartitem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function NumberofItems() {
  let CartSize = 0;
  cart.forEach((item) => {
    CartSize+=item.quantity;
  })
  return CartSize;
}

export function UpdateCart(productId, newAmount){
  let matchingItem;

  cart.forEach((cartitem) => {
    if(productId === cartitem.Id){
      matchingItem = cartitem;
    }
  });

  if(matchingItem) {
    matchingItem.quantity = newAmount;
  }
  saveToStorage();
}

export function ClearCart() {
  cart.splice(0, cart.length)
  saveToStorage();
}