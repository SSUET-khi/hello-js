const http = require('http');
const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

// We only listen if this file is executed directly (e.g., via 'npm start')
if (require.main === module) {
    server.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
}

// Crucial: Export the server instance so the test file can start and stop it
module.exports = server;
