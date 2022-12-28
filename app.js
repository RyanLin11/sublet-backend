const express = require('express');
const logger = require('morgan');

require('dotenv').config();

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS setup
const cors = require('cors');
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || process.env.CORS_WHITELISTED_DOMAINS.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    exposedHeaders: ['set-cookie'],
};
app.use(cors(corsOptions));

// Session setup
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const knex = require('./services/knex');
const store = new KnexSessionStore({
    knex,
    tablename: 'sessions'
});
const sessionOptions = {
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 86400000,
        sameSite: process.env.NODE_ENV === 'production'? 'none': false,
    },
    proxy: true,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    store
};
app.use(session(sessionOptions));

// Routing
const usersRouter = require('./routes/users');
const listingsRouter = require('./routes/listings');
const groupsRouter = require('./routes/groups');
const sessionsRouter = require('./routes/sessions');
app.use('/listings', listingsRouter);
app.use('/users', usersRouter);
app.use('/groups', groupsRouter);
app.use('/sessions', sessionsRouter);

// Custom error handler
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    } else if (err.statusCode) {
        res.status(err.statusCode).send(err);
    } else {
        res.status(500).send(err);
    }
})

module.exports = app;