document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.service-btn');
    const selectedServicesList = document.getElementById('selected-services');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;
    const selectedServices = new Set();

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const serviceCard = button.closest('.service-card');
            const serviceName = serviceCard.querySelector('h3').textContent;
            const price = parseFloat(button.dataset.price);

            if (button.classList.contains('active')) {
                // Deselect service
                button.classList.remove('active');
                totalPrice -= price;
                selectedServices.delete(serviceName);
            } else {
                // Select service
                button.classList.add('active');
                totalPrice += price;
                selectedServices.add(serviceName);
            }

            // Update total price display
            totalPriceElement.textContent = `$${totalPrice}`;

            // Update selected services list
            updateSelectedServicesList();
        });
    });

    function updateSelectedServicesList() {
        selectedServicesList.innerHTML = '';
        selectedServices.forEach(service => {
            const li = document.createElement('li');
            li.textContent = service;
            selectedServicesList.appendChild(li);
        });

        if (selectedServices.size === 0) {
            const li = document.createElement('li');
            li.textContent = 'No services selected';
            li.style.fontStyle = 'italic';
            selectedServicesList.appendChild(li);
        }
    }

    // Initialize empty state
    updateSelectedServicesList();
});
