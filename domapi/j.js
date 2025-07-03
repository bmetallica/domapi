const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const morgan = require('morgan');
const url = require('url');

const app = express();

const domoticzTarget = process.env.TARGET || 'http://localhost:8080';
const proxyPath = '/json.htm';

const compatMap = {
  'settings': 'getsettings',
  'users': 'getusers',
  'devices': 'getdevices',
  'hardware': 'gethardware',
  'events': 'events',
  'notifications': 'getnotifications',
  'createdevice': 'createdevice',
  'scenes': 'getscenes',
  'plans': 'getplans',
  'graph': 'graph',
  'scenelog': 'getscenelog',
  'mobiles': 'getmobiles',
  'cameras': 'getcameras',
  'cameras_user': 'getcameras_user',
  'schedules': 'getschedules',
  'timers': 'gettimers',
  'scenetimers': 'getscenetimers',
  'setpointtimers': 'getsetpointtimers',
  'floorplans': 'getfloorplans',
  'lightlog': 'getlightlog',
  'textlog': 'gettextlog',
  'setused': 'setused'
};

// Logge alle Requests
app.use(morgan('combined'));

// Middleware zum Umschreiben der JSON-Kompatibilitätsbefehle
app.use((req, res, next) => {
  if (req.url.startsWith('/json.htm')) {
    const parsed = url.parse(req.url, true);
    const query = parsed.query;

    const oldType = query.type;

    if (compatMap[oldType]) {
      query.type = 'command';
      query.param = compatMap[oldType];

      // Rekonstruiere die URL
      const newQueryString = new url.URLSearchParams(query).toString();
      req.url = '/json.htm?' + newQueryString;
      console.log(`[rewrite] ${parsed.path} -> ${req.url}`);
    }
  }

  next();
});

// Proxy an Domoticz-Backend
app.use('/', createProxyMiddleware({
  target: domoticzTarget,
  changeOrigin: true,
  ws: true,
  logLevel: 'warn'
}));

const port = process.env.PORT || 8122;
app.listen(port, () => {
  console.log(`✅ Domoticz compat proxy läuft auf Port ${port}`);
});
