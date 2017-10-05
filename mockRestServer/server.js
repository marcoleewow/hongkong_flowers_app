// server.js

const path = require('path');
// eslint-disable-next-line
const jsonServer = require('json-server');

const PORT = 8000;

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

// return prediction results
server.post('/predictions', (req, res) => {
  res.jsonp({
    predictions: [
      {
        name: 'Rose',
        probability: 0.96,
      }, {
        name: 'Lily',
        probability: 0.12,
      },
    ],
  });
});
server.use(middlewares);
server.use(router);

server.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`JSON Server is running on PORT: ${PORT}`);
});
