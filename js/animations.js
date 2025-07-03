document.addEventListener("DOMContentLoaded", function() {
    // Add the tree stem to the loader dynamically
    const treeLoader = document.querySelector('.tree-loader');
    if (treeLoader && !treeLoader.querySelector('.tree-loader-stem')) {
        const stem = document.createElement('div');
        stem.classList.add('tree-loader-stem');
        treeLoader.appendChild(stem);
    }
});

window.addEventListener('load', function() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        // Give a slight delay to ensure the tree animation is seen, then hide
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
        }, 800); // 800ms delay: allows animation to play once
    }
});

// For page transitions (when clicking an internal link)
document.addEventListener('click', function(event) {
    const target = event.target;
    // Check if the clicked element is an internal link that leads to a new HTML page
    // Exclude external links, PDF links, and dropdown toggles
    if (target.tagName === 'A' &&
        target.href.includes(window.location.origin) && // Is an internal link
        !target.href.includes('.pdf') && // Is not a PDF link
        !target.classList.contains('dropdown-toggle') && // Is not a dropdown toggle
        target.target !== '_blank' // Is not opening in a new tab
        ) {

        // Check if the link is navigating to a *different* HTML page
        const newPath = target.href.split('/').pop().split('#')[0];
        const currentPath = window.location.pathname.split('/').pop().split('#')[0];

        if (newPath !== currentPath && (newPath !== '' || currentPath !== 'index.html')) {
            const loadingOverlay = document.getElementById('loading-overlay');
            if (loadingOverlay) {
                event.preventDefault(); // Prevent default navigation immediately
                loadingOverlay.classList.remove('hidden'); // Show loading overlay

                // Wait a short moment for the animation to begin, then navigate
                setTimeout(() => {
                    window.location.href = target.href;
                }, 300); // Short delay before navigation (adjust as needed)
            }
        }
    }
});