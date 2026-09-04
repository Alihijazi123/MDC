document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const navToggle = document.getElementById('navToggle');
    const navLinksContainer = document.getElementById('navLinks');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinksContainer.classList.toggle('show');
        });
    }

    function showPage(pageId) {
        pageSections.forEach(section => section.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        const targetSection = document.getElementById(pageId);
        const targetLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);

        if (targetSection) {
            targetSection.classList.add('active');
        }
        if (targetLink) {
            targetLink.classList.add('active');
        }

        window.scrollTo({
            top: 150,
            behavior: 'smooth'
        });

        if (navLinksContainer.classList.contains('show')) {
            navLinksContainer.classList.remove('show');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
            history.pushState(null, null, `#${pageId}`);
        });
    });

    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        showPage(initialHash);
    }

    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1) || 'page1';
        if (document.getElementById(hash)) {
            showPage(hash);
        }
    });
});