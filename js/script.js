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

            if (dropdownContainer) {
                // Create and populate dropdown menu
                const dropdown = createProductDropdown(data.products);
                dropdownContainer.appendChild(dropdown);
                console.log('Dropdown created and appended');
            } else {
                console.error('Dropdown container not found');
            }

            // Create product sections
            data.products.forEach(product => {
                const section = createProductSection(product);
                if (contactSection) {
                    main.insertBefore(section, contactSection);
                } else {
                    main.appendChild(section);
                }
                console.log(`Product section created for ${product.name}`);
            });

            // Initialize smooth scrolling and other features
            initFeatures();
        })
        .catch(error => console.error('Error loading product data:', error));
});

function createProductDropdown(products) {
    const dropdown = document.createElement('select');
    dropdown.id = 'product-dropdown';

    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "Our Products";
    dropdown.appendChild(defaultOption);

    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        dropdown.appendChild(option);
    });

    return dropdown;
}

function createProductSection(product) {
    const section = document.createElement('section');
    section.id = product.id;
    section.className = 'full-screen';
    section.innerHTML = `
        <div class="content">
            <h2>${product.name}</h2>
            <img src="${product.imageUrl}" alt="${product.name}" style="max-width: 100%; height: auto;">
            <p>${product.description}</p>
        </div>
    `;
    return section;
}

function initFeatures() {
    console.log('Initializing features');
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
            const selectedSection = document.getElementById(selectedId);
            if (selectedSection) {
                selectedSection.scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                console.error(`Section with id ${selectedId} not found`);
            }
        }
    });
}
