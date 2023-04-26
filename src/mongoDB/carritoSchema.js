const mongoose = require('mongoose');

const carritoSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
    },
    productos: [
      {
        producto: {
            _id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Producto',
                required: true
              },
            nombre: {
              type: String,
              required: true
            },
            precio: {
              type: Number,
              required: true
            },
            cantidad: {
              type: Number,
              required: true
            },
            imageURL: {
              type: String,
              required: true
            },
            timestamp: {
              type: Date,
              default: Date.now
            }
          },
        cantidad: {
          type: Number,
          required: true,
          default: 1
        }
      }
    ]
  });
  

module.exports = mongoose.model('Carrito', carritoSchema);
