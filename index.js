const express = require('express')
const app = express()
const port = 3000

// Configure the template engine
app.set('view engine', 'ejs');

// The `use` method is used to define a middleware. That is, a function that is executed before the request is handled.
// Middleware functions are executed in the order they are defined.
// The express.urlencoded() middleware is used to decode the parameters sent in the body of a POST request. Hence, any POST request that contains parameters will have the parameters decoded and added to the request object by this middleware.
app.use(express.urlencoded())

// The express.json() middleware is used to decode the body of a POST request. Hence, any POST request that contains a JSON body will have its body decoded and added to the request object by this middleware.
app.use(express.json())

// The express.stati() middleware is used to serve static files. In this case, it means that any file in the "public" directory will be served directly by the server, and the next middlewares will not be executed.
app.use(express.static("public"));

// One can also define their own middleware functions.
// req and res are the request and response objects, respectively, and may be modified by the middleware.
// next is a function that must be called in order to pass control to the next middleware function. If you don't reply to the request in this middleware, you should call next() to pass control to the next middleware. Not calling next() will mean the client will never receive a response.
app.use('/form/', (req, res, next) => {
    // here any shared behavior for the /form/ path
    console.log("In middleware for /form/ path")
    next();
});

app.use('/', (req, res, next) => {
    // here any shared behavior for all paths
    console.log("In middleware for all paths")
    next();
});

// The get method is identical to the use method, but it only applies to GET requests.
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/form/', (req, res) => {
    // Query parameters that were part of the url.
    var getParams = req.query;
    res.render('echo', getParams);
});

// Handle post requests
app.post('/form/', (req, res) => {
    // Getting post parameters, allowed by the express.urlencoded() middleware.
    var postParams = req.body;
    res.render('echo', postParams);
});

// Example of templating with EJS
app.get('/template', function(req, res) {
    res.render('template', {helloworld: 'Hello, Worldy!'});
});

// Start the server. The callback is executed when the server is ready to receive requests.
app.listen(port, () => console.log(`Example app listening on port ${port}!`))