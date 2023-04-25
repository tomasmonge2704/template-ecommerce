const express = require("express");
const router = express.Router();
const ProductoModel = require("../mongoDB/productosSchema");

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await ProductoModel.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un producto por ID
router.get("/:id", async (req, res) => {
  try {
    const producto = await ProductoModel.findById(req.params.id);
    if (!producto) throw new Error("Producto no encontrado");
    res.json(producto);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Crear un nuevo producto
router.post("/", async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    const producto = new ProductoModel({ nombre, precio });
    await producto.save();
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar un producto existente
router.put("/:id", async (req, res) => {
  try {
    const { nombre, precio } = req.body;
    const producto = await ProductoModel.findByIdAndUpdate(
      req.params.id,
      { nombre, precio },
      { new: true }
    );
    if (!producto) throw new Error("Producto no encontrado");
    res.json(producto);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Eliminar un producto existente
router.delete("/:id", async (req, res) => {
  try {
    const producto = await ProductoModel.findByIdAndDelete(req.params.id);
    if (!producto) throw new Error("Producto no encontrado");
    res.json(producto);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;