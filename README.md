# Smooth By No-one, nouveau site

Refonte complète de smoothbynoone.com (actuellement sur Wix), en site statique prêt pour Netlify.

## Travailler dessus

```
node build.mjs          # régénère toutes les pages .html à partir des données
node serveur-local.mjs  # aperçu sur http://localhost:8765
```

Tout le contenu (spectacles, artistes, clients, coordonnées) est en haut de `build.mjs`.
On modifie là, on relance `node build.mjs`. Les fichiers `.html` sont générés : ne pas les éditer à la main.

| Fichier | Rôle |
|---|---|
| `build.mjs` | Données + gabarits de toutes les pages |
| `assets/css/style.css` | Feuille de style unique |
| `assets/js/main.js` | Menu mobile, diaporama, apparitions, vote Suit & Tie, visionneuse |
| `assets/img/` | Visuels rapatriés depuis l'ancien site |
| `assets/video/` | Vidéo d'accueil (reprise de l'ancien site) en 480p, 720p et 1080p : le site choisit selon l'écran |
| `recuperer-images.sh`, `galeries.txt` | Script qui a rapatrié les images depuis le CDN Wix |
| `_redirects` | Anciennes adresses Wix redirigées vers les nouvelles |

## Pages

Accueil, Spectacles, 5 fiches spectacle (mêmes adresses qu'avant : `/suitandtie`, `/underground`,
`/pop-corn`, `/halloween`, Noël en `/noel-la-nouvelle-equipe` avec redirection de l'ancienne),
Performing, Les artistes, Galerie, Contact, Merci, Mentions légales, Confidentialité.

## Formulaire de contact

Géré par Netlify Forms (`data-netlify="true"`) : les demandes arrivent dans l'onglet *Forms*
du site Netlify, avec notification e-mail à activer dans les réglages.

## À faire avant la mise en ligne

- Relire les textes et rôles des artistes
- Ajouter de vrais avis clients (l'ancien site avait une section « Ce qu'on pense de nous »)
- Brancher le domaine smoothbynoone.com sur Netlify une fois le site validé
