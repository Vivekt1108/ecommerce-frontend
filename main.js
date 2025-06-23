// Sample product data
const products = [
    { name: "Croissant", price: 200 },
    { name: "Pringles", price: 89 },
    { name: "Lay's Chips", price: 40 },
    { name: "Coca cola", price: 20 },
    { name: "Iron", price: 799 },
    { name: "Phillips Bulb", price: 99 },
    { name: "Phillips Trimmer", price: 899 },
    { name: "All Out", price: 175 },
    { name: "Kellogs Chocos", price: 220 },
    { name: "Amul Milk", price: 32 },
    { name: "Britannia Brown Bread", price: 40 },
    { name: "Dabur Honey", price: 230 },
  ];
  
  const cart = [];
  
  // Add event listeners to each card
  window.onload = () => {
    const cards = document.querySelectorAll(".card");
  
    cards.forEach((card, index) => {
      card.addEventListener("click", () => {
        addToCart(products[index]);
      });
    });
  };
  
  function addToCart(product) {
    cart.push(product);
    updateCart();
    document.getElementById("cart-section").classList.remove("hidden");
  }
  
  function updateCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    let total = 0;
  
    cart.forEach((item, index) => {
      total += item.price;
      const div = document.createElement("div");
      div.textContent = `${item.name} - ₹${item.price}`;
      cartItems.appendChild(div);
    });
  
    document.getElementById("total-item").textContent = cart.length;
    document.getElementById("total-price").textContent = total;
  }
  
  // Handle order placement
  document.getElementById("place-order").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty! Add something first.");
      return;
    }
  
    alert("Order placed successfully! 🎉");
    cart.length = 0; // Clear the cart
    updateCart();
    document.getElementById("cart-section").classList.add("hidden");
  });
  
  document.getElementById("loginForm").addEventListener("submit", function(e) {
    if (!validateLoginForm()) {
      e.preventDefault(); // stop form submission
    }
  });
  
  
  