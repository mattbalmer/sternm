import Config from 'config';
import * as path from 'path';
import express from 'express';
import session from 'express-session';
import exphbs from 'express-handlebars';
import morgan from 'morgan';
import connectMongo from 'connect-mongo';
import socketio from 'socket.io';
import passportSocketIO from 'passport.socketio';
import http from 'http';
import initPassport from 'lib/passport';
import mongoose from 'lib/mongoose';
import initSockets from './sockets';
// import raven from 'raven';

const MongoStore = connectMongo(session);
const sessionStore = new MongoStore({
  mongooseConnection: mongoose.connection,
});

const expressSession = session({
  key: 'sternm.sid',
  store: sessionStore,
  secret: Config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
});
const expressServer = express();
expressServer.use(morgan('dev'));

const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: null,
  partialsDir: path.join(__dirname, 'views/'),
  layoutsDir: path.join(__dirname, 'views/'),
  helpers: {
    json: (_) => JSON.stringify(_),
  }
});
expressServer.engine('handlebars', hbs.engine);
expressServer.set('view engine', 'handlebars');
expressServer.set('views', path.join(__dirname, './views'));

expressServer.use(express.static(Config.STATIC_FILES_PATH));
expressServer.use(expressSession);
initPassport(expressServer);
expressServer.use(require('routes'));

const httpServer = http.createServer(expressServer);
const io = socketio.listen(httpServer, {});

io.use(passportSocketIO.authorize({
  key: 'sternm.sid',
  store: sessionStore,
  secret: Config.SESSION_SECRET,
}));

initSockets({
  io,
});

export default httpServer;
