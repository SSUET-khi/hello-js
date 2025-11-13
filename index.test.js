const request = require('http'); // Use built-in 'http' module for requests
const server = require('./index'); // Import the raw server instance
const PORT = process.env.PORT || 3000;
const URL = `http://localhost:${PORT}`;

// Describe the test suite for the server
describe('Node.js Hello World Server', () => {

    // 🛠️ FIX: Manually start the server before any tests run, and include error handling
    beforeAll((done) => {
        
        // 1. Add error listener for server startup failures (e.g., EADDRINUSE)
        server.on('error', (err) => {
            // If the server throws an error during listen, fail the setup immediately
            console.error('Server failed to start:', err.message);
            done(err);
        });

        // 2. Start the server
        server.listen(PORT, () => {
            console.log(`Test server successfully started on port ${PORT}`);
            done(); // Signal Jest that the asynchronous setup is complete
        });
    });

    // Test case: Check if the server returns "Hello World\n" and status 200
    test('should return "Hello World\\n" and status 200', (done) => {
        
        // This makes an HTTP request to the running server instance
        request.get(URL, (res) => {
            let data = '';
            
            // Collect the response data chunks
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            // Once the entire response is received
            res.on('end', () => {
                try {
                    expect(res.statusCode).toBe(200);
                    expect(data).toBe('Hello World\n');
                    done(); // Signal to Jest that the async test is complete
                } catch (error) {
                    done(error); // Signal failure
                }
            });
        }).on("error", (err) => {
            // This catches connection errors (like ECONNREFUSED)
            console.error('Connection error during test:', err.message);
            done(err); // Fail the test if there's an error
        });
    });

    // CRITICAL FIX: Shut down the server after all tests are done
    afterAll((done) => {
        // Remove the error listener to prevent resource leaks/unexpected behavior
        server.removeAllListeners('error');
        
        server.close((err) => {
            console.log("Test server stopped.");
            done(err); // Ensure the teardown completes
        });
    });
});
