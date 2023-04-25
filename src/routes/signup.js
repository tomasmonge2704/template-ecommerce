const express = require('express');
const router = express.Router();
const {passport} = require('../passport')
const multer = require('multer');
const upload = multer();

router.post('/', (req, res, next) => {
    passport.authenticate('signup', (err, user, info) => {
      if (err) {
        return next(err);
      }
      return res.status(200).json({ mensaje: 'Usuario creado exitosamente!' });
    })(req, res, next);
  });
module.exports = router;