const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  productos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true
    }
  ]
});

module.exports = mongoose.model('Carrito', carritoSchema);
