document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Simple burger animation
            const lines = mobileBtn.querySelectorAll('.burger-line');
            if (navLinks.classList.contains('active')) {
                lines[0].style.transform = 'translateY(8px) rotate(45deg)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
        
        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const lines = mobileBtn.querySelectorAll('.burger-line');
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            });
        });
    }

    // Intersection Observer for Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Drag and Drop Logic for File Upload UI
    const dropArea = document.getElementById('dropArea');
    
    if (dropArea) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropArea.addEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropArea.addEventListener(eventName, unhighlight, false);
        });

        function highlight(e) {
            dropArea.classList.add('dragover');
        }

        function unhighlight(e) {
            dropArea.classList.remove('dragover');
        }

        dropArea.addEventListener('drop', handleDrop, false);

        function handleDrop(e) {
            let dt = e.dataTransfer;
            let files = dt.files;
            
            if (files.length > 0) {
                const hint = dropArea.querySelector('.upload-hint');
                hint.textContent = `Datei ausgewählt: ${files[0].name}`;
                hint.style.color = 'var(--text-pure)';
                dropArea.style.borderColor = 'var(--accent-red)';
                dropArea.style.background = 'rgba(127,4,4,0.1)';
            }
        }
        
        // Allow clicking the area
        dropArea.addEventListener('click', () => {
            // Mocking file selection dialog
            const input = document.createElement('input');
            input.type = 'file';
            input.onchange = (e) => {
                let file = e.target.files[0];
                if(file) {
                    const hint = dropArea.querySelector('.upload-hint');
                    hint.textContent = `Datei ausgewählt: ${file.name}`;
                    hint.style.color = 'var(--text-pure)';
                    dropArea.style.borderColor = 'var(--accent-red)';
                    dropArea.style.background = 'rgba(127,4,4,0.1)';
                }
            };
            input.click();
        });
    }
});
