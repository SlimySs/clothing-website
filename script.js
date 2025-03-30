document.addEventListener("DOMContentLoaded", function () {
  // Scroll to section function
  function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 50, // Adjust for fixed header
        behavior: 'smooth'
      });
    }
  }

  // Add event listeners to navigation buttons
  document.querySelectorAll(".nav-links button, .cta-button").forEach((button) => {
    button.addEventListener("click", () => {
      const sectionId = button.getAttribute("data-section");
      if (sectionId) {
        scrollToSection(sectionId);
      }
    });
  });

  // Shopping Cart Functionality
  let cart = {};
  let cartTotal = 0;

  function addToCart(name, price) {
    if (cart[name]) {
      cart[name].quantity += 1;
    } else {
      cart[name] = { price: price, quantity: 1 };
    }
    updateCartDisplay();
  }

  function updateCartDisplay() {
    const cartItemsList = document.getElementById("cart-items");
    const cartTotalDisplay = document.getElementById("cart-total");
    const cartCountDisplay = document.getElementById("cart-count");

    cartItemsList.innerHTML = "";
    cartTotal = 0;
    let itemCount = 0;

    for (const [name, data] of Object.entries(cart)) {
      const itemTotal = data.price * data.quantity;
      const li = document.createElement("li");
      li.textContent = `${name} (x${data.quantity}) - $${itemTotal.toFixed(2)}`;
      cartItemsList.appendChild(li);
      cartTotal += itemTotal;
      itemCount += data.quantity;
    }

    if (itemCount === 0) {
      cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
    }

    cartTotalDisplay.textContent = cartTotal.toFixed(2);
    cartCountDisplay.textContent = itemCount;
  }

  document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const item = e.target.closest(".product-card");
      const name = item.querySelector("p").textContent.split(" - ")[0];
      const price = parseFloat(item.dataset.price);
      addToCart(name, price);
    });
  });
});
