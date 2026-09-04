const test = require('node:test');
const assert = require('node:assert');
const http = require('node:http');
const app = require('./app');

test('GET /api/health returns 200 OK', async (t) => {
  // Start server on an ephemeral port
  const server = app.listen(0);
  const port = server.address().port;

  await new Promise((resolve, reject) => {
    http.get(`http://localhost:${port}/api/health`, (res) => {
      assert.strictEqual(res.statusCode, 200);
      assert.strictEqual(res.headers['content-type'], 'application/json; charset=utf-8');

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const json = JSON.parse(data);
        assert.strictEqual(json.status, 'ok');
        server.close();
        resolve();
      });
    }).on('error', (err) => {
      server.close();
      reject(err);
    });
  });
});

test('Unknown route returns 404', async (t) => {
  const server = app.listen(0);
  const port = server.address().port;

  await new Promise((resolve, reject) => {
    http.get(`http://localhost:${port}/api/unknown`, (res) => {
      assert.strictEqual(res.statusCode, 404);
      server.close();
      resolve();
    }).on('error', (err) => {
      server.close();
      reject(err);
    });
  });
});
