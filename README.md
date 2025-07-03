# 🧭 Domoticz JSON Compatibility Proxy

Ein schlanker Reverse-Proxy für [Domoticz](https://www.domoticz.com/), der alte JSON-API-Aufrufe automatisch in die neue API-Syntax übersetzt.

## ✨ Warum?

Domoticz hat viele alte API-Endpunkte wie `?type=devices` oder `?type=users` in neuere Kommandos wie `?type=command&param=getdevices` geändert. Dieses Tool übersetzt alte JSON-Aufrufe automatisch on-the-fly – ideal für alte Frontends, Skripte oder Integrationen wie z.B. Alhua.com etc..

---

## 🛠️ Funktionen

- ✅ Reverse-Proxy zu deiner echten Domoticz-Instanz
- 🔁 Automatische Umschreibung alter `/json.htm?type=XYZ`-Requests
- ⚙️ Anpassbar über Umgebungsvariablen
- 💥 Fallback zu normalem Proxy-Pass für alle anderen Inhalte
- 🐧 Läuft als systemd-Dienst unter Linux

---

## 🔁 Kompatibilitäts-Mapping

| Alt (type=…)     | Neu (param=…)          |
|------------------|------------------------|
| settings         | getsettings            |
| users            | getusers               |
| devices          | getdevices             |
| hardware         | gethardware            |
| events           | events                 |
| notifications    | getnotifications       |
| createdevice     | createdevice           |
| scenes           | getscenes              |
| plans            | getplans               |
| graph            | graph                  |
| scenelog         | getscenelog            |
| mobiles          | getmobiles             |
| cameras          | getcameras             |
| cameras_user     | getcameras_user        |
| schedules        | getschedules           |
| timers           | gettimers              |
| scenetimers      | getscenetimers         |
| setpointtimers   | getsetpointtimers      |
| floorplans       | getfloorplans          |
| lightlog         | getlightlog            |
| textlog          | gettextlog             |
| setused          | setused                |

---

## 🚀 Schnellstart

### Voraussetzungen

- Node.js (v18 oder neuer empfohlen)
- Domoticz-Instanz im Netzwerk

### Installation

```
cd /opt/ 
git clone https://github.com/bmetallica/domapi.git
cd domapi
npm init -y
npm i express http-proxy-middleware morgan 
nano service/domapi.service !!!-Hier die DOMOTICZ-IP und den PORT anpassen-!!!
cp service/domapi.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now domapi.service
```


### Funktion
Nach dem starten der NodeJs Anwendung hört der Proxy auf Port 8089 und übersetzt alle dort ankommenden Anfragen.
