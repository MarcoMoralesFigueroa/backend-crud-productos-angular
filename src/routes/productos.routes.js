import { Router } from 'express';
import { crearProducto, obtenerProductos, obtenerProducto, eliminarProducto, actualizarProducto } from "../controllers/productos.controller.js";

const router = Router();

router.get('/productos', obtenerProductos);
router.get('/productos/:id', obtenerProducto);
router.post('/productos', crearProducto);
router.put('/productos/:id', actualizarProducto);
router.delete('/productos/:id', eliminarProducto);

export default router;