export const cart = [];


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
