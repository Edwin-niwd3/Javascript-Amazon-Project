export let cart = [{
  Id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2
}, {
  Id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1
}];


export function addToCart(productId){
  let matchingItem;

  cart.forEach((cartitem) => {
    if(productId === cartitem.Id){
      matchingItem = cartitem;
    }
  });

  if(matchingItem) {
    matchingItem.quantity += 1;
  }
  else{        
    cart.push({
      Id: productId,
      quantity: 1
    });
  }
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
}