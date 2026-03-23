// Exercice 1 : menu burger
const boutonMenu = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

boutonMenu.addEventListener('click', () => {
  menu.classList.toggle('is-open');

  const estOuvert = menu.classList.contains('is-open');
  boutonMenu.setAttribute('aria-expanded', estOuvert);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.classList.contains('is-open')) {
    menu.classList.remove('is-open');
    boutonMenu.setAttribute('aria-expanded', 'false');
    boutonMenu.focus();
  }
});


// Exercice 2 : modale
const boutonOuvrir = document.querySelector('.modal-open');
const boutonFermer = document.querySelector('.modal-close');
const modale = document.querySelector('.modal');

function ouvrirModale() {
  modale.classList.add('is-visible');
  modale.setAttribute('aria-hidden', 'false');
}

function fermerModale() {
  modale.classList.remove('is-visible');
  modale.setAttribute('aria-hidden', 'true');
  boutonOuvrir.focus();
}

boutonOuvrir.addEventListener('click', ouvrirModale);
boutonFermer.addEventListener('click', fermerModale);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modale.classList.contains('is-visible')) {
    fermerModale();
  }
});

modale.addEventListener('click', (event) => {
  if (event.target === modale) {
    fermerModale();
  }
});


// Exercice 3 : accordéon
const questions = document.querySelectorAll('.faq-question');

questions.forEach((question) => {
  question.addEventListener('click', () => {
    const reponse = question.nextElementSibling;
    const estDejaOuverte = reponse.classList.contains('is-visible');

    document.querySelectorAll('.faq-answer').forEach((r) => {
      r.classList.remove('is-visible');
    });

    if (!estDejaOuverte) {
      reponse.classList.add('is-visible');
    }
  });
});


// Exercice 4 : thème sombre
const btnTheme = document.querySelector('#theme-toggle');

btnTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  
  const isDark = document.body.classList.contains('dark');
  btnTheme.textContent = isDark ? '☀️ Clair' : '🌙 Sombre';
});