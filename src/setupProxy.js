/**
 * Pistää välitin palvelimen
 * pystyyn. Mahdollistaa kutsumisen
 * localhost:3000:een. /api pääte ohjaa
 * localhost:3001:een.
 */

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3001',
      changeOrigin: true,
    })
  );
};
