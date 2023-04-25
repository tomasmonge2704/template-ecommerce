const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const {passport} = require('./src/passport');
const app = express();
require('dotenv').config();
const loginRoutes = require('./src/routes/login');
const signupRoutes = require('./src/routes/signup');
const productsRoutes = require('./src/routes/productos');
const {connectMongoDB} = require('./src/mongoDB/connect')
const flash = require('connect-flash');

connectMongoDB()
// Configuración de Express
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(flash());
app.use(express.json())
app.use(cookieParser());
app.use(session({
  secret: 'super-secreto',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

//rutas
app.use('/login', loginRoutes);
app.use('/signup', signupRoutes);
app.use('/productos', productsRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('Servidor iniciado en el puerto ' + PORT);
  });