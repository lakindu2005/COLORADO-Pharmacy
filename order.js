document.addEventListener('DOMContentLoaded', () => {

    // Add to favorites
    const addToFavoritesBtn = document.getElementById('addtofavorites');
    if (addToFavoritesBtn) {
        addToFavoritesBtn.addEventListener('click', () => {
            console.log(`addToFavorites cart item count: ${cart.length}`);
            const favoritesJsonObj = JSON.stringify(cart);
            console.log(`addToFavorites json obj: ${favoritesJsonObj}`);
            localStorage.setItem('favouriteItems', favoritesJsonObj);
            alert('Medicines Added to Favorites!');
        });
    }

    // Apply favorites
    const applyFavoritesBtn = document.getElementById('applyfavourites');
    if (applyFavoritesBtn) {
        applyFavoritesBtn.addEventListener('click', () => {
            const favoriteItems = localStorage.getItem('favouriteItems');
            const favoritesArray = JSON.parse(favoriteItems);
            cart = favoritesArray;
            console.log(`cart items replaced with favorites: ${cart}`);
            updateCart();
            alert('Favorite medicines Applied!');
        });
    }

    // Object to store product prices
    const productPrices = {
        // Analgesics
        'Paracetamol': 10.42,
        'Ibuprofen': 11.00,
        'Aspirin': 3.14,
        'Naproxen': 24.34,
        'Acetaminophen': 5.29,
        'Capsaicin': 13.00,
        // Antibiotics
        'Amoxicillin': 7.00,
        'Azithromycin': 13.00,
        'Cephalexin': 10.25,
        'Ciprofloxacin': 9.08,
        'Doxycycline': 11.32,
        'Metronidazole': 12.37,
        // Antidepressants
        'Fluoxetine': 5.30,
        'Sertraline': 8.66,
        'Paroxetine': 7.50,
        'Escitalopram': 18.00,
        'Venlafaxine': 10.34,
        'Duloxetine': 12.00,
        // Antihistamines
        'Diphenhydramine': 6.51,
        'Loratadine': 12.00,
        'Cetirizine': 10.00,
        'Fexofenadine': 8.37,
        'Desloratadine':6.50,
        'Azelastine Nasal Spray': 15.50,
        // Antihypertensives
        'Lisinopril': 8.55,
        'Amlodipine': 9.56,
        'Losartan': 14.95,
        'Hydrochlorothiazide': 10.05,
        'Atenolol': 9.77,
        'Irbesartan': 8.99
    };

    // Array to store items added to the cart
    let cart = [];

    // Get all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.order-item button');

    // Get the cart table body element
    const cartTableBody = document.querySelector('#cart-table tbody');

    // Function to add item to the cart
    function addItemToCart(productName, quantity) {
        const price = productPrices[productName] * quantity ;
        const itemIndex = cart.findIndex(item => item.productName === productName);

        if (itemIndex >= 0) {
            cart[itemIndex].quantity += quantity;
            cart[itemIndex].price += price;
        } else {
            cart.push({ productName, quantity, price });
        }

        updateCart();
    }

    // Function to update the cart totals and table
    function updateCart() {
        let totalQuantity = 0;
        let totalPrice = 0;

        // Clear the current table content
        cartTableBody.innerHTML = '';

        cart.forEach((item, index) => {
            totalQuantity += item.quantity;
            totalPrice += item.price;

            // Create a new row for each item in the cart
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    ${item.productName}
                    <button class="remove-btn" data-index="${index}">&times;</button>
                </td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
            `;
            cartTableBody.appendChild(row);
        });

        // Add the total price row at the bottom of the table
        const totalRow = document.createElement('tr');
        totalRow.innerHTML = `
            <td><strong>Total Price</strong></td>
            <td style="text-align: right;" colspan="2"><strong>$${totalPrice.toFixed(2)}</strong></td>
        `;
        cartTableBody.appendChild(totalRow);

        // Add event listeners to the remove buttons
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                removeItemFromCart(index);
            });
        });
    }

    // Function to remove item from the cart
    function removeItemFromCart(index) {
        cart.splice(index, 1);
        updateCart();
    }

    // Add event listener to each "Add to Cart" button
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const orderItem = event.target.closest('.order-item');
            const productName = orderItem.querySelector('select').value;
            const quantityInput = orderItem.querySelector('input[type="number"]');
            const quantity = parseFloat(quantityInput.value);

            if (!isNaN(quantity) && quantity > 0) {
                addItemToCart(productName, quantity);
                quantityInput.value = ''; // Clear the input field
            } else {
                alert('Please enter a valid quantity');
            }
        });
    });

    // Add event listeners to update the price display when quantity changes
    const quantityInputs = document.querySelectorAll('.order-item input[type="number"]');
    quantityInputs.forEach(input => {
        input.addEventListener('input', (event) => {
            const orderItem = event.target.closest('.order-item');
            const productName = orderItem.querySelector('select').value;
            const quantity = parseFloat(event.target.value);
            const priceDisplay = orderItem.querySelector('span');

            if (!isNaN(quantity) && quantity > 0) {
                const price = productPrices[productName] * quantity;
                priceDisplay.textContent = price.toFixed(2);
            } else {
                priceDisplay.textContent = '0.00';
            }
        });
    });

    // Add event listeners to reset the price when a new product is selected
    const productSelects = document.querySelectorAll('.order-item select');
    productSelects.forEach(select => {
        select.addEventListener('change', (event) => {
            const orderItem = event.target.closest('.order-item');
            const priceDisplay = orderItem.querySelector('span');
            const quantityInput = orderItem.querySelector('input[type="number"]');

            // Reset price display and clear quantity input
            priceDisplay.textContent = '0.00';
            quantityInput.value = '';
        });
    });

    // Add event listener to the reset button
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', () => {
        cart = [];
        updateCart();
    });
});