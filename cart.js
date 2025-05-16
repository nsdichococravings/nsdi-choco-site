const cartItemsContainer = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');

function renderCart() {
	
  const cartItems = getCart();
  const cartContainer = document.getElementById('cart-items');	
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cartData.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
	cartItem.id = 'cart-item-id';
	cartItem.setAttribute('data-item-id', item.id)
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-details">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">₹${item.price} each</div>
      </div>
      <div class="cart-item-qty">
        <input type="number" value="${item.quantity}" min="1" data-index="${index}" />
      </div>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  totalPriceElement.textContent = total.toFixed(2);;

}

cartItemsContainer.addEventListener('change', (e) => {
  if (e.target.tagName === 'INPUT') {
	//const index = e.target.dataset.index;
	const itemId = parseInt(e.target.dataset.index); // This is actually item.id
	const cart = getCart();
	const itemToUpdate = cart.find(item => item.id === itemId);
	if (itemToUpdate) {
	  const newQty = parseInt(e.target.value) || 1;
      itemToUpdate.quantity = newQty;
      saveCart(cart);
     // renderCart();
      updateCartSummary();
    }
  }
});
/*
cartItemsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove-btn')) {
    const index = e.target.dataset.index;
    cartData.splice(index, 1);
    renderCart();
  }
});*/

document.getElementById('checkoutBtn').addEventListener('click', () => {
  alert('Redirecting to payment... (hook this into Razorpay later)');
});

// cart.js

// Helper function to get the current cart from localStorage
function getCart() {
  let cart = JSON.parse(localStorage.getItem('cart'));
  return cart ? cart : [];
}

// Helper function to save the cart to localStorage
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add item to the cart
function addToCart(product) {
  clearPriceOnCartChange();	
  console.log('Product added to cart:', product);
  const cart = getCart();
  const existingProductIndex = cart.findIndex(item => item.id === product.id);
  
  if (existingProductIndex === -1) {
    cart.push(product);
  } else {
    cart[existingProductIndex].quantity += 1; // Increase quantity if the item is already in the cart
  }
	Swal.fire({
		toast: true,
		position: 'center',
		icon: 'success',
		title: 'Added to cart',
		showConfirmButton: false,
		timer: 2000,
		background: '#2c003e',
		color: '#FFD700',
		customClass: {
		  popup: 'swal-cart-toast'
		}
	  });
  saveCart(cart);
  updateCartSummary();
	 
}

// Remove item from the cart
function removeFromCart(productId) {
  clearPriceOnCartChange();	
  let cart = getCart();
  
     // Visually hide the element
  const itemElement = document.querySelector(`[data-item-id="${productId}"]`);
  if (itemElement) {
    itemElement.style.display = 'none'; // 👈 Hide the item from UI
  }
  
  
  const updatedCart = cart.map(item => {
    if (item.id === productId) {
      return {
        ...item,
        quantity: 0,
        price: 0,
        name: '',
        image: ''
      };
    }
    return item;
  }).filter(item => item.quantity > 0); 
  

  saveCart(updatedCart);
  updateCartSummary();
 }

// Update the cart summary (e.g., total items count and total price)
function updateCartSummary() {
  const cart = getCart();
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // Update cart items count on the homepage (index.html)
	const cartItemCountElement = document.getElementById('cartItemCount');

	// Check if the element exists (not null)
	if (cartItemCountElement !== null) {
	  cartItemCountElement.textContent = totalItems;
	} else {
	  console.warn('Cart item count element not found on this page.');
	}

  // Update total price and items on the cart page
  document.getElementById('totalPrice').textContent = totalPrice.toFixed(2);
  document.getElementById('price').textContent = totalPrice.toFixed(2);
  
}

// Initialize cart summary on page load
function initializeCart() {
  updateCartSummary();
}

// Initialize cart
document.addEventListener('DOMContentLoaded', loadCartItems);
document.addEventListener('DOMContentLoaded', () => {
  renderCart(); 
  initializeCart(); 
});
function proceedToCheckout() {
clearPriceOnCartChange();
window.location.href = "orderForm.html";
}

function clearPriceOnCartChange() {
  localStorage.removeItem("finalPrice");
}
