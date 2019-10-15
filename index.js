const express = require('express')
const app = express()
const port = 3000

// Configure the template engine
app.set('view engine', 'ejs');

// Decode url encoded form parameters (POST requests)
app.use(express.urlencoded())

// Decode json encoded parameters (POST requests)
app.use(express.json())

// Serve static files
app.use(express.static("public"));

// Define a Middleware
app.use('/form/', (req, res, next) => {
    // shared behavior for the /form/ path
    next();
});

// Handle get requests
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Handle get requests
app.get('/form/', (req, res) => {
    var getParams = res.query;
    res.render('form', getParams);
});

// Handle post requests
app.post('/form/', (req, res) => {
    var postParams = req.body;
    res.render('form', postParams);
});

// Templating with EJS
app.get('/template', function(req, res) {
    console.log(req.body.name);
    res.render('template', {helloworld: 'Hello, World!'});
});

// Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))