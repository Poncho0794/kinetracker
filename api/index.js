const bundle = require('../dist/apps/kinetracker-api/main.js');
const handler = bundle.default || bundle;

module.exports = async (req, res) => {
  // Ensure req.url matches NestJS globalPrefix 'api'
  if (req.url && !req.url.startsWith('/api')) {
    req.url = '/api' + (req.url === '/' ? '' : req.url);
  }
  return handler(req, res);
};
