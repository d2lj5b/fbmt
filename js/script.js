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
                createOrUpdateProductDropdown(navList, data.products);
            } else {
                console.error('nav-list not found');
                // Fallback: Try to find any <ul> in the <nav>
                const nav = document.querySelector('nav');
                if (nav) {
                    const ul = nav.querySelector('ul');
                    if (ul) {
                        console.log('Fallback: <ul> found in <nav>, using this instead');
                        createOrUpdateProductDropdown(ul, data.products);
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

function createOrUpdateProductDropdown(navList, products) {
    let dropdownLi = navList.querySelector('.dropdown');
    if (!dropdownLi) {
        dropdownLi = document.createElement('li');
        dropdownLi.className = 'dropdown';
        const dropdownBtn = document.createElement('a');
        dropdownBtn.href = '#';
        dropdownBtn.className = 'dropbtn';
        dropdownBtn.textContent = 'Our Products';
        dropdownLi.appendChild(dropdownBtn);
        
        // Insert the dropdown after the "Home" link
        const firstLi = navList.querySelector('li');
        if (firstLi) {
            navList.insertBefore(dropdownLi, firstLi.nextSibling);
        } else {
            navList.appendChild(dropdownLi);
        }
    }

    let dropdownContent = dropdownLi.querySelector('.dropdown-content');
    if (!dropdownContent) {
        dropdownContent = document.createElement('div');
        dropdownContent.className = 'dropdown-content';
        dropdownLi.appendChild(dropdownContent);
    }

    // Clear existing content
    dropdownContent.innerHTML = '';

    // Add product links
    products.forEach(product => {
        const link = document.createElement('a');
        link.href = `#${product.id}`;
        link.textContent = product.name;
        dropdownContent.appendChild(link);
    });

    console.log('Dropdown created/updated');
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
    // Smooth scrolling for all navigation links, including dropdown links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}
