document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.primary-btn');
  if (btn) {
    btn.addEventListener('click', () => {
      const target = document.querySelector('#lessons');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  }

  const sidebarLinks = [...document.querySelectorAll('.page-sidebar .sidebar-link[href^="#"]')];
  if (!sidebarLinks.length) return;

  const sections = sidebarLinks
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const setActive = (id) => {
    sidebarLinks.forEach((link) => {
      const isMatch = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('active', isMatch);
      if (isMatch) {
        link.setAttribute('aria-current', 'true');
        link.scrollIntoView({ block: 'nearest', inline: 'nearest' });
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  sidebarLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActive(id);
      }
    });
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -65% 0px',
        threshold: [0.05, 0.2, 0.4]
      }
    );

    sections.forEach((section) => observer.observe(section));
  } else {
    const onScroll = () => {
      let current = sections[0];
      sections.forEach((section) => {
        if (window.scrollY + 140 >= section.offsetTop) {
          current = section;
        }
      });
      if (current) setActive(current.id);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  const initialHash = window.location.hash.replace('#', '');
  if (initialHash) {
    setActive(initialHash);
  } else if (sections[0]) {
    setActive(sections[0].id);
  }
});
