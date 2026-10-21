// Génère toutes les pages HTML du site à partir des données ci-dessous.
// Usage : node build.mjs   (aucune dépendance)

import { writeFileSync, readdirSync, existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

// Numéro de version d'un fichier (change dès que son contenu change) : force les navigateurs à recharger
const version = f => createHash('md5').update(readFileSync(f)).digest('hex').slice(0, 8);
const V_CSS = version('assets/css/style.css');
const V_JS = version('assets/js/main.js');

const SITE = 'https://www.smoothbynoone.com';
const TEL = '06 75 30 33 76';
const TEL_LIEN = '+33675303376';
const MAIL = 'contact@smoothbynoone.com';
const RESEAUX = {
  instagram: 'https://www.instagram.com/smooth_by_no_one/',
  facebook: 'https://www.facebook.com/smoothbynoone',
  youtube: 'https://www.youtube.com/@smoothbynoone7067',
};

// ---------- Données ----------

const SPECTACLES = [
  {
    id: 'suit-and-tie', teaser: true, page: 'suitandtie', nom: 'Suit & Tie', nomLong: 'Suit & Tie',
    affiche: 'suit-and-tie', fond: 'trio-masques',
    accroche: 'Et si le public décidait vraiment de la fin ?',
    resume: 'Le seul spectacle interactif à choix multiples : votes en direct, chemins alternatifs, plusieurs fins possibles. Ici, le spectacle change. À chaque fois.',
    tags: ['Interactif', '90 min', 'Tout public'],
    infos: [['Durée', '≈ 90 min'], ['Public', 'Tout public'], ['Formats', 'Intégral, dîner-spectacle, interventions']],
    nouveau: true,
    histoire: [
      'Suit & Tie est un spectacle interactif à choix multiples, unique en son genre, où <strong>le public influence l’histoire en temps réel</strong> et détermine son déroulement jusqu’à des fins différentes selon les décisions prises.',
      'Dès les premières minutes, les spectateurs font un choix fondateur : quel parcours narratif suivre, quel point de vue adopter. Ce premier choix conditionne les relations entre les personnages, les situations et la manière dont l’aventure se déploie.',
      'Tout au long de la soirée, le public vote à plusieurs moments clés. Chaque décision modifie les interactions et oriente le récit vers des chemins distincts, jusqu’à plusieurs fins possibles.',
      'Porté par une mise en scène élégante, mêlant danse, chant, jeu et interaction, et animé par un maître de cérémonie, Suit & Tie propose une expérience moderne, raffinée et participative, où <strong>aucune représentation ne se ressemble</strong>.',
    ],
    cle: 'Un spectacle. Des choix assumés. Et une histoire façonnée par votre public.',
    contenu: [
      ['Une histoire évolutive', 'Façonnée en direct par les votes du public, avec plusieurs fins possibles.'],
      ['Un maître de cérémonie', 'Fil conducteur de l’expérience, présent du début à la fin.'],
      ['Danse, chant et jeu', 'Au service d’une narration rythmée et élégante.'],
      ['Une mise en scène immersive', 'Pensée pour impliquer la salle et marquer les esprits.'],
      ['Effets visuels et pyrotechnie d’intérieur', 'Selon réglementation et configuration du lieu.'],
      ['Des costumes haut de gamme', 'Raffinés et renouvelés tout au long du spectacle.'],
    ],
  },
  {
    id: 'underground', teaser: true, page: 'underground', nom: 'Underground', nomLong: 'Underground : le Monde Caché',
    affiche: 'underground', fond: 'pyro',
    accroche: 'Un film de danse à l’américaine, joué en live.',
    resume: 'Danse classique, hip-hop, chant, effets visuels et pyrotechnie : suivez Jade dans un monde secret où chaque pas révèle un mystère.',
    tags: ['Danse', '80 min', 'Famille'],
    infos: [['Durée', '≈ 80 min'], ['Public', 'Tout public'], ['Diffusion', 'Toute l’année']],
    histoire: [
      'Plongez dans l’Underground, un monde secret plein de mystères à découvrir. Vous y suivrez <strong>Jade</strong>, une jeune femme aux rêves fascinants, prête à explorer l’inconnu. Mais attention : les choses ne sont pas toujours ce qu’elles semblent être.',
      'Ce spectacle de danse innovant, alliant <strong>hip-hop et ballet</strong>, l’entraîne dans un voyage éblouissant où chaque pas révèle un mystère. Entre rires, surprises et découvertes, l’aventure émerveille enfants et adultes.',
      'Laissez-vous emporter dans un monde où la danse est la langue secrète de l’Underground. Un show puissant, moderne et fédérateur, où l’énergie et l’émotion ne s’arrêtent jamais.',
    ],
    cle: 'Préparez-vous à ne pas être prêt…',
    contenu: [
      ['Danse classique & hip-hop', 'Deux univers chorégraphiques opposés qui se rencontrent et évoluent au fil de l’histoire.'],
      ['Théâtre & personnages', 'Une véritable intrigue portée par des personnages, des dialogues et une mise en scène rythmée.'],
      ['Chant & musique', 'Des séquences chantées et musicales intégrées à l’histoire.'],
      ['Mise en scène cinématographique', 'Des tableaux qui s’enchaînent comme les scènes d’un film.'],
      ['Univers visuel immersif', 'Costumes, lumières et scénographie plongent le public au cœur du Monde Caché.'],
      ['Pyrotechnie', 'Des effets qui viennent enrichir l’aventure (selon réglementation).'],
    ],
  },
  {
    id: 'pop-corn', teaser: true, page: 'pop-corn', nom: 'Pop-Corn Show', nomLong: 'Pop-Corn Show',
    affiche: 'pop-corn', fond: 'danseuses-jaunes', appel: 'pop-corn-scene',
    accroche: 'Le cinéma se regarde… Pop-Corn Show se vit.',
    resume: 'Elena et Silas sont propulsés au cœur du cinéma : chevaliers, ninjas, dinosaures… Danse, théâtre, humour, vidéo et interactions avec le public.',
    tags: ['Cinéma', '80 min', 'Famille'],
    infos: [['Durée', '≈ 80 min'], ['Public', 'Tout public'], ['Diffusion', 'Toute l’année']],
    histoire: [
      '<strong>Elena et Silas</strong>, deux meilleurs amis que rien ne sépare, viennent assister à la projection de « La Quête des Mondes 2 ». Mais leur séance va rapidement prendre une tournure totalement inattendue…',
      'Propulsés au cœur du cinéma, ils traversent des univers aussi cultes qu’imprévisibles : chevaliers, ninjas, dinosaures et bien d’autres rencontres surprenantes.',
      'Mêlant danse en tout genre, théâtre, humour, vidéo et <strong>interactions avec le public</strong>, Pop-Corn Show embarque petits et grands dans une aventure rythmée où les codes du cinéma prennent vie sur scène.',
    ],
    cle: 'Et si, cette fois, les héros du film… c’était vous ?',
    contenu: [
      ['Une véritable histoire', 'Deux héros projetés au cœur du cinéma, entre épreuves et rebondissements.'],
      ['Des danseurs-comédiens professionnels', 'Danse, théâtre, jeu et mise en scène réunis.'],
      ['Des univers cinématographiques variés', 'Qui s’enchaînent et plongent le public dans des ambiances totalement différentes.'],
      ['Une mise en scène visuelle', 'Portée par les costumes, la musique, la vidéo et les effets scéniques.'],
      ['Un film en live', 'Des personnages, de l’humour, de l’émotion et un vrai fil narratif.'],
      ['Familial et fédérateur', 'Conçu pour embarquer aussi bien les enfants que les adultes.'],
    ],
  },
  {
    id: 'halloween', teaser: true, page: 'halloween', nom: 'Sweet Dreams', nomLong: 'Halloween : Sweet Dreams',
    affiche: 'halloween', fond: 'groupe-rouge', cadrage: '50% 20%', saison: 'Halloween',
    accroche: 'Entrez dans le rêve… si vous osez.',
    resume: 'Terrence réveille sans le vouloir sorcières, vampires et loups-garous. Frissons maîtrisés, magie et pyrotechnie, dès 6 ans.',
    tags: ['Halloween', '80 min', 'Dès 6 ans'],
    infos: [['Durée', '≈ 80 min'], ['Public', 'Dès 6 ans'], ['Saison', 'Halloween']],
    histoire: [
      'Dans Halloween : Sweet Dreams, <strong>Terrence</strong> se retrouve plongé au cœur d’un univers étrange et fascinant après avoir commis une erreur aux lourdes conséquences. En touchant le mauvais objet, au mauvais endroit, il réveille les créatures les plus emblématiques d’Halloween.',
      'Sorcières, vampires, zombies, loups-garous : chaque apparition devient un défi, chaque rencontre une épreuve à traverser, dans un univers où rêve et cauchemar se confondent.',
      'Porté par une mise en scène immersive, des chorégraphies puissantes et des costumes spectaculaires, le spectacle mêle frissons et magie <strong>sans jamais perdre son esprit familial</strong>. Terrence y découvre que le courage, l’amitié et la solidarité sont les seules clés pour affronter ses peurs… et peut-être se réveiller.',
    ],
    cle: 'Un spectacle d’Halloween visuel, rythmé et accessible à tous.',
    contenu: [
      ['Une mise en scène cinématographique', 'Qui plonge le public dans un univers entre rêve et cauchemar.'],
      ['Une histoire palpitante', 'Accessible dès 6 ans, mêlant frissons, humour et magie.'],
      ['Une grande diversité de danses', 'Au service de l’énergie et de la narration.'],
      ['Les personnages d’Halloween', 'Intégrés à des tableaux visuels forts.'],
      ['Effets visuels et pyrotechnie', 'Selon réglementation et configuration.'],
      ['Des costumes spectaculaires', 'Qui renforcent l’atmosphère mystérieuse du spectacle.'],
    ],
  },
  {
    id: 'noel', page: 'noel-la-nouvelle-equipe', nom: 'Noël', nomLong: 'Noël : la Nouvelle Équipe',
    affiche: 'noel', fond: 'noel-rennes', saison: 'Noël',
    accroche: 'Cette année, Noël recrute !',
    resume: 'Charlie est missionnée par le Père Noël pour former une toute nouvelle équipe. Danse, chant et personnages déjantés, en 45 ou 80 minutes.',
    tags: ['Noël', '45 ou 80 min', 'Famille'],
    infos: [['Durée', '45 ou 80 min'], ['Public', 'Tout public'], ['Saison', 'Fêtes de fin d’année']],
    histoire: [
      'Rejoignez l’aventure magique de <strong>Charlie</strong>, missionnée par le Père Noël en personne : former une toute nouvelle équipe dédiée à la distribution des cadeaux.',
      'Cette quête l’amène à chercher des remplaçants pour les rôles essentiels du monde féerique de Noël. Mais qui choisira-t-elle ? Une série de candidats improbables et attachants, chacun avec ses talents et sa personnalité pétillante, prêts à apporter un souffle nouveau à la tradition.',
      'Embarquez dans ce voyage féerique pour découvrir comment se prépare <strong>le Noël le plus joyeux et le plus innovant</strong> que vous ayez jamais vu.',
    ],
    cle: 'Qui fera partie de la nouvelle équipe ? La mission commence maintenant.',
    contenu: [
      ['Une mise en scène festive', 'Pensée pour plonger le public au cœur de la magie de Noël.'],
      ['Danse et chant', 'Intégrés à une narration rythmée et accessible à tous.'],
      ['Des personnages déjantés', 'Une galerie de nouveaux personnages, chacun avec son univers et son style.'],
      ['Des costumes colorés', 'Fun et spectaculaires, pour émerveiller petits et grands.'],
      ['Effets visuels et surprises', 'Tout au long du spectacle.'],
      ['Deux formats', '45 ou 80 minutes, adaptés à votre programmation.'],
    ],
  },
];

const ARTISTES = [
  ['john', 'Pouce John', 'Fondateur · Directeur artistique'],
  ['jonathan', 'Jonathan Schwartz', 'Fondateur · Régisseur'],
  ['barbie', 'Barbara « Barbie »', 'Danseuse · Artiste feu'],
  ['volka', 'Romain « Volka »', 'Danseur'],
  ['anais', 'Anaïs', 'Danseuse · Chanteuse'],
  ['lison', 'Lison', 'Danseuse'],
  ['thibaut', 'Thibaut', 'Danseur'],
  ['kevin', 'Kevin', 'Danseur'],
  ['leo', 'Léo', 'Danseur'],
  ['julie', 'Julie', 'Danseuse'],
  ['mathilde', 'Mathilde', 'Danseuse'],
  ['samantha', 'Samantha', 'Chanteuse'],
  ['pauline', 'Pauline', 'Danseuse'],
  ['izayo', 'Izayo', 'Danseur'],
  ['marine', 'Marine', 'Danseuse'],
  ['mario', 'Mario', 'Danseur'],
  ['maude', 'Maude', 'Danseuse'],
  ['morgan', 'Morgan', 'Danseur'],
  ['elektra', 'Elektra', 'Danseuse'],
  ['eilisha', 'Eilisha', 'Chanteuse'],
  ['eliane', 'Éliane', 'Danseuse'],
  ['fanny', 'Fanny', 'Danseuse'],
  ['harmony', 'Harmony', 'Danseuse'],
  ['manuela', 'Manuela', 'Danseuse'],
];

const CLIENTS = [
  ['sandaya', 'Sandaya'], ['yelloh-village', 'Yelloh! Village'], ['la-grande-motte', 'La Grande Motte'],
  ['marvilla-parks', 'Marvilla Parks'], ['capfun', 'Capfun'], ['homair', 'Homair'], ['mileade', 'Miléade'],
  ['azureva', 'Azureva'], ['ternelia', 'Ternélia'], ['camping-paradis', 'Camping Paradis'],
  ['villeneuve-lez-avignon', 'Villeneuve-lès-Avignon'], ['saint-bres', 'Saint-Brès'],
  ['crets-en-belledonne', 'Crêts en Belledonne'], ['marche-du-lez', 'Marché du Lez'],
];

const NAV = [
  ['index', 'Accueil'], ['spectacles', 'Spectacles'], ['performing', 'Performing'],
  ['nosartistes', 'Les artistes'], ['galerie', 'Galerie'], ['contact', 'Contact'],
];

// Fiches « Infos clés » reprises de l'ancien site (largeur, hauteur, texte alternatif)
const INFOS_CLES = {
  'suit-and-tie': [714, 1327, 'Infos clés Suit & Tie : spectacle interactif tout public, environ 90 minutes, équipe de 6 à 10 artistes, diffusion toute l’année, danse, chant live et comédie, spectacle intégral ou dîner-spectacle, vote du public.'],
  underground: [623, 931, 'Infos clés Underground : spectacle familial accessible à tous, environ 80 minutes, spectacle scénique immersif, technique adaptable selon les lieux, diffusion toute l’année.'],
  'pop-corn': [1211, 681, 'Infos clés Pop-Corn Show : tout public, 80 minutes, spectacle immersif mêlant danse, théâtre et univers du cinéma, équipe de 4 à 8 artistes, espace scénique adaptable, diffusion toute l’année.'],
  halloween: [705, 723, 'Infos clés Halloween : Sweet Dreams : spectacle familial dès 6 ans, environ 80 minutes, mise en scène immersive, technique adaptable, joué principalement pendant Halloween.'],
  noel: [559, 839, 'Infos clés Noël : la Nouvelle Équipe : spectacle familial tout public, 45 ou 80 minutes, mise en scène immersive, technique adaptable, pour la période des fêtes.'],
};

// ---------- Utilitaires ----------

const url = p => (p === 'index' ? './' : `${p}.html`);
const canon = p => (p === 'index' ? `${SITE}/` : `${SITE}/${p}`);
const galerieDe = id => {
  const d = `assets/img/spectacles/${id}`;
  return existsSync(d) ? readdirSync(d).filter(f => f.endsWith('.jpg')).sort().map(f => `${d}/${f}`) : [];
};

const ICONES = {
  fleche: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8.1v3h2.5V21h2.9z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12c0 1.6.1 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.3-1.6.4-3.2.4-4.8s-.1-3.2-.4-4.8zM10 15V9l5.2 3L10 15z"/></svg>',
};
const btn = (href, texte, cls = '') => `<a class="btn ${cls}" href="${href}">${texte} ${ICONES.fleche}</a>`;

const carteSpectacle = (s, i = 0, avecResume = true) => `
      <a class="affiche apparait" data-delai="${i % 3}" href="${url(s.page)}">
        <span class="affiche-visuel"><img src="assets/img/affiches/${s.affiche}.jpg" alt="Affiche du spectacle ${s.nomLong}" loading="lazy" width="1000" height="1500"><span class="affiche-fleche">${ICONES.fleche}</span></span>
        <div class="affiche-info">
          <div class="affiche-tags">${s.nouveau ? '<span class="tag tag-or">Nouveau</span>' : ''}${s.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
          <h3 class="titre titre-s">${s.nomLong}</h3>
          ${avecResume ? `<p>${s.resume}</p>` : ''}
        </div>
      </a>`;

// ---------- Gabarit commun ----------

function page({ id, titre, description, image = 'assets/img/photos/feu-lumieres.jpg', contenu, jsonld }) {
  const actif = p => p === id || (p === 'spectacles' && SPECTACLES.some(s => s.page === id));
  const lien = ([p, l]) => `<a href="${url(p)}"${actif(p) ? ' aria-current="page"' : ''}>${l}</a>`;
  // Menu principal : « Spectacles » ouvre un mini-menu avec chaque spectacle
  const navLiens = NAV.map(([p, l]) => p !== 'spectacles' ? lien([p, l]) : `<div class="nav-groupe">
          ${lien([p, l])}
          <div class="sous-menu">
            <div class="sous-menu-liste">
              ${SPECTACLES.map(s => `<a class="sous-menu-lien" href="${url(s.page)}"${s.page === id ? ' aria-current="page"' : ''}><img src="assets/img/affiches/${s.affiche}.jpg" alt="" width="1000" height="1500" loading="lazy"><span><b>${s.nomLong}</b><small>${s.tags.slice(0, 2).join(' · ')}</small></span></a>`).join('\n              ')}
            </div>
            <div class="sous-menu-pied"><a href="spectacles.html">Tous les spectacles</a><a href="performing.html">Performing sur mesure</a></div>
          </div>
        </div>`).join('\n        ');
  // Menu mobile : les spectacles apparaissent en retrait sous « Spectacles »
  const navMobile = NAV.map(([p, l]) => p !== 'spectacles' ? lien([p, l]) : lien([p, l]) + `
      <div class="menu-mobile-sous">${SPECTACLES.map(s => `<a href="${url(s.page)}"${s.page === id ? ' aria-current="page"' : ''}>${s.nomLong}</a>`).join('')}</div>`).join('\n      ');
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'PerformingGroup',
    name: 'Smooth By No-one',
    url: SITE,
    logo: `${SITE}/assets/img/logo-blanc.png`,
    email: MAIL,
    telephone: TEL_LIEN,
    address: { '@type': 'PostalAddress', streetAddress: '48 rue du Mistral', postalCode: '34130', addressLocality: 'Mauguio', addressCountry: 'FR' },
    areaServed: 'Sud de la France',
    sameAs: Object.values(RESEAUX),
  };
  return `<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${titre}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${canon(id)}">
  <meta name="theme-color" content="#0c0b0a">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:site_name" content="Smooth By No-one">
  <meta property="og:title" content="${titre}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canon(id)}">
  <meta property="og:image" content="${SITE}/${image}">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="assets/img/favicon.png" type="image/png">
  <link rel="apple-touch-icon" href="assets/img/apple-touch-icon.png">${id === 'merci' ? '\n  <meta name="robots" content="noindex">' : ''}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Instrument+Serif:ital@1&display=swap" rel="stylesheet">
  <script>document.documentElement.classList.add("js")</script>
  <link rel="stylesheet" href="assets/css/style.css?v=${V_CSS}">
  <script type="application/ld+json">${JSON.stringify(jsonld ? [ld, jsonld] : ld)}</script>
</head>
<body>
  <a class="sr" href="#contenu">Aller au contenu</a>
  <header class="entete">
    <div class="wrap">
      <a class="logo" href="./" aria-label="Smooth By No-one, accueil"><img src="assets/img/logo-blanc.png" alt="Smooth By No-one" width="814" height="280"></a>
      <nav class="nav" aria-label="Navigation principale">
        ${navLiens}
      </nav>
      ${btn('contact.html', 'Demander un devis', 'btn-petit')}
      <button class="burger" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="menu-mobile"><span></span></button>
    </div>
  </header>
  <div class="menu-mobile" id="menu-mobile">
    <nav aria-label="Navigation mobile">
      ${navMobile}
    </nav>
    <div>
      ${btn('contact.html', 'Demander un devis')}
      <p class="texte" style="margin-top:18px"><a href="tel:${TEL_LIEN}">${TEL}</a> · <a href="mailto:${MAIL}">${MAIL}</a></p>
    </div>
  </div>

  <main id="contenu">
${contenu}
  </main>

  <footer class="pied">
    <div class="wrap">
      <div class="pied-grille">
        <div class="pied-marque">
          <img src="assets/img/logo-blanc.png" alt="Smooth By No-one" width="160" height="55" style="height:44px;width:auto">
          <p>Troupe de spectacle vivant itinérante, basée à Mauguio. Spectacles originaux clé en main et performances sur mesure, partout dans le Sud de la France.</p>
          <div class="reseaux">
            <a href="${RESEAUX.instagram}" aria-label="Instagram" target="_blank" rel="noopener">${ICONES.instagram}</a>
            <a href="${RESEAUX.facebook}" aria-label="Facebook" target="_blank" rel="noopener">${ICONES.facebook}</a>
            <a href="${RESEAUX.youtube}" aria-label="YouTube" target="_blank" rel="noopener">${ICONES.youtube}</a>
          </div>
        </div>
        <div>
          <h4>Spectacles</h4>
          <ul>
            ${SPECTACLES.map(s => `<li><a href="${url(s.page)}">${s.nomLong}</a></li>`).join('\n            ')}
            <li><a href="performing.html">Performing</a></li>
          </ul>
        </div>
        <div>
          <h4>La troupe</h4>
          <ul>
            <li><a href="nosartistes.html">Les artistes</a></li>
            <li><a href="galerie.html">Galerie</a></li>
            <li><a href="contact.html">Nous contacter</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="tel:${TEL_LIEN}">${TEL}</a></li>
            <li><a href="mailto:${MAIL}">${MAIL}</a></li>
            <li style="color:var(--gris)">Mauguio, Hérault</li>
          </ul>
        </div>
      </div>
      <div class="pied-bas">
        <span>© ${new Date().getFullYear()} Smooth By No-one · Licences 2-11-24879 et 3-11-24880</span>
        <ul>
          <li><a href="mentions-legales.html">Mentions légales</a></li>
          <li><a href="confidentialite.html">Confidentialité</a></li>
        </ul>
      </div>
    </div>
  </footer>
  <script src="assets/js/main.js?v=${V_JS}" defer></script>
</body>
</html>
`;
}

