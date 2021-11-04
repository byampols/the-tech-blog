const express = require('express');
const path = require('path');
const session = require('express-session');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({helpers});

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
    secret: `b+f0'$_!9_F^B&69aga25,8@~_(i521*Hj6Rkf28X=TInjjf_6Sx9_"PJ #321e_)^wte2 S4;7ZcmI;~'j8yQwSp*q2"dHRW1x+~Kn^6CUsHHg(WpjTv~H@^6m/,b h`,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

//turn on routes
app.use(routes);

//turn on connection to db and server
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});