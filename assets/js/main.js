// Smooth By No-one — interactions du site

const entete = document.querySelector('.entete');
const majEntete = () => entete.classList.toggle('plein', scrollY > 30);
majEntete();
addEventListener('scroll', majEntete, { passive: true });

// Menu mobile
const burger = document.querySelector('.burger');
burger?.addEventListener('click', () => {
  const ouvert = document.body.classList.toggle('menu-ouvert');
  burger.setAttribute('aria-expanded', ouvert);
});
document.querySelectorAll('.menu-mobile a').forEach(a =>
  a.addEventListener('click', () => document.body.classList.remove('menu-ouvert')));

// Vidéos de fond : qualité adaptée à l'écran, pas de lecture auto si l'utilisateur limite les animations
const sansAnimation = matchMedia('(prefers-reduced-motion: reduce)').matches;
const largeur = innerWidth * Math.min(devicePixelRatio || 1, 2);
const qualite = largeur > 1600 ? 1080 : largeur > 800 ? 720 : 480;
const charger = v => { if (!v.src) v.src = v.getAttribute('data-src-' + qualite); };

const video = document.querySelector('.hero-video');
if (video) {
  charger(video);
  const bouton = document.querySelector('.hero-pause');
  const maj = () => {
    bouton.classList.toggle('en-pause', video.paused);
    bouton.setAttribute('aria-label', video.paused ? 'Lancer la vidéo' : 'Mettre la vidéo en pause');
  };
  bouton.hidden = false;
  bouton.addEventListener('click', () => { video.paused ? video.play() : video.pause(); });
  video.addEventListener('play', maj);
  video.addEventListener('pause', maj);
  if (sansAnimation) video.currentTime = 9; // image fixe tirée du spectacle
  else video.play().catch(maj);
  maj();
}

// Vidéo du bas de page : chargée et lue seulement quand elle est à l'écran
const obsVideo = new IntersectionObserver(entrees => entrees.forEach(e => {
  const v = e.target;
  if (e.isIntersecting) { charger(v); if (sansAnimation) v.currentTime = 1; else v.play().catch(() => {}); }
  else v.pause();
}), { rootMargin: '200px 0px' });
document.querySelectorAll('.appel-video').forEach(v => obsVideo.observe(v));

// Apparitions au défilement
const obs = new IntersectionObserver(entrees => {
  entrees.forEach(e => { if (e.isIntersecting) { e.target.classList.add('vu'); obs.unobserve(e.target); } });
}, { rootMargin: '0px 0px -8% 0px' });
document.querySelectorAll('.apparait').forEach(el => obs.observe(el));

// Vote façon Suit & Tie (démonstration, rien n'est envoyé)
const vote = document.querySelector('.vote');
vote?.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
  if (vote.classList.contains('vote-fait')) return;
  const choix = b.dataset.choix;
  const a = choix === 'A' ? 58 + Math.round(Math.random() * 14) : 30 + Math.round(Math.random() * 14);
  const scores = { A: a, B: 100 - a };
  vote.querySelectorAll('button').forEach(x => {
    const p = scores[x.dataset.choix];
    x.style.setProperty('--p', p / 100);
    x.querySelector('em').textContent = p + ' %';
    x.classList.toggle('choisi', x === b);
  });
  vote.classList.add('vote-fait');
  vote.querySelector('.vote-merci').textContent = 'Le public a tranché. Ce soir, l’histoire prend un autre chemin.';
}));

// Visionneuse des galeries
const vignettes = [...document.querySelectorAll('.galerie button')];
if (vignettes.length) {
  const v = document.createElement('div');
  v.className = 'visionneuse';
  v.setAttribute('role', 'dialog');
  v.setAttribute('aria-modal', 'true');
  v.setAttribute('aria-label', 'Photo agrandie');
  const fl = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="${d}"/></svg>`;
  v.innerHTML = `<img alt=""><button class="v-fermer" aria-label="Fermer">${fl('M6 6l12 12M18 6L6 18')}</button>
    <button class="v-prec" aria-label="Photo précédente">${fl('M15 5l-7 7 7 7')}</button>
    <button class="v-suiv" aria-label="Photo suivante">${fl('M9 5l7 7-7 7')}</button>`;
  document.body.append(v);
  const img = v.querySelector('img');
  let n = 0, retour = null;
  const montrer = k => {
    n = (k + vignettes.length) % vignettes.length;
    const src = vignettes[n].querySelector('img');
    img.src = src.currentSrc || src.src;
    img.alt = src.alt;
  };
  const fermer = () => { v.classList.remove('ouverte'); retour?.focus(); };
  vignettes.forEach((b, k) => b.addEventListener('click', () => {
    retour = b; montrer(k); v.classList.add('ouverte'); v.querySelector('.v-fermer').focus();
  }));
  v.querySelector('.v-fermer').onclick = fermer;
  v.querySelector('.v-prec').onclick = () => montrer(n - 1);
  v.querySelector('.v-suiv').onclick = () => montrer(n + 1);
  v.addEventListener('click', e => { if (e.target === v) fermer(); });
  addEventListener('keydown', e => {
    if (!v.classList.contains('ouverte')) return;
    if (e.key === 'Escape') fermer();
    if (e.key === 'ArrowLeft') montrer(n - 1);
    if (e.key === 'ArrowRight') montrer(n + 1);
  });
}

// Formulaire de contact : spectacle prérempli depuis ?spectacle=
const choixSpectacle = document.querySelector('#spectacle');
if (choixSpectacle) {
  const voulu = new URLSearchParams(location.search).get('spectacle');
  if (voulu && [...choixSpectacle.options].some(o => o.value === voulu)) choixSpectacle.value = voulu;
}
