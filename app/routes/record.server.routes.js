var users = require('../../app/controllers/users.server.controller'),
    records = require('../../app/controllers/record.server.controller');

module.exports = function(app){
    app.route('/api/records')
        .get(users.requiresLogin, records.list)
        .post(users.requiresLogin, records.create);
    app.route('api/records/image/:recordId')
        .get(users.requiresLogin, records.getImgById)
        .post(users.requiresLogin, records.saveImage)
    
    app.route('/api/records/:recordId')
        .get(records.read)
        .put(users.requiresLogin, records.hasAuthorization, records.update)
        .delete(users.requiresLogin, records.hasAuthorization, records.delete)
    app.param('recordId', records.recordByID);
};