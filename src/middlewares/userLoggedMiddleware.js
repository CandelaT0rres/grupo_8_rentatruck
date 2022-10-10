const fs = require('fs');
const path = require('path');

let usuarios = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/users.json')), 'utf-8')

function userLoggedMiddleware(req, res, nex) {
    
    next();
}

module.exports = userLoggedMiddleware;