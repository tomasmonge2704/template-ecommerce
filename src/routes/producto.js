const express = require("express");
const router = express.Router();
const productosController = require("../controllers/productoController");
const {isAuthenticated} = require('../passport')

// Obtener todos los productos
router.get("/",isAuthenticated, productosController.getProductos);

// Obtener un producto por ID
router.get("/:id",isAuthenticated, productosController.getProductoById);

// Crear un nuevo producto
router.post("/",isAuthenticated, productosController.crearProducto);

// Actualizar un producto existente
router.put("/:id",isAuthenticated, productosController.actualizarProducto);

// Eliminar un producto existente
router.delete("/:id",isAuthenticated, productosController.eliminarProducto);

module.exports = router;
