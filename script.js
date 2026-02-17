// Sticky header
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      // Prevent background scroll when menu is open
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Scroll reveal — progressive enhancement only
    // Content is fully visible by default; animation kicks in only if
    // IntersectionObserver is supported and working correctly.
    const revealEls = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
      // Signal CSS that JS observer is active — hides .reveal elements
      document.body.classList.add('js-ready');

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const siblings = entry.target.parentElement.querySelectorAll('.reveal');
            let delay = 0;
            siblings.forEach((sib, idx) => {
              if (sib === entry.target) delay = Math.min(idx * 80, 300);
            });
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });

      revealEls.forEach(el => observer.observe(el));

      // Safety net: if an element is already in view on load, reveal it immediately
      setTimeout(() => {
        revealEls.forEach(el => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight) {
            el.classList.add('visible');
          }
        });
      }, 100);
    }
    // If IntersectionObserver not available: .reveal stays without js-ready class
    // so content remains fully visible — no animation, no hidden content.

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navItems.forEach(a => {
            a.removeAttribute('aria-current');
            if (a.getAttribute('href') === `#${entry.target.id}`) {
              a.setAttribute('aria-current', 'page');
            }
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(s => sectionObserver.observe(s));
