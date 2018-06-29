var restify = require('restify')
var errors = require('restify-errors')

var server = restify.createServer();

server.pre(restify.plugins.pre.userAgentConnection());

server.get('/customers', getCustomers)
server.get('/customers/:id', getCustomer)

server.get('/accounts', getAccounts)
server.get('/accounts/:id', getAccount)
server.get('/customers/:id/accounts', getAccountsForCustomer)

server.get('/transactions', getTransactions)

server.listen(8080, function() {
console.log('%s listening at %s', server.name, server.url);
});
  
function getCustomers(res, next) {
    res.send('customers');
    next();
}

function getCustomer(req, res, next) {
    if(req.params.id === '2') {
        return next(new errors.NotFoundError('customer not found'));
    }
    res.send('customer ' + req.params.customerId);
    next();
}

function getAccounts(req, res, next) {
    res.send('accounts');
    next();
}

function getAccount(req, res, next) {
    if(req.params.id === '2') {
        return next(new errors.NotFoundError('account not found'));
    }
    res.send('account ' + req.params.id);
    next();
}

function getAccountsForCustomer(req, res, next) {
    if(req.params.id === '2') {
        return next(new errors.NotFoundError('customer not found'));
    }
    res.send('accounts for customer ' + req.params.id);
    next();
}

function getTransactions(req, res, next) {
    res.send('transactions');
    next();
}
  