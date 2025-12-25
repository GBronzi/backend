import { Router } from 'express';
import cartController from '../controllers/cartController.js';

const router = Router();

// crear carrito
router.post('/', (req, res) => {
    cartController.createCart(req, res);
});

// traer todos los carritos
router.get('/', (req, res) => {
    cartController.getAllCarts(req, res);
});

// agregar producto al carrito
router.post('/:cid/product/:pid', (req, res) => {
    cartController.addProductToCart(req, res);
});

// actualizar cantidad de producto
router.put('/:cid/product/:pid', (req, res) => {
    cartController.updateProductQuantity(req, res);
});

// eliminar producto del carrito
router.delete('/:cid/product/:pid', (req, res) => {
    cartController.removeProductFromCart(req, res);
});

// vaciar carrito (eliminar todos los productos)
router.delete('/:cid/clear', (req, res) => {
    cartController.clearCart(req, res);
});

// actualizar todo el carrito
router.put('/:cid', (req, res) => {
    cartController.updateCart(req, res);
});

// traer carrito por id
router.get('/:cid', (req, res) => {
    cartController.getCartById(req, res);
});

// borrar carrito
router.delete('/:cid', (req, res) => {
    cartController.deleteCart(req, res);
});

export default router;

