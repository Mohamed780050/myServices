document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.service-btn');
    const selectedServicesList = document.getElementById('selected-services');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;
    const selectedServices = new Map(); // Changed to Map to store both name and price

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const menuItem = button.closest('.menu-item');
            const serviceName = menuItem.querySelector('h3').textContent;
            const price = parseFloat(button.dataset.price);
            const priceElement = menuItem.querySelector('.price');

            if (button.classList.contains('active')) {
                // Deselect service
                button.classList.remove('active');
                priceElement.classList.remove('active');
                totalPrice -= price;
                selectedServices.delete(serviceName);
            } else {
                // Select service
                button.classList.add('active');
                priceElement.classList.add('active');
                totalPrice += price;
                selectedServices.set(serviceName, price);
            }

            // Update total price display
            totalPriceElement.textContent = `$${totalPrice}`;

            // Update selected services list
            updateSelectedServicesList();
        });
    });

    function updateSelectedServicesList() {
        selectedServicesList.innerHTML = '';
        
        if (selectedServices.size === 0) {
            const li = document.createElement('li');
            li.textContent = 'No services selected';
            li.style.fontStyle = 'italic';
            selectedServicesList.appendChild(li);
        } else {
            selectedServices.forEach((price, service) => {
                const li = document.createElement('li');
                li.textContent = `${service} - $${price}`;
                selectedServicesList.appendChild(li);
            });
        }
    }

    // Initialize empty state
    updateSelectedServicesList();
});
