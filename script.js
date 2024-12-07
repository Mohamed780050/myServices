document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('.sub-service-btn');
    const selectedServicesList = document.getElementById('selected-services');
    const totalPriceElement = document.getElementById('total-price');
    const expandButtons = document.querySelectorAll('.expand-btn');
    let totalPrice = 0;
    const selectedServices = new Map();

    function animateNumber(from, to, duration, element) {
        const startTime = performance.now();
        const difference = to - from;

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(from + difference * easeOutQuart);

            element.textContent = `$${current}`;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = `$${to}`;
            }
        }

        requestAnimationFrame(update);
    }

    // Handle sub-service selection
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const menuItem = checkbox.closest('.menu-item');
            const mainService = menuItem.querySelector('h3').textContent;
            const subService = checkbox.closest('.sub-service').querySelector('.sub-service-name').textContent;
            const serviceName = `${mainService} - ${subService}`;
            const price = parseFloat(checkbox.dataset.price);
            const priceElement = checkbox.closest('.sub-service').querySelector('.sub-price');
            const oldTotal = totalPrice;

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

            // Animate the total price
            animateNumber(oldTotal, totalPrice, 800, totalPriceElement);

            // Update selected services list
            updateSelectedServicesList();
        });
    });

    // Handle expand/collapse functionality with smooth animation
    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const menuItem = button.closest('.menu-item');
            const subServices = menuItem.querySelector('.sub-services');
            
            // Get the natural height of the sub-services
            if (!menuItem.classList.contains('expanded')) {
                subServices.style.height = 'auto';
                const height = subServices.offsetHeight;
                subServices.style.height = '0';
                
                // Trigger reflow
                subServices.offsetHeight;
                
                // Set the final height
                subServices.style.height = height + 'px';
            } else {
                subServices.style.height = subServices.offsetHeight + 'px';
                
                // Trigger reflow
                subServices.offsetHeight;
                
                // Set height to 0
                subServices.style.height = '0';
            }
            
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
            let delay = 0;
            selectedServices.forEach((price, service) => {
                const li = document.createElement('li');
                li.style.animationDelay = `${delay}ms`;
                delay += 100; // Stagger the animations
                
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
