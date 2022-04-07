import http from 'http';
import router from './routes/router.js';
const hostname = 'localhost';
const port = '8080';

const server = http.createServer(router);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});