#!/bin/bash
# Rapatrie les visuels depuis le CDN Wix de l'ancien site (à lancer une seule fois).
cd "$(dirname "$0")/assets/img"
W="https://static.wixstatic.com/media"
get(){ curl -sf -o "$1" "$W/$2/v1/fit/$3/x.${1##*.}" || echo "ÉCHEC $1"; }
# Logo
get logo-blanc.png 87a2c5_1529484b750f4af4819417cffd4792fe~mv2.png w_900,h_400
# Affiches
P=w_1000,h_1500,q_82
get affiches/underground.jpg 303ed0_ca46b9b3c8e342d094f9b56cfb01b39b~mv2.png $P
get affiches/suit-and-tie.jpg 303ed0_e990ce0cfe8d4455a1b89bab06d53ee7~mv2.png $P
get affiches/pop-corn.jpg 303ed0_e8092f8cf80945e38a1e0d775bf5e24b~mv2.png $P
get affiches/noel.jpg 303ed0_19450a572f4243d699f022f2054ae583~mv2.jpg $P
get affiches/halloween.jpg 303ed0_8da3e361c59548d4acd0c4ca7bf949a5~mv2.png $P
get affiches/performing.jpg 303ed0_4bd22bd04cc04d01bad4b4bcac22dd91~mv2.png $P
# Photos de scène
F=w_1800,h_1800,q_80
while read n id; do get "photos/$n.jpg" "$id" $F & done <<'L'
voile-blanc 303ed0_6b3b897ec7a6496fbc05e753ae25183e~mv2.jpeg
costumes-blancs 303ed0_c456cf8fb05b490897cd2b3cde714a87~mv2.png
feu-lumieres 303ed0_2607cbc917d74da69fa353729a0aa683~mv2.jpeg
noel-rennes 303ed0_d92265d39209485184c117eeb673c334~mv2.jpeg
masques 87a2c5_a65603b2af214acd83ca22d1020b58da~mv2.jpg
danseuses-jaunes 303ed0_af225ac045ec47db97e256205a7c128b~mv2.png
trio-bleu 87a2c5_5d712079366d494cb7542c4be2f2eeef~mv2.jpg
voile-rose 303ed0_43fbe959b6594b79ba1a6b824683632b~mv2.png
breakdance 87a2c5_f7e7de0be5f14a78b4d58aad743cfbaa~mv2.jpg
trio-rouge 87a2c5_0582c4096aa64e8592ac226ac155a5f8~mv2.jpeg
echassiers-led 303ed0_acf99e47e99a4fcca9f46143f3f2cff9~mv2.png
chanteuse 87a2c5_1782ee56a5124505864e28116c2cc561~mv2.jpeg
feu-nb 87a2c5_f5d96789922c479b8cce7c1b56794d5c~mv2.jpg
duo-jaune 87a2c5_700ea567eef6422fa4aeff09e81838f6~mv2.jpeg
fumee 87a2c5_56fe3d115130423398a0a5377b98eed4~mv2.jpg
pyro 87a2c5_3eab555b9f5a4caa9db2949c6f0dee47~mv2.jpg
danseuse-nb 87a2c5_80ac437cceb7406797c028fef5f45189~mv2.jpeg
groupe-rouge 303ed0_84fc49d289574c39b53651b49b2a142f~mv2.png
plage 87a2c5_9218c91381f6486f96b601f90a0e9347~mv2.jpg
feu-chateau 303ed0_5299e8f8a128498cbf9a4868df6ea7e4~mv2.jpeg
feu-costume 303ed0_a8733fda6380413aa17e6dcf7543ffe4~mv2.jpg
parade 303ed0_86330f108b6348b8a517db680df693b7~mv2.jpeg
troupe-rouge 303ed0_16e1c8c1c3944374b446588d096c86e7~mv2.jpg
gatsby 303ed0_9fb1207cf34e4dcca34b48da6e8904a6~mv2.jpg
groupe-or 303ed0_c9e26dad999f41ccbdecd6b2f34f21c7~mv2.jpg
coeurs-feu 87a2c5_9da07698a3aa4b99b97ae5a3dd1823e8~mv2.jpg
scene-violette 87a2c5_e6112ee0ed454f8095acd25e865dab95~mv2.jpg
duo-rouge 303ed0_080dfa7c1b884148ab56b234a3b93bc4~mv2.jpg
trio-masques 87a2c5_c62a71a77337457590a0d8824b97da9e~mv2.jpg
troupe-or 87a2c5_cf9672a053344407b423d2ef57f8ee33~mv2.jpg
saut-groupe 87a2c5_42c768275df443d29e7a01f0e6fe1c06~mv2.jpg
L
wait
# Artistes
A=w_800,h_1000,q_80
while read n id; do get "artistes/$n.jpg" "$id" $A & done <<'L'
john 87a2c5_52bfda2b254d4fbaa85390e3f45bfe2f~mv2.webp
jonathan 87a2c5_d278114bdbae4c30aa6aaf7c92800016~mv2.webp
barbie 87a2c5_c343dcccbdfc49d1966bac2f64600c0d~mv2.webp
volka 87a2c5_83eb6bbe5bde430e94412a591588818e~mv2.webp
anais 87a2c5_9a77dc3a70a8468e9a1fc326ab464da3~mv2.jpg
lison 87a2c5_cac8f63134504160851df3739b214300~mv2.jpg
thibaut 303ed0_58570a90c93d4377928750e7205a85f3~mv2.jpg
kevin 303ed0_8cd22a5d519348c29d2ce5810a440aaa~mv2.jpg
leo 87a2c5_a03134b7bbfe465499e1214e11e6ba39~mv2.jpg
julie 87a2c5_970e3582264e48b29f817825bb655e24~mv2.jpg
mathilde 87a2c5_fe36d808af804c0eac35b6cc3da5808d~mv2.png
samantha 87a2c5_6dc15ddcd07e44eb9ed1e5f17bc75a0e~mv2.jpg
pauline 87a2c5_cdaafff5a2b84c5f83b40b4250a8b753~mv2.jpeg
izayo 303ed0_a69d47d160e145df9b8a018acbb83c2c~mv2.jpg
marine 303ed0_fd2379460bc84b88a9495a6eeaf740a2~mv2.jpg
mario 303ed0_dbf795bbeeaa41f5871865e723ad7212~mv2.jpg
maude 303ed0_87e36233d3e147cdb449ddff73cdd92f~mv2.jpg
morgan 303ed0_c20f4bc490af45be9f0294df74a16a63~mv2.jpg
elektra 303ed0_72edf0109c5c420c9808880b5a283c08~mv2.jpg
L
wait
# Clients (PNG pour garder la transparence)
C=w_400,h_240
while read n id; do get "clients/$n.png" "$id" $C & done <<'L'
sandaya 87a2c5_fe0ddff6fb834dc2b1fb706577c4bb0b~mv2.png
yelloh-village 87a2c5_70a7bfa674e74d6b8dee516c12d87db5~mv2.png
la-grande-motte 87a2c5_ec7173943b3047ee82bdaab3f4eb1301~mv2.png
marvilla-parks 87a2c5_6289d53d847f4a7c9a3d8ff56cc641b7~mv2.png
azureva 87a2c5_6d26989c635f457e97371caa3ae36cb3~mv2.png
villeneuve-lez-avignon 87a2c5_e521860aa105477181f5a2ee2cd4fe0e~mv2.png
ternelia 87a2c5_3433647d15e0442184931099e8042208~mv2.png
camping-paradis 303ed0_6bf42f11a70b48bab00d9db41e72fce2~mv2.png
saint-bres 303ed0_e5bf93ece6dd4403a128c17a4a7f4660~mv2.jpg
crets-en-belledonne 303ed0_b946125e017241c99944a3db71bbbc5d~mv2.png
homair 303ed0_93428f370e91419fa2536d4435ae85eb~mv2.png
mileade 303ed0_5ba2fc75745742d1b368aa059c73866e~mv2.png
capfun 303ed0_9b96117c04e349a5b890f2d7a4908d69~mv2.png
marche-du-lez 303ed0_3ded17dc9a694bfbb11b996606e70942~mv2.jpg
L
wait
# Galeries par spectacle (liste dans galeries.txt : dossier, numéro, identifiant Wix)
cd "$(dirname "$0")/assets/img"
while read d n id; do mkdir -p "spectacles/$d"; get "spectacles/$d/$n.jpg" "$id" w_1400,h_1400,q_80 & done < ../../galeries.txt
wait
