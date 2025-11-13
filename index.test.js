const request = require('http'); // Use built-in 'http' module for requests
const server = require('./index'); // Import the server instance
const PORT = process.env.PORT || 3000;
const URL = `http://localhost:${PORT}`;

// Describe the test suite for the server
describe('Node.js Hello World Server', () => {

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
            done(err); // Fail the test if there's an error
        });
    });

    // CRITICAL FIX: Shut down the server after all tests are done
    afterAll((done) => {
        // This closes the long-running process, allowing the Jest process 
        // (and thus the GitHub Actions job) to exit gracefully.
        server.close(done); 
    });
});
