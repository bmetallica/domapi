🇫🇷 Sélection de la langue : [Deutsch](README.md) | [English](README_en.md) | [Français](README_fr.md)

# 🧭 Proxy de Compatibilité JSON Domoticz

Un proxy inverse léger pour [Domoticz](https://www.domoticz.com/) qui traduit automatiquement les anciens appels d'API JSON vers la nouvelle syntaxe API.

---

## ✨ Pourquoi ?

Domoticz a modifié de nombreux anciens points d'API, tels que `?type=devices` ou `?type=users`, en de nouvelles commandes comme `?type=command&param=getdevices`. Cet outil traduit automatiquement les anciens appels JSON à la volée – idéal pour les anciens frontends, scripts ou intégrations comme Alhua.com etc.

---

## 🛠️ Fonctionnalités

- ✅ Proxy inverse vers votre instance Domoticz réelle
- 🔁 Réécriture automatique des anciennes requêtes `/json.htm?type=XYZ`
- ⚙️ Personnalisable via des variables d'environnement
- 💥 Retour à un proxy pass normal pour tout autre contenu
- 🐧 Fonctionne comme un service systemd sous Linux

---

## 🔁 Mappage de Compatibilité

| Ancien (type=…) | Nouveau (param=…) |
|---|---|
| settings | getsettings |
| users | getusers |
| devices | getdevices |
| hardware | gethardware |
| events | events |
| notifications | getnotifications |
| createdevice | createdevice |
| scenes | getscenes |
| plans | getplans |
| graph | graph |
| scenelog | getscenelog |
| mobiles | getmobiles |
| cameras | getcameras |
| cameras_user | getcameras_user |
| schedules | getschedules |
| timers | gettimers |
| scenetimers | getscenetimers |
| setpointtimers | getsetpointtimers |
| floorplans | getfloorplans |
| lightlog | getlightlog |
| textlog | gettextlog |
| setused | setused |

---

## 🚀 Démarrage Rapide

### Prérequis

- Node.js (v18 ou plus récent recommandé)
- Instance Domoticz sur votre réseau

### Installation

```bash
cd /opt/
git clone [https://github.com/bmetallica/domapi.git](https://github.com/bmetallica/domapi.git)
cd domapi
npm init -y
npm i express http-proxy-middleware morgan
nano service/domapi.service # !!!-Ajustez l'IP et le PORT de Domoticz ici-!!!
cp service/domapi.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now domapi.service
```

---
### Fonctionnement
Après le démarrage de l'application Node.js, le proxy écoute sur le port 8089 et traduit toutes les requêtes entrantes.
