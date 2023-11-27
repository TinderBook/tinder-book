require('dotenv').config();

const express = require('express');
const app = express();
const logger = require('morgan');
const flash = require('connect-flash');
const notificationsMiddleware = require('./middlewares/notifications.middleware').notifications;
const booksController = require('./controllers/books.controller');
//connect mongo
require('./config/db.config')

//connect to hbs
require('./config/hbs.config')

//Configure view engine
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

//config body http
app.use(express.urlencoded({ extended: true}));
//connect logger
app.use(logger('dev'))

//config session archivo y sus middlewares 
const sessionConfig = require('./config/session.config');

app.use(sessionConfig.session);
app.use(sessionConfig.loadSessionUser);
app.use(notificationsMiddleware);
app.use(flash());

//Configure static fields
app.use(express.static("public"));

app.use((req, res, next) => {
    res.locals.navigationPath = req.path
    res.locals.messages = req.flash();
    next();
})


//Routes
const routes = require('./config/routes.config');
app.use(routes)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Application running at port ${PORT}`));
