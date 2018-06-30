var restify = require('restify')
var errors = require('restify-errors')
var dataContext = require('./data-context');

var server = restify.createServer();

server.pre(restify.plugins.pre.userAgentConnection());

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
  
function getCustomers(req, res, next) {
    dataContext.getCustomers(function(err, data){
        if(err) return next(err);
        console.log(data);
        res.send(data);
        next();
    });
}

function getCustomer(req, res, next) {
    dataContext.getCustomer(req.params.id, function(err, data){
        if(err) return next(err);
        console.log(data);
        res.send(data);
        next();
    });
}

function getAccounts(req, res, next) {
    dataContext.getAccounts(function(err, data){
        if(err) return next(err);
        console.log(data);
        res.send(data);
        next();
    });
}

function getAccount(req, res, next) {
    dataContext.getAccount(req.params.id, function(err, data){
        if(err) return next(err);
        console.log(data);
        res.send(data);
        next();
    });
}

function getAccountsForCustomer(req, res, next) {
    if(req.params.id === '2') {
        return next(new errors.NotFoundError('customer not found'));
    }
    res.send('accounts for customer ' + req.params.id);
    next();
}

function getTransactions(req, res, next) {
    dataContext.getTransactions(function(err, data){
        if(err) return next(err);
        console.log(data);
        res.send(data);
        next();
    });
}

function getTransaction(req, res, next) {
    dataContext.getTransaction(req.params.id, function(err, data){
        if(err) return next(err);
        console.log(data);
        res.send(data);
        next();
    });
}
