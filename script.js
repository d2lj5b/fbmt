document.addEventListener('DOMContentLoaded', () => {
    // Load product data
    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            const navList = document.getElementById('nav-list');
            const main = document.querySelector('main');

            // Add company name to the header
            const companyName = document.querySelector('header h1');
            companyName.textContent = data.company_name;

            // Create nav items and product sections
            data.products.forEach(product => {
                // ... existing code ...
            });

            // Initialize smooth scrolling and other features
            initFeatures();
        })
        .catch(error => console.error('Error loading product data:', error));
});
