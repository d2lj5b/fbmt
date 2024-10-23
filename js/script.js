document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM content loaded');

    // Debug: Log all elements with IDs
    console.log('All elements with IDs:', document.querySelectorAll('[id]'));

    // Debug: Log the nav-list element
    const navList = document.getElementById('nav-list');
    console.log('nav-list element:', navList);

    // Load product data
    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            console.log('Product data loaded:', data);

            if (navList) {
                console.log('nav-list found, creating dropdown');
                // Create and populate dropdown menu
                const dropdown = createProductDropdown(data.products);
                const dropdownListItem = document.createElement('li');
                dropdownListItem.appendChild(dropdown);
                
                // Insert dropdown after the "Home" link and before the "Contact" link
                const listItems = navList.querySelectorAll('li');
                console.log('List items in nav-list:', listItems);

                if (listItems.length >= 2) {
                    navList.insertBefore(dropdownListItem, listItems[listItems.length - 1]);
                    console.log('Dropdown inserted into nav-list');
                } else {
                    console.error('Not enough list items in nav-list');
                    navList.appendChild(dropdownListItem);
                    console.log('Dropdown appended to nav-list');
                }
            } else {
                console.error('nav-list not found');
                // Fallback: Try to find any <ul> in the <nav>
                const nav = document.querySelector('nav');
                if (nav) {
                    const ul = nav.querySelector('ul');
                    if (ul) {
                        console.log('Fallback: <ul> found in <nav>, using this instead');
                        // Use this <ul> to insert the dropdown
                        const dropdown = createProductDropdown(data.products);
                        const dropdownListItem = document.createElement('li');
                        dropdownListItem.appendChild(dropdown);
                        ul.insertBefore(dropdownListItem, ul.lastElementChild);
                        console.log('Dropdown inserted into fallback <ul>');
                    } else {
                        console.error('No <ul> found in <nav>');
                    }
                } else {
                    console.error('No <nav> element found');
                }
            }

            // Create product sections
            const main = document.querySelector('main');
            const contactSection = document.getElementById('contact');
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
