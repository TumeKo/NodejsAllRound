var users = require('../../app/controllers/users.server.controller'),
    cv = require('../../app/controllers/cv.server.controller');

module.exports = function(app){
    app.route('/api/cv')
        .get(cv.list)
        .post(cv.create);
};