 const scriptURL = "https://script.google.com/macros/s/AKfycbzESNKwIUQefWW2njLAwxXxfJZVbJnfGYoXEw3qW9YWzS1qZfaLL7QH_C-u8KSAPZeo/exec"; // replace with your actual URL
  const form = document.getElementById("orderForm");
  const modal = document.getElementById("successModal");
  const orderFormTittle = document.getElementById("orderFormTittle");


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
	document.getElementById("price").value = totalPrice;
  } else {
    hiddenInput.value = "No items in cart";
  }
});

const orderSummary = document.getElementById("orderSummary");
