const http = require('http'); 
const server = http.createServer((req, res) => {  
    //check the URL of the current request
    //check if the request URL is equal to /welcome.
    if (req.url == '/welcome') { 
        // 1. inform the client that we send a JSON response in the header with the appropriate content type.
        res.setHeader("Content-Type", "application/json");
        //2. 
        res.writeHead(200);
        res.end(JSON.stringify({ message: "Welcome New User"}));
        // OR
        // res.write(JSON.stringify({ message: "Welcome New User"}));  
        //res.end();  
    } else {
         res.end("Another page");  
    }
});
server.listen(5000);
console.log('Node.js web server at port 5000 is running..')
