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
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalDisplay = document.getElementById('cart-total');
    const cartCountDisplay = document.getElementById('cart-count');

    cartItemsList.innerHTML = '';
    cartTotal = 0;
    let itemCount = 0;

    for (const [name, data] of Object.entries(cart)) {
        const itemTotal = data.price * data.quantity;
        const li = document.createElement('li');
        li.textContent = `${name} (x${data.quantity}) - $${itemTotal.toFixed(2)}`;
        cartItemsList.appendChild(li);

        cartTotal += itemTotal;
        itemCount += data.quantity;
    }

    if (itemCount === 0) {
        cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
    }

    cartTotalDisplay.textContent = cartTotal.toFixed(2);
    cartCountDisplay.textContent = itemCount;
}


document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const item = e.target.closest('.product-card, .carousel-item'); 
        const name = item.querySelector('p').textContent.split(' - ')[0]; 
        const price = parseFloat(item.dataset.price);  
        addToCart(name, price);  
    });
});


const carouselWrapper = document.querySelector('.carousel-wrapper');
const items = document.querySelectorAll('.carousel-item');

items.forEach(item => {
    const clone = item.cloneNode(true);
    carouselWrapper.appendChild(clone);
});

const totalWidth = carouselWrapper.scrollWidth;
const speed = totalWidth / 100;
carouselWrapper.style.animationDuration = `${speed}s`;

const carouselContainer = document.querySelector('.carousel-container');

carouselContainer.addEventListener('mouseenter', () => {
    carouselWrapper.style.animationPlayState = 'paused';
});

carouselContainer.addEventListener('mouseleave', () => {
    carouselWrapper.style.animationPlayState = 'running';
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', (e) => {
        const sectionId = e.target.textContent.toLowerCase();
        scrollToSection(sectionId);
    });
});
