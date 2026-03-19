const http = require('http');

const server = http.createServer((req, res) => {
  res.write('Hello App Service!');
  res.end();
});

server.listen(3000);