import next from 'next';
import { createServer } from 'http';

// init next
const app = next(__dirname)
const handle = app.getRequestHandler()

// init normal http server
// createServer(handle).listen(process.env.PORT || 3000)



// Create a local server to receive data from
const server = createServer((req, res) => {
    res.removeHeader('Transfer-Encoding');
    handle(req, res)
});

server.listen(process.env.PORT || 3000);