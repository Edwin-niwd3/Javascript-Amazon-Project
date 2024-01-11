export let tracking = JSON.parse(localStorage.getItem('tracking'));

if(!tracking)
{
  tracking = {
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  productQuantity: 1,
  productArrival: "January 15"
};
}

export function TrackNew(product){
clearTracking();
tracking = product;
console.log(tracking);
saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('tracking', JSON.stringify(tracking));
}

function clearTracking(){
  tracking = {};
  console.log(tracking);
  saveToStorage();
}