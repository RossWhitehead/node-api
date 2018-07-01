var restify = require('restify')
var errors = require('restify-errors')
var dataContext = require('./data-context');

var server = restify.createServer();

server.pre(restify.plugins.pre.userAgentConnection());

server.use(restify.plugins.queryParser());

// Routes
server.get('/customers', getCustomers)
server.get('/customers/:id', getCustomer)

server.get('/accounts', getAccounts)
server.get('/accounts/:id', getAccount)
server.get('/customers/:id/accounts', getAccountsForCustomer)

server.get('/transactions', getTransactions);
server.get('/transaction/:id', getTransaction);

server.listen(8080, function() {
    console.log('%s listening at %s', server.name, server.url);
});
  
// Route handlers
function getCustomers(req, res, next) {
    dataContext.getCustomers(function(err, data){
        parseResults(err, data, res, next);
    });
}

function getCustomer(req, res, next) {
    dataContext.getCustomer(req.params.id, function(err, data){
        parseResults(err, data, res, next);
    });
}

function getAccounts(req, res, next) {
    dataContext.getAccounts(function(err, data){
        parseResults(err, data, res, next);
    });
}

function getAccount(req, res, next) {
    dataContext.getAccount(req.params.id, function(err, data){
        parseResults(err, data, res, next);
    });
}

function getAccountsForCustomer(req, res, next) {
    dataContext.getAccountForCustomer(req.params.id, function(err, data){
        parseResults(err, data, res, next);
    });
}

function getTransactions(req, res, next) {
    console.log(req.query);
    dataContext.getTransactions(req.query.from, req.query.to, function(err, data){
        parseResults(err, data, res, next);
    });
}

function getTransaction(req, res, next) {
    dataContext.getTransaction(req.params.id, function(err, data){
        parseResults(err, data, res, next);
    });
}

function parseResults(err, data, res, next){
    if(err) return next(err);
    console.log(data);
    res.send(data);
    next();
}
