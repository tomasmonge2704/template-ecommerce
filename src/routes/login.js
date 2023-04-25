const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { passport } = require('../passport');
const jwtSecret = process.env.JWT_SECRET;


router.post('/', passport.authenticate('login', {
    failureFlash: '¡Inicio de sesión fallido! Usuario o contraseña incorrectos.'
}), (req, res) => {
    const token = jwt.sign({ userId: req.user.id }, jwtSecret);
    res.json({ token });
});

module.exports = router;