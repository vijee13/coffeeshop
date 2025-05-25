document.addEventListener("DOMContentLoaded", function () {
    // 🌙 Auto Theme Detection
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add("dark-mode");
    }

    // 🌑 Dark Mode Toggle
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
    });

    // 📱 Mobile Menu Toggle
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("active");
    });

    // 🔍 Live Search for Menu Items
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search coffee...";
    searchInput.id = "menu-search";
    document.querySelector("#menu h2").after(searchInput);

    searchInput.addEventListener("input", function () {
        const query = this.value.toLowerCase();
        document.querySelectorAll(".menu-item").forEach(item => {
            const coffeeName = item.querySelector("p").textContent.toLowerCase();
            item.style.display = coffeeName.includes(query) ? "block" : "none";
        });
    });

    // 🛒 Cart System
    let cart = [];
    const orderList = document.getElementById("order-list");
    const totalPriceElement = document.getElementById("total-price");

    function updateCart() {
        orderList.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)} x ${item.quantity}
                <button class="remove-btn" data-index="${index}">❌</button>
            `;
            orderList.appendChild(listItem);
            total += item.price * item.quantity;
        });

        totalPriceElement.textContent = total.toFixed(2);

        // Attach event listeners to remove buttons
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                const itemIndex = this.getAttribute("data-index");
                cart.splice(itemIndex, 1);
                updateCart();
            });
        });
    }

    document.querySelectorAll(".order-btn").forEach(button => {
        button.addEventListener("click", function () {
            const itemName = this.getAttribute("data-item");
            const itemPrice = parseFloat(this.getAttribute("data-price"));

            // Check if item is already in the cart
            const existingItem = cart.find(item => item.name === itemName);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name: itemName, price: itemPrice, quantity: 1 });
            }

            updateCart();
            showOrderPopup(itemName);
        });
    });

    // ✅ Order Confirmation Popup
    function showOrderPopup(itemName) {
        const popup = document.createElement("div");
        popup.classList.add("popup");
        popup.innerHTML = `
            <p>✅ ${itemName} added to your order!</p>
        `;
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 2000);
    }

    // 📜 Smooth Scrolling for Navigation
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: "smooth" });
        });
    });
});