// cadrage : partie de la photo à garder visible (ex. '50% 20%' pour remonter vers les visages)
const appelFinal = (titre = 'Votre prochain événement mérite un <span class="serif">vrai</span> spectacle.', image = null, cadrage = '') => `
    <section class="appel">
      ${image
        ? `<img src="assets/img/photos/${image}.jpg" alt="" loading="lazy"${cadrage ? ` style="object-position: ${cadrage}"` : ''}>`
        : `<video class="appel-video" muted loop playsinline preload="none" aria-hidden="true"
          data-src-480="assets/video/appel-480.mp4" data-src-720="assets/video/appel-720.mp4" data-src-1080="assets/video/appel-1080.mp4"></video>`}
      <div class="wrap apparait">
        <h2 class="titre titre-l">${titre}</h2>
        <p class="chapo">Parlez-nous de votre date, de votre lieu et de votre public. On revient vers vous avec une proposition sur mesure.</p>
        <div class="appel-actions">
          ${btn('contact.html', 'Demander un devis')}
          <a class="btn btn-ligne" href="tel:${TEL_LIEN}">Appeler le ${TEL}</a>
        </div>
      </div>
    </section>`;

const bandeArtistes = () => `
    <section class="section section-serree" aria-labelledby="t-artistes">
      <div class="wrap entete-section">
        <div>
          <p class="surtitre">La troupe</p>
          <h2 class="titre titre-m" id="t-artistes">Des artistes <span class="serif">professionnels</span>, sur scène pour vous</h2>
        </div>
        <a class="lien-fleche" href="nosartistes.html">Rencontrer la troupe ${ICONES.fleche}</a>
      </div>
      <div class="artistes-bande">
        ${ARTISTES.map(([f, n, r]) => `<figure class="artiste"><div class="artiste-photo"><img src="assets/img/artistes/${f}.jpg" alt="${n}" loading="lazy"></div><figcaption><b>${n}</b><span>${r}</span></figcaption></figure>`).join('\n        ')}
      </div>
    </section>`;

