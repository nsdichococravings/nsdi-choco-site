 const scriptURL = "https://script.google.com/macros/s/AKfycbxIqJ3rLieihWY1wUb41KDjvub7lNkCy7hqM0DytPCRqjxTsDMDeT8X1CgDNwt8bilZ/exec"; // replace with your actual URL
  const form = document.getElementById("orderForm");
  const modal = document.getElementById("successModal");
  const orderFormTittle = document.getElementById("orderFormTittle");
  let finalPrice;


  function submitForm() {
    //event.preventDefault();
	
	document.getElementById("loadingSpinner").style.display = "flex";
    const formData = new FormData(form); // Creates a new FormData object from the form

    fetch(scriptURL, {
      method: "POST",
      body: formData // Send formData directly instead of JSON
    })
    .then(res => {
	 document.getElementById("loadingSpinner").style.display = "none";
      if (res.ok) {
        form.reset();
		form.style.display = "none";
		orderFormTittle.style.display = "none";
        modal.style.display = "block";

        // Auto-hide modal after 3 seconds
        setTimeout(() => {
          modal.style.display = "none";
        }, 6000);
      } else {
        alert("❌ Something went wrong. Please try again.");
      }
    })
    .catch(err => {
	document.getElementById("loadingSpinner").style.display = "none";
      console.error(err);
      alert("❌ Error submitting the form.");
    });
  }
  

  const orderBtn = document.getElementById("floatingOrderBtn");

  const orderBtnGroup = document.getElementById("floatingOrderBtn");
  window.addEventListener("scroll", () => {
    orderBtnGroup.classList.toggle("show", window.scrollY > 300);
  });

function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("active");
  }
  
 window.addEventListener("scroll", function() {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 0);
  }); 

function scrollToOrderForm(event) {
  event.preventDefault(); // ✅ Prevent the default anchor jump
    const form = document.getElementById('orderForm');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  }
 // When checkout page loads
window.addEventListener('DOMContentLoaded', () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const hiddenInput = document.getElementById("cartData");
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cart.length > 0) {
    hiddenInput.value = cart.map(item =>
      `${item.name} (x${item.quantity}) - ₹${item.price}`
    ).join("\n");
	const cartData = document.getElementById("cartData").value;
	document.getElementById("product").value = cartData;
	document.getElementById("subtotal").innerText  = totalPrice;
	document.getElementById("price").innerText  = totalPrice;
    localStorage.setItem("finalPrice", totalPrice.toFixed(2));
  } else {
    hiddenInput.value = "No items in cart";
  }
});


const offers = {
  NSDIFIRST2: 2, // 2 off
  NSDIRG3: 3, // 3 off
  NSDILG3: 3, // 3 off
  NSDISPL22:5
};
/*
function applyOffer() {
  const code = document.getElementById("offerCode").value.trim().toUpperCase();
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  //const subtotal = 100; // Example subtotal, could be dynamic
  let discount = 0;

  if (offers.hasOwnProperty(code)) {
    discount = offers[code];
    document.getElementById("offerMessage").innerText = `code applied: ${discount}% off`;
  } else {
    document.getElementById("offerMessage").innerText = `Invalid offer code.`;
  }
 
  const FinalDiscountValue = subtotal * discount /100 ;
  document.getElementById("discount").innerText = FinalDiscountValue;
  document.getElementById("price").innerText = subtotal - FinalDiscountValue;
}

*/
function applyOffer() {
  const code = document.getElementById("offerCode").value.trim().toUpperCase();
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  let discount = 0;
  let brownieTotal = 0;
  let discountValue =0;

  // Check if cart contains a Brownie item
  cart.forEach(item => {
    if (item.name.toLowerCase().includes("brownie")) {
      brownieTotal += item.price * item.quantity;
    }
  });
  finalPrice = subtotal;
  localStorage.setItem("finalPrice", finalPrice.toFixed(2));
  if (offers.hasOwnProperty(code) && brownieTotal > 0) {
    discount = offers[code];
    discountValue = (brownieTotal * discount) / 100;

    document.getElementById("offerMessage").innerText = `Code applied: ${discount}% off on Brownies!`;
    document.getElementById("discount").innerText = discountValue.toFixed(2);
    document.getElementById("price").innerText = (subtotal - discountValue).toFixed(2);
	localStorage.setItem("finalPrice", (subtotal - discountValue).toFixed(2));
  } else if (!offers.hasOwnProperty(code)) {
    document.getElementById("offerMessage").innerText = `Invalid offer code.`;
    document.getElementById("discount").innerText = "0.00";
    document.getElementById("price").innerText = subtotal.toFixed(2);
	localStorage.setItem("finalPrice", (subtotal - discountValue).toFixed(2));
  } else {
    document.getElementById("offerMessage").innerText = `This code only applies to Brownie items.`;
    document.getElementById("discount").innerText = "0.00";
    document.getElementById("price").innerText = subtotal.toFixed(2);
	localStorage.setItem("finalPrice", (subtotal - discountValue).toFixed(2));
  }
  
}
const orderSummary = document.getElementById("orderSummary");

