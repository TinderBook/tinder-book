require('dotenv').config();

const express = require('express');
const app = express();



//connect mongo
require('./config/db.config')


//Configure view engine
app.set("view engine", "hbs");
app.set("views", `${__dirname}/views`);

app.use(express.urlencoded({ extended: true}));

const sessionConfig = require('./config/session.config');
app.use(sessionConfig.session);

//Configure static fields
app.use(express.static("public"));

//Routes
const routes = require('./config/routes.config');
app.use(routes)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Application running at port ${PORT}`));
