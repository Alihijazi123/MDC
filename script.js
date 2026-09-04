document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');
    const serviceCards = document.querySelectorAll('.service-card');

    function showPage(pageId) {
        if (!pageId) pageId = 'page1';

        const targetSection = document.getElementById(pageId);
        const targetLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);

        if (!targetSection) return;

        // إخفاء كل الصفحات
        pageSections.forEach(section => {
            section.classList.remove('active');
        });

        // إزالة حالة النشاط من كل الأزرار
        navLinks.forEach(link => link.classList.remove('active'));

        // إظهار الصفحة المطلوبة
        targetSection.classList.add('active');

        // تحديث الزر النشط في الـ Navbar
        if (targetLink) {
            targetLink.classList.add('active');
        } else if (['page3', 'page4', 'page5', 'page6'].includes(pageId)) {
            const servicesLink = document.querySelector('.nav-link[data-page="page2"]');
            if (servicesLink) servicesLink.classList.add('active');
        }

        // التمرير السلس لأعلى المحتوى
        window.scrollTo({
            top: 100,
            behavior: 'smooth'
        });
    }

    // ربط ضغط أزرار القائمة الرئيسية
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            showPage(pageId);
            history.pushState(null, null, `#${pageId}`);
        });
    });

    // ربط الضغط على كروت الخدمات
    serviceCards.forEach(card => {
        card.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-target');
            if (targetPage) {
                showPage(targetPage);
                history.pushState(null, null, `#${targetPage}`);
            }
        });
    });

    // قراءة الـ Hash من الرابط
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        showPage(initialHash);
    } else {
        showPage('page1');
    }

    // التناقل بأزرار المتصفح (رجوع / تقدم)
    window.addEventListener('popstate', function() {
        const hash = window.location.hash.substring(1) || 'page1';
        if (document.getElementById(hash)) {
            showPage(hash);
        }
    });
});