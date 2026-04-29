// Scroll-aware nav: aggiunge classe quando si scorre
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Gestione submit form con feedback visivo
const form = document.querySelector('form[name="contatti"]');
if (form) {
  form.addEventListener('submit', (e) => {
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Invio in corso…';
    btn.disabled = true;
  });
}