const sectionClients = () => `
    <section class="section section-claire" aria-labelledby="t-clients">
      <div class="wrap">
        <div class="entete-section">
          <div>
            <p class="surtitre">Ils nous ont fait confiance</p>
            <h2 class="titre titre-m" id="t-clients">Campings, villages vacances, <span class="serif">villes</span> et événements</h2>
          </div>
        </div>
        <div class="clients">
          ${CLIENTS.map(([f, n]) => `<div class="client apparait"><img src="assets/img/clients/${f}.png" alt="${n}" loading="lazy"></div>`).join('\n          ')}
        </div>
      </div>
    </section>`;

// ---------- Pages ----------

const pages = {};

pages.index = page({
  id: 'index',
  titre: 'Smooth By No-one · Spectacles vivants clé en main dans le Sud de la France',
  description: 'Troupe itinérante du Sud de la France : spectacles originaux clé en main, créations sur mesure et performances artistiques pour campings, villes, entreprises et particuliers.',
  contenu: `
    <section class="hero">
      <div class="hero-fond" aria-hidden="true">
        <video class="hero-video" muted loop playsinline preload="metadata" poster="assets/video/accueil-affiche.jpg"
          data-src-480="assets/video/accueil-480.mp4" data-src-720="assets/video/accueil-720.mp4" data-src-1080="assets/video/accueil-1080.mp4"></video>
      </div>
      <button class="hero-pause" type="button" aria-label="Mettre la vidéo en pause" hidden>
        <svg class="i-pause" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
        <svg class="i-lecture" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5z"/></svg>
      </button>
      <div class="wrap hero-contenu">
        <p class="surtitre">Troupe itinérante · Sud de la France</p>
        <h1 class="titre titre-xl">La nouvelle ère <span class="serif">du spectacle.</span></h1>
        <div class="hero-bas">
          <p class="chapo">Des spectacles originaux, clé en main ou créés sur mesure, pour rendre votre événement inoubliable. Pour les professionnels comme pour les particuliers.</p>
          <div class="hero-actions">
            ${btn('spectacles.html', 'Découvrir les spectacles')}
            <a class="btn btn-ligne" href="contact.html">Demander un devis</a>
          </div>
        </div>
        <div class="hero-chiffres">
          <div><b>${SPECTACLES.length} spectacles</b><span>originaux, écrits par la troupe</span></div>
          <div><b>${ARTISTES.length} artistes</b><span>danseurs, chanteurs, performeurs</span></div>
          <div><b>45 à 90 min</b><span>formats adaptables</span></div>
          <div><b>100 % autonome</b><span>artistes, régie et technique</span></div>
        </div>
      </div>
    </section>

    <div class="defilant" aria-hidden="true">
      <div class="defilant-piste">
        ${Array(2).fill(['Danse', 'Chant', 'Théâtre', 'Feu', 'Pyrotechnie', 'Échassiers', 'Interaction', 'Émotion'].map(m => `<span>${m}</span>`).join('')).join('')}
      </div>
    </div>

    <section class="section section-claire" aria-labelledby="t-exp">
      <div class="wrap experience">
        <div class="experience-visuel apparait">
          <img src="assets/img/photos/troupe-or.jpg" alt="La troupe sur scène en costumes dorés" loading="lazy">
          <img src="assets/img/photos/chanteuse.jpg" alt="Chanteuse en live" loading="lazy">
        </div>
        <div class="apparait" data-delai="1">
          <p class="surtitre">L’expérience Smooth By No-one</p>
          <h2 class="titre titre-l" id="t-exp">Des spectacles qu’on <span class="serif">n’oublie pas</span></h2>
          <ul class="points">
            <li><span class="num">01</span><div><b>Des histoires originales et inattendues</b><span>Chaque spectacle raconte une vraie histoire, écrite et mise en scène par la troupe.</span></div></li>
            <li><span class="num">02</span><div><b>Le public au cœur du show</b><span>Interactions, votes en direct, surprises : les spectateurs ne restent jamais simples spectateurs.</span></div></li>
            <li><span class="num">03</span><div><b>Des artistes professionnels variés</b><span>Danseurs, chanteurs, comédiens, artistes feu et échassiers.</span></div></li>
            <li><span class="num">04</span><div><b>100 % flexible, 0 % contrainte</b><span>On arrive avec nos artistes, notre régisseur et notre technique. Tarifs adaptables.</span></div></li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="t-spectacles">
      <div class="wrap">
        <div class="entete-section">
          <div>
            <p class="surtitre">Nos spectacles</p>
            <h2 class="titre titre-l" id="t-spectacles">Choisissez votre <span class="serif">univers</span></h2>
          </div>
          <a class="lien-fleche" href="spectacles.html">Tous les spectacles ${ICONES.fleche}</a>
        </div>
        <div class="affiches">
          ${SPECTACLES.map(carteSpectacle).join('')}
          <a class="affiche apparait" data-delai="2" href="performing.html">
            <span class="affiche-visuel"><img src="assets/img/affiches/performing.jpg" alt="Affiche Performing" loading="lazy" width="1000" height="1500"><span class="affiche-fleche">${ICONES.fleche}</span></span>
            <div class="affiche-info">
              <div class="affiche-tags"><span class="tag">Sur mesure</span><span class="tag">Événementiel</span></div>
              <h3 class="titre titre-s">Performing</h3>
              <p>Danseurs, échassiers, DJ, chanteurs, artistes feu : des performances pensées comme de vrais tableaux pour vos soirées.</p>
            </div>
          </a>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0" aria-labelledby="t-focus">
      <div class="wrap">
        <div class="focus apparait">
          <img src="assets/img/photos/coeurs-feu.jpg" alt="Suit & Tie, numéro de feu sur scène" loading="lazy">
          <div class="focus-grille">
            <div>
              <p class="surtitre">Nouveauté · Suit & Tie</p>
              <h2 class="titre titre-l" id="t-focus">Et si le public décidait <span class="serif">de la fin ?</span></h2>
              <p class="chapo" style="margin:22px 0 30px">Le seul spectacle interactif à choix multiples. Votes en direct, chemins alternatifs, plusieurs fins possibles.</p>
              ${btn('suitandtie.html', 'Vivre l’expérience Suit & Tie')}
            </div>
            <div class="vote" aria-live="polite">
              <p class="vote-q">À vous de choisir</p>
              <button type="button" data-choix="A"><i>A</i><span>Suivre le maître de cérémonie</span><em></em></button>
              <button type="button" data-choix="B"><i>B</i><span>Écouter l’inconnue au masque</span><em></em></button>
              <p class="vote-merci"></p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" style="padding-top:0" aria-labelledby="t-comment">
      <div class="wrap">
        <div class="entete-section">
          <div>
            <p class="surtitre">Comment ça marche</p>
            <h2 class="titre titre-l" id="t-comment">Trois étapes. <span class="serif">On s’occupe du reste.</span></h2>
          </div>
        </div>
        <div class="etapes">
          <div class="etape apparait"><span class="etape-num">01</span><h3 class="titre titre-s">Choisissez votre spectacle</h3><p>Un spectacle de notre répertoire, une formule Performing, ou une création imaginée pour vous.</p></div>
          <div class="etape apparait" data-delai="1"><span class="etape-num">02</span><h3 class="titre titre-s">Planifiez votre événement</h3><p>Date, lieu, public, durée : on adapte le format et la technique à votre configuration.</p></div>
          <div class="etape apparait" data-delai="2"><span class="etape-num">03</span><h3 class="titre titre-s">On débarque 🔥</h3><p>Avec nos artistes, notre régisseur et notre énergie. Vous n’avez plus qu’à profiter.</p></div>
        </div>
        <div class="tout-compris apparait">
          <strong>Inclus :</strong>
          <span class="tag">Artistes professionnels</span><span class="tag">Régisseur</span><span class="tag">Son & lumière</span><span class="tag">Costumes</span><span class="tag">Effets visuels</span><span class="tag">Installation</span>
        </div>
      </div>
    </section>

    <section class="section section-claire" aria-labelledby="t-perf">
      <div class="wrap performing">
        <div class="apparait">
          <p class="surtitre">Performing</p>
          <h2 class="titre titre-l" id="t-perf">Des performances <span class="serif">sur mesure</span> pour vos soirées</h2>
          <p class="texte" style="margin-top:22px">Du cocktail à la grande soirée, nous composons des tableaux artistiques préparés en amont, au service de l’ambiance et de l’identité de votre événement. Loin d’une simple animation improvisée.</p>
          <ul class="liste-elements">
            <li>DJ & ambiance</li><li>Danseurs</li><li>Échassiers</li><li>Chant live</li><li>Manipulation de feu</li><li>Univers costumés</li>
          </ul>
          <a class="btn btn-ligne" href="performing.html">Composer votre expérience ${ICONES.fleche}</a>
        </div>
        <div class="mosaique apparait" data-delai="1">
          <img src="assets/img/photos/echassiers-led.jpg" alt="Échassiers lumineux" loading="lazy">
          <img src="assets/img/photos/feu-costume.jpg" alt="Artiste feu" loading="lazy">
          <img src="assets/img/photos/parade.jpg" alt="Parade au milieu du public" loading="lazy">
        </div>
      </div>
    </section>
${bandeArtistes()}
${sectionClients()}
${appelFinal()}`,
});

