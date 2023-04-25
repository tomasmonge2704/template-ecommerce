const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String
  });

const User = mongoose.model('usuarios', userSchema);

module.exports = {User};