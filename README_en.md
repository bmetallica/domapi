🇬🇧 Language Selection: 
[Deutsch](README.md) | [English](README_en.md) | [Français](README_fr.md)

# 🧭 Domoticz JSON Compatibility Proxy

A lightweight reverse proxy for [Domoticz](https://www.domoticz.com/) that automatically translates old JSON API calls into the new API syntax.

---

## ✨ Why?

Domoticz has changed many old API endpoints, such as `?type=devices` or `?type=users`, to newer commands like `?type=command&param=getdevices`. This tool automatically translates old JSON calls on-the-fly – ideal for legacy frontends, scripts, or integrations like Alhua.com etc.

---

## 🛠️ Features

- ✅ Reverse proxy to your actual Domoticz instance
- 🔁 Automatic rewriting of old `/json.htm?type=XYZ` requests
- ⚙️ Customizable via environment variables
- 💥 Fallback to normal proxy pass for all other content
- 🐧 Runs as a systemd service on Linux

---

## 🔁 Compatibility Mapping

| Old (type=…) | New (param=…) |
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

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or newer recommended)
- Domoticz instance on your network

### Installation

```bash
cd /opt/
git clone [https://github.com/bmetallica/domapi.git](https://github.com/bmetallica/domapi.git)
cd domapi
npm init -y
npm i express http-proxy-middleware morgan
nano service/domapi.service # !!!-Adjust DOMOTICZ-IP and PORT here-!!!
cp service/domapi.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now domapi.service
```
---
### Functionality
After starting the Node.js application, the proxy listens on port 8089 and translates all incoming requests.
