// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach((s) => sectionObserver.observe(s));

// Fade-in on scroll
const fadeTargets = document.querySelectorAll(
  '.skill-card, .timeline-card, .highlight-card, .value-match, .contact-card, .role-callout'
);

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        entry.target.dataset.fadeVisible = '1';
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

fadeTargets.forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});

// Print mode: reveal fade-in elements and restore after print
function beforePrint() {
  document.body.classList.add('is-printing');
  // Force-reveal elements still hidden by the scroll animation
  fadeTargets.forEach((el) => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
}

function afterPrint() {
  document.body.classList.remove('is-printing');
  // Re-hide elements that haven't been scrolled into view yet
  fadeTargets.forEach((el) => {
    if (!el.dataset.fadeVisible) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
    }
  });
}

window.addEventListener('beforeprint', beforePrint);
window.addEventListener('afterprint', afterPrint);

// Safari/Chrome matchMedia fallback
window.matchMedia('print').addEventListener('change', (mq) => {
  if (mq.matches) { beforePrint(); } else { afterPrint(); }
});
