var config = require('./config'),
    http = require('http'),
    socketio = require('socket.io'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    passport = require('passport'),
    MongoStore = require('connect-mongo')(session),
    flash = require('connect-flash'),
    multer = require('multer');

module.exports = function (db) {
    var app = express(),
        server = http.createServer(app),
        io = socketio.listen(server),
        upload = multer({dest: 'uploads/'});
    app.disable('x-powered-by');
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    
    var mongoStore = new MongoStore({
        db: db.connection.db
    });
    
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret,
        store: mongoStore
    }));
    
    app.set('views', './app/views');
    app.set('view engine', 'ejs');
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());
    
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    require('../app/routes/articles.server.routes.js')(app);
    require('../app/routes/cv.server.routes.js')(app);
    require('../app/routes/record.server.routes.js')(app);
    require('./socketio')(server, io, mongoStore);
    app.use(express.static('./public'));
    
    //return app;
    return server;
};