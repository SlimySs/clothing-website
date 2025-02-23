let cart = [];

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  window.scrollTo({
    top: section.offsetTop - 50, 
    behavior: 'smooth'
  });
}


function addToCart(productName) {
  cart.push(productName);
  document.getElementById('cart-count').textContent = cart.length;
  updateCartItems();
}

function updateCartItems() {
  const cartItemsList = document.getElementById('cart-items');
  cartItemsList.innerHTML = ''; 

  if (cart.length === 0) {
    cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
  } else {
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      cartItemsList.appendChild(li);
    });
  }
}

function goBackToShopping() {
  scrollToSection('products');
}
