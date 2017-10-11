const http2 = require('http2');
const proxy = require('http2-proxy');

const server = http2.createServer({ allowHTTP1: true });
server.listen(9000);

server.on('request', (req, res) => {
    proxy.web(req, res, { hostname: 'localhost', port: 50051 });
});
