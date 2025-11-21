// safe DOM load
document.addEventListener('DOMContentLoaded', function() {
    // set year safely
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // modal controls
    const modal = document.getElementById('modal');
    const mTitle = document.getElementById('mTitle');
    const mDesc = document.getElementById('mDesc');

    function openProject(title, desc) {
        if (mTitle) mTitle.textContent = title || '';
        if (mDesc) mDesc.textContent = desc || '';
        if (modal) modal.classList.add('show');
    }
    window.openProject = openProject; // expose for inline onclicks

    window.closeModal = function() {
        if (modal) modal.classList.remove('show');
    };

    // filters
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.addEventListener('click', () => {
            const f = btn.dataset.filter;
            document.querySelectorAll('.proj').forEach(p => {
                p.style.display = (f === 'all' || p.dataset.type === f) ? '' : 'none';
            });
        });
    });

    // Contact form (simulated)
    const sendBtn = document.getElementById('sendBtn');
    const clearBtn = document.getElementById('clearBtn');
    const formStatus = document.getElementById('formStatus');

    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const name = (document.getElementById('name') || {}).value || '';
            const email = (document.getElementById('email') || {}).value || '';
            const msg = (document.getElementById('message') || {}).value || '';
            if (!name.trim() || !email.trim() || !msg.trim()) {
                if (formStatus) formStatus.textContent = 'Please fill all fields.';
                return;
            }
            if (!/^\S+@\S+\.\S+$/.test(email)) {
                if (formStatus) formStatus.textContent = 'Enter a valid email.';
                return;
            }
            if (formStatus) formStatus.textContent = 'Sending...';
            // simulate send
            setTimeout(() => {
                if (formStatus) formStatus.textContent = 'Message sent! I will reply soon.';
            }, 900);
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            ['name', 'email', 'message'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.value = '';
            });
            if (formStatus) formStatus.textContent = '';
        });
    }

    // smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const tgt = a.getAttribute('href');
            if (tgt && tgt.length > 1) {
                e.preventDefault();
                const el = document.querySelector(tgt);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // resume button (placeholder)
    const resumeBtn = document.getElementById('resumeBtn');
    if (resumeBtn) resumeBtn.addEventListener('click', () => {
        alert('Replace this with your resume file link or server route.');
    });

});