pages.spectacles = page({
  id: 'spectacles',
  titre: 'Nos spectacles · Smooth By No-one',
  description: 'Suit & Tie, Underground, Pop-Corn Show, Halloween : Sweet Dreams, Noël : la Nouvelle Équipe. Des spectacles familiaux et immersifs, clé en main.',
  image: 'assets/img/affiches/suit-and-tie.jpg',
  contenu: `
    <section class="page-hero">
      <div class="wrap">
        <p class="surtitre">Le répertoire</p>
        <h1 class="titre titre-l">Nos <span class="serif">spectacles</span></h1>
        <p class="chapo">Cinq créations originales, écrites et mises en scène par la troupe. Toutes s’adaptent à votre lieu, à votre public et à votre programmation.</p>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="wrap">
        ${SPECTACLES.map(s => `
        <article class="rangee">
          <a class="rangee-visuel apparait" href="${url(s.page)}"><img src="assets/img/affiches/${s.affiche}.jpg" alt="Affiche ${s.nomLong}" loading="lazy" width="1000" height="1500"></a>
          <div class="apparait" data-delai="1">
            <div class="affiche-tags">${s.nouveau ? '<span class="tag tag-or">Nouveau</span>' : ''}${s.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
            <h2 class="titre titre-l" style="margin-top:18px">${s.nomLong}</h2>
            <p class="fiche-accroche">${s.accroche}</p>
            <p class="texte">${s.resume}</p>
            <div class="fiche-actions">
              ${btn(url(s.page), 'Découvrir le spectacle')}
              <a class="btn btn-ligne" href="contact.html?spectacle=${s.id}">Programmer</a>
            </div>
          </div>
        </article>`).join('')}
      </div>
    </section>
${appelFinal('Une idée qui n’est pas dans le <span class="serif">répertoire ?</span>', 'troupe-rouge')}`,
});

for (const s of SPECTACLES) {
  const photos = galerieDe(s.affiche);
  const autres = SPECTACLES.filter(x => x !== s);
  pages[s.page] = page({
    id: s.page,
    titre: `${s.nomLong} · Spectacle · Smooth By No-one`,
    description: `${s.accroche} ${s.resume}`.slice(0, 158),
    image: `assets/img/affiches/${s.affiche}.jpg`,
    jsonld: {
      '@context': 'https://schema.org', '@type': 'CreativeWork', name: s.nomLong,
      description: s.resume, image: `${SITE}/assets/img/affiches/${s.affiche}.jpg`,
      creator: { '@type': 'PerformingGroup', name: 'Smooth By No-one' },
    },
    contenu: `
    <section class="fiche-hero">
      <div class="fiche-hero-fond" aria-hidden="true"><img src="assets/img/affiches/${s.affiche}.jpg" alt=""></div>
      <div class="wrap fiche-grille">
        <div class="apparait">
          <p class="surtitre">${s.saison ? `Spectacle de ${s.saison}` : 'Spectacle'}</p>
          <h1 class="titre titre-l">${s.nomLong}</h1>
          <p class="fiche-accroche">${s.accroche}</p>
          <dl class="fiche-infos">
            ${s.infos.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}
          </dl>
          <div class="fiche-actions">
            ${btn(`contact.html?spectacle=${s.id}`, 'Programmer ce spectacle')}
            <a class="btn btn-ligne" href="${s.teaser ? '#t-teaser' : '#histoire'}">${s.teaser ? 'Voir le teaser' : 'L’histoire'}</a>
          </div>
        </div>
        <div class="fiche-affiche apparait" data-delai="1"><img src="assets/img/affiches/${s.affiche}.jpg" alt="Affiche ${s.nomLong}" width="1000" height="1500" fetchpriority="high"></div>
      </div>
    </section>

${s.teaser ? `
    <section class="section section-serree" aria-labelledby="t-teaser">
      <div class="wrap">
        <div class="entete-section">
          <div>
            <p class="surtitre">Le teaser</p>
            <h2 class="titre titre-m" id="t-teaser">${s.nomLong} <span class="serif">en vidéo</span></h2>
          </div>
        </div>
        <div class="teaser apparait">
          <video class="teaser-video" controls playsinline preload="none" poster="assets/img/photos/${s.fond}.jpg"
            data-src-480="assets/video/teaser-${s.id}-480.mp4" data-src-720="assets/video/teaser-${s.id}-720.mp4" aria-label="Teaser du spectacle ${s.nomLong}"></video>
          <button class="teaser-lancer" type="button" aria-label="Lancer le teaser de ${s.nomLong}">
            <span><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5z"/></svg></span>
            Voir le teaser
          </button>
        </div>
      </div>
    </section>
` : ''}
    <section class="section" id="histoire" aria-labelledby="t-histoire">
      <div class="wrap histoire">
        <div class="histoire-cle apparait">
          <p class="surtitre">L’histoire</p>
          <h2 class="titre titre-m" id="t-histoire">${s.cle}</h2>
        </div>
        <div class="texte apparait" data-delai="1">
          ${s.histoire.map(p => `<p>${p}</p>`).join('\n          ')}
          <p>Le spectacle est <strong>entièrement adaptable</strong> : mise en scène et technique modulables selon les formats, les lieux et les contraintes de programmation.</p>
        </div>
      </div>
    </section>

    <section class="section section-serree" aria-labelledby="t-contenu">
      <div class="wrap">
        <div class="entete-section">
          <div>
            <p class="surtitre">Au programme</p>
            <h2 class="titre titre-m" id="t-contenu">Le contenu de <span class="serif">votre spectacle</span></h2>
          </div>
        </div>
        ${(() => {
          const liste = `<ul class="contenu-liste">
          ${s.contenu.map(([t, d]) => `<li class="apparait"><div><b>${t}</b><span>${d}</span></div></li>`).join('\n          ')}
        </ul>`;
          const fiche = INFOS_CLES[s.affiche];
          if (!fiche) return liste;
          const [l, h, alt] = fiche;
          const forme = l / h > 1.25 ? 'paysage' : l / h > .85 ? 'carre' : 'portrait';
          return `<div class="contenu-grille ${forme}">
          <button class="infos-visuel apparait" type="button" aria-label="Agrandir la fiche infos clés"><span class="infos-flou" style="background-image: url('assets/img/infos/${s.affiche}.jpg')" aria-hidden="true"></span><img src="assets/img/infos/${s.affiche}.jpg" alt="${alt}" width="${l}" height="${h}" loading="lazy"></button>
          ${liste}
        </div>`;
        })()}
      </div>
    </section>
${photos.length ? `
    <section class="section section-serree" aria-labelledby="t-photos">
      <div class="wrap">
        <div class="entete-section">
          <div>
            <p class="surtitre">En images</p>
            <h2 class="titre titre-m" id="t-photos">Sur scène</h2>
          </div>
        </div>
        <div class="galerie">
          ${photos.map((p, i) => `<button type="button" aria-label="Agrandir la photo ${i + 1}"><img src="${p}" alt="${s.nomLong}, photo ${i + 1}" loading="lazy"></button>`).join('\n          ')}
        </div>
      </div>
    </section>` : ''}

    <section class="section section-serree" aria-labelledby="t-autres">
      <div class="wrap">
        <div class="entete-section">
          <h2 class="titre titre-m" id="t-autres">Les autres <span class="serif">spectacles</span></h2>
          <a class="lien-fleche" href="spectacles.html">Tout le répertoire ${ICONES.fleche}</a>
        </div>
        <div class="autres">
          ${autres.map((x, i) => carteSpectacle(x, i, false)).join('')}
        </div>
      </div>
    </section>
${appelFinal(`Programmez <span class="serif">${s.nomLong}</span>`, s.appel || s.fond, s.cadrage)}`,
  });
}

pages.performing = page({
  id: 'performing',
  titre: 'Performing · Performances artistiques sur mesure · Smooth By No-one',
  description: 'Danseurs, performeurs, échassiers, DJ, chanteurs et artistes feu : des performances artistiques sur mesure pour vos cocktails, soirées et événements.',
  image: 'assets/img/affiches/performing.jpg',
  contenu: `
    <section class="page-hero">
      <div class="page-hero-fond" aria-hidden="true"><video class="fond-video" muted loop playsinline preload="none" poster="assets/img/photos/feu-chateau.jpg"
        data-src-480="assets/video/performing-480.mp4" data-src-720="assets/video/performing-720.mp4" data-src-1080="assets/video/performing-1080.mp4"></video></div>
      <div class="wrap">
        <p class="surtitre">Performing</p>
        <h1 class="titre titre-xl">Sublimez <span class="serif">votre événement.</span></h1>
        <p class="chapo">Le Performing rassemble danseurs, performeurs, échassiers, DJ, chanteurs et artistes visuels pour créer des expériences fortes, adaptées à chaque lieu, chaque public et chaque format.</p>
        <div class="fiche-actions" style="margin-top:34px">${btn('contact.html?spectacle=performing', 'Discutons de votre événement')}</div>
      </div>
    </section>

    <section class="section section-claire" aria-labelledby="t-compo">
      <div class="wrap performing">
        <div class="apparait">
          <p class="surtitre">Composez votre expérience</p>
          <h2 class="titre titre-l" id="t-compo">Des tableaux, <span class="serif">pas</span> de l’improvisation</h2>
          <p class="texte" style="margin-top:22px">Pensées comme de véritables tableaux, nos performances sont préparées en amont pour offrir un rendu maîtrisé, fluide et impactant. Du cocktail à la grande soirée, nous concevons des propositions élégantes et cohérentes, au service de l’ambiance et de l’identité de votre événement.</p>
          <p class="texte"><strong>Choisissez les éléments, on les articule entre eux</strong> pour créer une performance unique.</p>
          <ul class="liste-elements">
            <li>DJ & ambiance musicale</li><li>Danseurs et performeurs</li><li>Échassiers</li><li>Chanteurs live</li><li>Manipulation de feu</li><li>Univers et thèmes de costumes</li>
          </ul>
        </div>
        <div class="mosaique apparait" data-delai="1">
          <img src="assets/img/photos/gatsby.jpg" alt="Performeurs en costumes années folles" loading="lazy">
          <img src="assets/img/photos/echassiers-led.jpg" alt="Échassiers lumineux" loading="lazy">
          <img src="assets/img/photos/feu-costume.jpg" alt="Artiste feu" loading="lazy">
        </div>
      </div>
    </section>

    <section class="section" aria-labelledby="t-occasions">
      <div class="wrap">
        <div class="entete-section">
          <div>
            <p class="surtitre">Pour chaque occasion</p>
            <h2 class="titre titre-l" id="t-occasions">Adaptées à <span class="serif">votre</span> événement</h2>
          </div>
          <p class="texte" style="max-width:44ch">Accompagner un cocktail, rythmer une soirée DJ, marquer un moment clé ou installer une ambiance immersive sur la durée : chaque performance suit l’univers, le public et le rythme de votre projet.</p>
        </div>
        <ul class="contenu-liste">
          <li class="apparait"><div><b>Halloween & Noël</b><span>Des univers saisonniers forts, en déambulation ou en tableaux.</span></div></li>
          <li class="apparait"><div><b>Soirées d’été</b><span>Animations de village vacances, fêtes locales, soirées en plein air.</span></div></li>
          <li class="apparait"><div><b>Événements d’entreprise</b><span>Cocktails, galas, séminaires, lancements de produit.</span></div></li>
          <li class="apparait"><div><b>Soirées thématiques</b><span>Saint-Valentin, années folles, carnaval… on habille votre thème.</span></div></li>
        </ul>
      </div>
    </section>

    <section class="section section-serree">
      <div class="wrap">
        <div class="galerie">
          ${['feu-chateau', 'parade', 'troupe-rouge', 'groupe-or', 'feu-lumieres', 'voile-blanc', 'costumes-blancs', 'danseuses-jaunes'].map((p, i) => `<button type="button" aria-label="Agrandir la photo ${i + 1}"><img src="assets/img/photos/${p}.jpg" alt="Performing Smooth By No-one, photo ${i + 1}" loading="lazy"></button>`).join('\n          ')}
        </div>
      </div>
    </section>
${appelFinal('Vivez l’expérience <span class="serif">Performing</span>', 'parade')}`,
});

pages.nosartistes = page({
  id: 'nosartistes',
  titre: 'Les artistes · Smooth By No-one',
  description: `Rencontrez les ${ARTISTES.length} artistes de Smooth By No-one : danseurs, chanteurs, comédiens et artistes feu professionnels.`,
  image: 'assets/img/photos/saut-groupe.jpg',
  contenu: `
    <section class="page-hero">
      <div class="page-hero-fond" aria-hidden="true"><img src="assets/img/photos/saut-groupe.jpg" alt=""></div>
      <div class="wrap">
        <p class="surtitre">La troupe</p>
        <h1 class="titre titre-xl">Les <span class="serif">artistes</span></h1>
        <p class="chapo">Danseurs, chanteurs, comédiens, artistes feu : ${ARTISTES.length} professionnels réunis par la même envie de raconter des histoires sur scène.</p>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="wrap">
        <div class="fondateurs">
          ${ARTISTES.slice(0, 2).map(([f, n, r]) => `<figure class="artiste apparait"><div class="artiste-photo"><img src="assets/img/artistes/${f}.jpg" alt="${n}" loading="lazy"></div><figcaption><b>${n}</b><span>${r}</span></figcaption></figure>`).join('')}
        </div>
        <div class="grille-artistes">
          ${ARTISTES.slice(2).map(([f, n, r], i) => `<figure class="artiste apparait" data-delai="${i % 4}"><div class="artiste-photo"><img src="assets/img/artistes/${f}.jpg" alt="${n}" loading="lazy"></div><figcaption><b>${n}</b><span>${r}</span></figcaption></figure>`).join('\n          ')}
        </div>
      </div>
    </section>
${appelFinal('Envie de les voir <span class="serif">sur votre scène ?</span>', 'groupe-rouge')}`,
});

const photosGalerie = ['feu-lumieres', 'voile-blanc', 'costumes-blancs', 'masques', 'danseuses-jaunes', 'trio-bleu', 'voile-rose', 'breakdance', 'trio-rouge', 'echassiers-led', 'chanteuse', 'feu-nb', 'duo-jaune', 'fumee', 'pyro', 'danseuse-nb', 'groupe-rouge', 'noel-rennes', 'plage', 'feu-chateau', 'parade', 'troupe-rouge', 'gatsby', 'groupe-or', 'coeurs-feu', 'scene-violette', 'duo-rouge', 'trio-masques', 'troupe-or', 'saut-groupe'];
pages.galerie = page({
  id: 'galerie',
  titre: 'Galerie photos et vidéos · Smooth By No-one',
  description: 'Les plus belles images de nos spectacles et performances : danse, feu, pyrotechnie, costumes et émotions.',
  contenu: `
    <section class="page-hero">
      <div class="wrap">
        <p class="surtitre">Galerie</p>
        <h1 class="titre titre-xl">En <span class="serif">images</span></h1>
        <p class="chapo">Quelques instants volés sur scène, en coulisses et au milieu du public. Retrouvez nos vidéos sur YouTube et nos coulisses sur Instagram.</p>
        <div class="fiche-actions" style="margin-top:30px">
          <a class="btn" href="${RESEAUX.youtube}" target="_blank" rel="noopener">${ICONES.youtube} Nos vidéos</a>
          <a class="btn btn-ligne" href="${RESEAUX.instagram}" target="_blank" rel="noopener">${ICONES.instagram} Instagram</a>
        </div>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="wrap">
        <div class="galerie">
          ${photosGalerie.map((p, i) => `<button type="button" aria-label="Agrandir la photo ${i + 1}"><img src="assets/img/photos/${p}.jpg" alt="Smooth By No-one, photo ${i + 1}" loading="lazy"></button>`).join('\n          ')}
        </div>
      </div>
    </section>
${appelFinal()}`,
});

pages.contact = page({
  id: 'contact',
  titre: 'Contact et devis · Smooth By No-one',
  description: `Demandez un devis pour un spectacle ou une performance. Réponse rapide, tarifs adaptables. ${TEL} · ${MAIL}`,
  contenu: `
    <section class="page-hero" style="padding-bottom:40px">
      <div class="wrap">
        <p class="surtitre">Contact</p>
        <h1 class="titre titre-xl">Parlons de <span class="serif">votre date.</span></h1>
      </div>
    </section>
    <section class="section" style="padding-top:0">
      <div class="wrap contact-grille">
        <div class="apparait">
          <p class="chapo">Un spectacle du répertoire, une performance pour votre soirée ou une création sur mesure ? Dites-nous tout, on vous répond rapidement avec une proposition adaptée.</p>
          <ul class="coordonnees">
            <li><small>Téléphone</small><a href="tel:${TEL_LIEN}">${TEL}</a></li>
            <li><small>E-mail</small><a href="mailto:${MAIL}">${MAIL}</a></li>
            <li><small>Basés à</small><span style="font-size:19px;font-weight:600">Mauguio, Hérault</span><br><span class="texte">En tournée dans tout le Sud de la France</span></li>
          </ul>
          <div class="reseaux" style="margin-top:28px">
            <a href="${RESEAUX.instagram}" aria-label="Instagram" target="_blank" rel="noopener">${ICONES.instagram}</a>
            <a href="${RESEAUX.facebook}" aria-label="Facebook" target="_blank" rel="noopener">${ICONES.facebook}</a>
            <a href="${RESEAUX.youtube}" aria-label="YouTube" target="_blank" rel="noopener">${ICONES.youtube}</a>
          </div>
        </div>
        <form class="formulaire apparait" data-delai="1" name="contact" method="POST" action="merci.html" data-netlify="true" netlify-honeypot="site-web">
          <input type="hidden" name="form-name" value="contact">
          <p class="sr"><label>Ne pas remplir <input name="site-web"></label></p>
          <div class="champs">
            <div class="champ champ-large">
              <label>Vous êtes <i>*</i></label>
              <div class="pastilles" role="radiogroup">
                ${['Camping / village vacances', 'Mairie / collectivité', 'Entreprise / CSE', 'Particulier', 'Autre'].map((v, i) => `<label><input type="radio" name="profil" value="${v}" ${i === 0 ? 'required' : ''}><span>${v}</span></label>`).join('\n                ')}
              </div>
            </div>
            <div class="champ"><label for="prenom">Prénom <i>*</i></label><input id="prenom" name="prenom" autocomplete="given-name" required></div>
            <div class="champ"><label for="nom">Nom <i>*</i></label><input id="nom" name="nom" autocomplete="family-name" required></div>
            <div class="champ"><label for="email">E-mail <i>*</i></label><input id="email" name="email" type="email" autocomplete="email" required></div>
            <div class="champ"><label for="tel">Téléphone</label><input id="tel" name="telephone" type="tel" autocomplete="tel"></div>
            <div class="champ champ-large"><label for="structure">Établissement ou entreprise</label><input id="structure" name="structure" autocomplete="organization"></div>
            <div class="champ">
              <label for="spectacle">Ce qui vous intéresse</label>
              <select id="spectacle" name="spectacle">
                <option value="">Je ne sais pas encore</option>
                ${SPECTACLES.map(s => `<option value="${s.id}">${s.nomLong}</option>`).join('\n                ')}
                <option value="performing">Performing (sur mesure)</option>
                <option value="creation">Création sur mesure</option>
              </select>
            </div>
            <div class="champ"><label for="date">Date envisagée</label><input id="date" name="date" type="date"></div>
            <div class="champ champ-large"><label for="lieu">Ville ou lieu de l’événement</label><input id="lieu" name="lieu"></div>
            <div class="champ champ-large"><label for="message">Votre projet <i>*</i></label><textarea id="message" name="message" required placeholder="Nombre de spectateurs, type d’événement, intérieur ou extérieur…"></textarea></div>
          </div>
          <button class="btn" type="submit">Envoyer ma demande ${ICONES.fleche}</button>
          <p class="mention">Vos informations servent uniquement à répondre à votre demande. <a href="confidentialite.html">Confidentialité</a></p>
        </form>
      </div>
    </section>`,
});

pages.merci = page({
  id: 'merci',
  titre: 'Merci · Smooth By No-one',
  description: 'Votre demande a bien été envoyée.',
  contenu: `
    <section class="page-hero" style="min-height:80svh;display:flex;align-items:center">
      <div class="page-hero-fond" aria-hidden="true"><img src="assets/img/photos/pyro.jpg" alt=""></div>
      <div class="wrap">
        <p class="surtitre">Demande envoyée</p>
        <h1 class="titre titre-xl">Merci, <span class="serif">c’est noté !</span></h1>
        <p class="chapo">Nous revenons vers vous très vite. En attendant, jetez un œil à nos spectacles.</p>
        <div class="fiche-actions" style="margin-top:32px">${btn('spectacles.html', 'Voir les spectacles')}<a class="btn btn-ligne" href="./">Retour à l’accueil</a></div>
      </div>
    </section>`,
});

pages['mentions-legales'] = page({
  id: 'mentions-legales',
  titre: 'Mentions légales · Smooth By No-one',
  description: 'Mentions légales du site Smooth By No-one.',
  contenu: `
    <section class="page-hero" style="padding-bottom:20px"><div class="wrap"><h1 class="titre titre-l">Mentions <span class="serif">légales</span></h1></div></section>
    <section class="section" style="padding-top:20px"><div class="wrap legal">
      <h2>Éditeur du site</h2>
      <dl>
        <dt>Raison sociale</dt><dd>Smooth by No-one</dd>
        <dt>Siège social</dt><dd>48 rue du Mistral, 34130 Mauguio, France</dd>
        <dt>SIRET</dt><dd>851 758 086 00025</dd>
        <dt>Code APE</dt><dd>9001 Z · Arts du spectacle vivant</dd>
        <dt>TVA intracommunautaire</dt><dd>FR69851758086</dd>
        <dt>Licences d’entrepreneur de spectacles</dt><dd>Licence 2 : 2-11-24879 · Licence 3 : 3-11-24880</dd>
        <dt>Responsable de publication</dt><dd>Smooth by No-one</dd>
        <dt>Contact</dt><dd><a href="mailto:${MAIL}">${MAIL}</a> · <a href="tel:${TEL_LIEN}">${TEL}</a></dd>
      </dl>
      <h2>Hébergement</h2>
      <p>Netlify, Inc. · 512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis · netlify.com</p>
      <h2>Propriété intellectuelle</h2>
      <p>L’ensemble du contenu de ce site (textes, images, logos, vidéos, affiches) est protégé par le droit de la propriété intellectuelle et reste la propriété exclusive de Smooth by No-one, sauf mention contraire. Toute reproduction, représentation, modification ou exploitation, partielle ou totale, sans autorisation écrite préalable est interdite.</p>
      <h2>Responsabilité</h2>
      <p>Smooth by No-one met tout en œuvre pour fournir des informations fiables et à jour, sans pouvoir garantir leur exactitude ou leur exhaustivité. L’utilisation des informations du site se fait sous la seule responsabilité de l’utilisateur.</p>
    </div></section>`,
});

pages.confidentialite = page({
  id: 'confidentialite',
  titre: 'Politique de confidentialité · Smooth By No-one',
  description: 'Comment Smooth By No-one utilise les données transmises via le site.',
  contenu: `
    <section class="page-hero" style="padding-bottom:20px"><div class="wrap"><h1 class="titre titre-l">Politique de <span class="serif">confidentialité</span></h1></div></section>
    <section class="section" style="padding-top:20px"><div class="wrap legal">
      <h2>Données collectées</h2>
      <p>Lorsque vous utilisez le formulaire de contact, nous recevons les informations que vous saisissez : nom, prénom, e-mail, téléphone, établissement et détails de votre projet. Aucune donnée de paiement n’est collectée sur ce site.</p>
      <h2>Utilisation</h2>
      <p>Ces informations servent uniquement à répondre à votre demande et à préparer une proposition. Elles ne sont ni vendues ni cédées à des tiers.</p>
      <h2>Conservation et hébergement</h2>
      <p>Les messages du formulaire sont transmis par notre hébergeur (Netlify) et conservés le temps nécessaire au traitement de votre demande et au suivi de la relation commerciale.</p>
      <h2>Vos droits</h2>
      <p>Conformément au RGPD, vous pouvez accéder à vos données, les rectifier ou en demander la suppression en écrivant à <a href="mailto:${MAIL}">${MAIL}</a>.</p>
    </div></section>`,
});

for (const [nom, html] of Object.entries(pages)) writeFileSync(`${nom}.html`, html);

const indexables = Object.keys(pages).filter(p => p !== 'merci');
writeFileSync('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexables.map(p => `  <url><loc>${canon(p)}</loc></url>`).join('\n')}
</urlset>
`);
console.log(`${Object.keys(pages).length} pages générées.`);
