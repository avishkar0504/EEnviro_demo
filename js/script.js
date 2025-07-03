document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    // Make sure you've linked the AOS CSS and JS in your HTML <head> and before </body>
    AOS.init({
        duration: 800, // Animation duration in ms
        once: true,    // Whether animation should happen only once - while scrolling down
        offset: 100    // Offset (in px) from the top of the screen to trigger animations
    });

    // Dynamic active state for navbar links
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        let linkPath = link.getAttribute('href');
        if (linkPath) { // Ensure href exists
            // Remove any potential hash or query parameters for comparison
            linkPath = linkPath.split('#')[0].split('?')[0];

            // Handle index.html as the default for root path
            if (currentPath === '' && linkPath === 'index.html') {
                link.classList.add('active');
            } else if (linkPath === currentPath) {
                link.classList.add('active');
            }

            // For dropdowns, if any child is active, mark the parent as active too
            const parentDropdown = link.closest('.nav-item.dropdown');
            if (parentDropdown && link.classList.contains('active')) {
                parentDropdown.querySelector('.nav-link.dropdown-toggle').classList.add('active');
            }
        }
    });

    // JavaScript for Multi-Level Dropdowns (copied from previous response)
    document.querySelectorAll('.dropdown-submenu > a').forEach(function(element){
        element.addEventListener('click', function(e) {
            var submenu = this.nextElementSibling;
            e.stopPropagation();
            e.preventDefault();
            // Close other open submenus at the same level
            document.querySelectorAll('.dropdown-submenu .dropdown-menu.show').forEach(function(item){
                if(item !== submenu) item.classList.remove('show');
            });
            submenu.classList.toggle('show');
        });
    });

    // Close all submenus when the main dropdown is hidden
    document.querySelectorAll('.dropdown').forEach(function(element){
        element.addEventListener('hidden.bs.dropdown', function () {
            this.querySelectorAll('.dropdown-menu.show').forEach(function(item){
                item.classList.remove('show');
            });
        })
    });
});