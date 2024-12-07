document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.sub-service-btn');
    const selectedServicesList = document.getElementById('selected-services');
    const totalPriceElement = document.getElementById('total-price');
    const expandButtons = document.querySelectorAll('.expand-btn');
    let totalPrice = 0;
    const selectedServices = new Map();

    // Handle sub-service selection
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const menuItem = checkbox.closest('.menu-item');
            const mainService = menuItem.querySelector('h3').textContent;
            const subService = checkbox.closest('.sub-service').querySelector('.sub-service-name').textContent;
            const serviceName = `${mainService} - ${subService}`;
            const price = parseFloat(checkbox.dataset.price);
            const priceElement = checkbox.closest('.sub-service').querySelector('.sub-price');

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

    // Handle expand/collapse functionality
    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const menuItem = button.closest('.menu-item');
            menuItem.classList.toggle('expanded');
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
