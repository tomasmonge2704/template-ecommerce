const express = require('express');
const router = express.Router();
const Carrito = require('../mongoDB/carritoSchema');

// Ruta para obtener el carrito de un usuario
router.get('/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;
  try {
    const carrito = await Carrito.findOne({ usuarioId }).populate('productos.productoId');
    if (!carrito) {
      return res.status(404).json({ error: 'El carrito no existe' });
    }
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

// Ruta para agregar un producto al carrito
router.post('/:usuarioId', async (req, res) => {
  const { usuarioId } = req.params;
  const { productoId, cantidad, precio } = req.body;
  try {
    const carrito = await Carrito.findOne({ usuarioId });
    if (!carrito) {
      const nuevoCarrito = new Carrito({
        usuarioId,
        productos: [{ productoId, cantidad, precio }],
      });
      await nuevoCarrito.save();
      return res.json(nuevoCarrito);
    }
    const index = carrito.productos.findIndex((producto) => producto.productoId.toString() === productoId);
    if (index !== -1) {
      carrito.productos[index].cantidad += cantidad;
    } else {
      carrito.productos.push({ productoId, cantidad, precio });
    }
    await carrito.save();
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

// Ruta para eliminar un producto del carrito
router.delete('/:usuarioId/:productoId', async (req, res) => {
  const { usuarioId, productoId } = req.params;
  try {
    const carrito = await Carrito.findOne({ usuarioId });
    if (!carrito) {
      return res.status(404).json({ error: 'El carrito no existe' });
    }
    const index = carrito.productos.findIndex((producto) => producto.productoId.toString() === productoId);
    if (index === -1) {
      return res.status(404).json({ error: 'El producto no está en el carrito' });
    }
    carrito.productos.splice(index, 1);
    await carrito.save();
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
});

module.exports = router;
