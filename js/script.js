document.addEventListener('DOMContentLoaded', () => {
    // Load product data
    fetch('data/products.json')
        .then(response => response.json())
        .then(data => {
            const navList = document.getElementById('nav-list');
            const main = document.querySelector('main');

            // Create nav items and product sections
            data.products.forEach(product => {
                // Add nav item
                const navItem = document.createElement('li');
                navItem.innerHTML = `<a href="#${product.id}">${product.name}</a>`;
                navList.appendChild(navItem);

                // Create product section
                const section = document.createElement('section');
                section.id = product.id;
                section.className = 'full-screen product';
                section.innerHTML = `
                    <div class="content fade-in">
                        <h2>${product.name}</h2>
                        <p>${product.description}</p>
                        <img src="${product.imageUrl}" alt="${product.name}" class="product-image">
                        <a href="#" class="cta-button">Learn More</a>
                    </div>
                `;
                main.appendChild(section);
            });

            // Initialize smooth scrolling and other features
            initFeatures();
        })
        .catch(error => console.error('Error loading product data:', error));
});

function initFeatures() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Sticky header
    const header = document.querySelector('header');
    const sticky = header.offsetTop;

    function stickyHeader() {
        if (window.pageYOffset > sticky) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }

    window.onscroll = stickyHeader;

    // Fade in elements on scroll
    const fadeElements = document.querySelectorAll('.fade-in');

    function checkFade() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;

            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkFade);
    checkFade(); // Check on load
}
