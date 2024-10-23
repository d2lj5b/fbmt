document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded');
    // Load product data
    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            console.log('Product data loaded:', data);
            const dropdownContainer = document.getElementById('product-dropdown-container');
            const main = document.querySelector('main');
            const homeSection = document.getElementById('home');
            const contactSection = document.getElementById('contact');

            // Create and populate dropdown menu
            const dropdown = createProductDropdown(data.products);
            dropdownContainer.appendChild(dropdown);
            console.log('Dropdown created and appended');

            // Create product sections
            data.products.forEach(product => {
                const section = createProductSection(product);
                main.insertBefore(section, contactSection);
                console.log(`Product section created for ${product.name}`);
            });

            // Initialize smooth scrolling and other features
            initFeatures();
        })
        .catch(error => console.error('Error loading product data:', error));
});

function createProductSection(product) {
    const section = document.createElement('section');
    section.id = product.id;
    section.className = 'full-screen';
    section.innerHTML = `
        <div class="content">
            <h2>${product.name}</h2>
            <img src="${product.imageUrl}" alt="${product.name}">
            <p>${product.description}</p>
        </div>
    `;
    return section;
}

function initFeatures() {
    // Smooth scrolling for all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Handle dropdown selection with smooth scrolling
    const dropdown = document.getElementById('product-dropdown');
    dropdown.addEventListener('change', (event) => {
        const selectedId = event.target.value;
        if (selectedId) {
            document.getElementById(selectedId).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}
