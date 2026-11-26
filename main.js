/* =========================================================
   MTX General Construction - scripts compartilhados
   ========================================================= */

(function () {
  // Ícones
  if (window.lucide) window.lucide.createIcons();

  // Header com fundo mais sólido ao rolar
  const header = document.getElementById('siteHeader');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 30);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Menu mobile
  const body = document.body;
  const menu = document.getElementById('mobileMenu');
  const toggles = document.querySelectorAll('[data-menu-toggle]');
  const openBtn = document.querySelector('[data-menu-open]');

  function setMenu(open) {
    body.classList.toggle('menu-open', open);
    body.classList.toggle('no-scroll', open);
    if (menu) menu.setAttribute('aria-hidden', String(!open));
    if (openBtn) openBtn.setAttribute('aria-expanded', String(open));
    if (open && menu) {
      const first = menu.querySelector('a, button');
      if (first) first.focus();
    }
  }

  toggles.forEach(btn => btn.addEventListener('click', () => setMenu(!body.classList.contains('menu-open'))));
  if (menu) menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && body.classList.contains('menu-open')) setMenu(false);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && body.classList.contains('menu-open')) setMenu(false);
  });

  // Animação de entrada
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('visible'));
  }

  // Ano atual no rodapé
  document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
})();
