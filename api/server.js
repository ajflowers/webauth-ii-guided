const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');  // 1. npm i express-session
const KnexSessionStorage = require('connect-session-knex')(session); // for storing sessions in db

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const knexConnection = require('../database/dbConfig')

const server = express();

// 2. configure the sessions and cookies
const sessionConfiguration = {
  name: 'booger', // default name is sid (session id)
  secret: process.env.COOKIE_SECRET || 'is it secret? is it safe?',
  cookie: {
    maxAge: 1000 * 60 * 60, // 1hr in milliseconds
    secure: process.env.NODE_ENV === 'development' ? false : true, // do we send over https only
    httpOnly: true, // prevent client javascript code from accessing cookie    
  },
  resave: false, // save sessions even when they have not changed
  saveUninitialized: true, // read about it - GDPR 
  store: new KnexSessionStorage({
    knex: knexConnection,
    clearInterval: 1000 * 60 * 10, // deletes expired sessions every 10min
    tablename: 'user_sessions',
    sidfieldname: 'id',
    createtable: true
  })
};

server.use(helmet());
server.use(express.json());
server.use(cors()); // research "credentials: true" and "withCredentials"
server.use(session(sessionConfiguration));  // 3. use the session middleware globally

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up', session: req.session });
});

module.exports = server;
