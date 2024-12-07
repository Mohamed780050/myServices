document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.service-btn');
    const selectedServicesList = document.getElementById('selected-services');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;
    const selectedServices = new Map();

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const menuItem = checkbox.closest('.menu-item');
            const serviceName = menuItem.querySelector('h3').textContent;
            const price = parseFloat(checkbox.dataset.price);
            const priceElement = menuItem.querySelector('.price');

            if (checkbox.checked) {
                // Select service
                priceElement.classList.add('active');
                totalPrice += price;
                selectedServices.set(serviceName, price);
            } else {
                // Deselect service
                priceElement.classList.remove('active');
                totalPrice -= price;
                selectedServices.delete(serviceName);
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
            li.classList.add('empty-message');
            selectedServicesList.appendChild(li);
        } else {
            selectedServices.forEach((price, service) => {
                const li = document.createElement('li');
                
                const serviceName = document.createElement('span');
                serviceName.textContent = service;
                serviceName.classList.add('service-name');
                
                const servicePrice = document.createElement('span');
                servicePrice.textContent = `$${price}`;
                servicePrice.classList.add('service-price');
                
                li.appendChild(serviceName);
                li.appendChild(servicePrice);
                selectedServicesList.appendChild(li);
            });
        }
    }

    // Initialize empty state
    updateSelectedServicesList();
});
