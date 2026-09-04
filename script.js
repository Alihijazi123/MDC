document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const navLinksContainer = document.getElementById('navLinks');

    // Smooth page section navigation with custom dynamic animation
    function showPage(pageId) {
        const targetSection = document.getElementById(pageId);
        const targetLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);

        if (!targetSection) return;

        // Hide all active sections with slide/fade out
        pageSections.forEach(section => {
            if (section.classList.contains('active')) {
                section.style.opacity = '0';
                section.style.transform = 'translateY(15px)';
                
                setTimeout(() => {
                    section.classList.remove('active');
                }, 200);
            }
        });

        navLinks.forEach(link => link.classList.remove('active'));

        // Show target section with entrance animation
        setTimeout(() => {
            targetSection.classList.add('active');
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
            
            if (targetLink) {
                targetLink.classList.add('active');
            }
        }, 200);

        window.scrollTo({
            top: 150,
            behavior: 'smooth'
        });
    }

    // Nav link click event listener
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
            history.pushState(null, null, `#${pageId}`);
        });
    });

    // Handle initial Hash load
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        showPage(initialHash);
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1) || 'page1';
        if (document.getElementById(hash)) {
            showPage(hash);
        }
    });
});