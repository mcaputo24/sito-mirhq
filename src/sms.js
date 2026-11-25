// Pagina /sms — invio del form "sms" a Netlify Forms senza lasciare la pagina.

const nav = document.querySelector('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

const form = document.querySelector('form[name="sms"]');

if (form) {
  const btn = form.querySelector('.form-submit');
  const status = form.querySelector('.form-status');
  const btnLabel = btn.textContent;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    btn.textContent = 'Invio in corso…';
    btn.disabled = true;
    status.textContent = '';
    status.className = 'form-status';

    try {
      const body = new URLSearchParams(new FormData(form)).toString();
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      });

      if (!res.ok) throw new Error('HTTP ' + res.status);

      form.reset();
      btn.textContent = 'Richiesta inviata ✓';
      status.textContent = 'Grazie, ti ricontattiamo entro 24 ore lavorative.';
      status.classList.add('ok');
    } catch (err) {
      btn.textContent = btnLabel;
      btn.disabled = false;
      status.innerHTML = 'Invio non riuscito. Riprova oppure scrivi a <a href="mailto:info@mirhq.it">info@mirhq.it</a>.';
      status.classList.add('err');
    }
  });
}
