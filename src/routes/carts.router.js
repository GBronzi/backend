import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager('./data/carts.json');

// crear carrito
router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json({ status: 'success', data: newCart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// traer carrito por id
router.get('/:cid', async (req, res) => {
    try {
        const id = parseInt(req.params.cid);
        const cart = await cartManager.getCartById(id);

        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }

        res.json({ status: 'success', data: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// agregar producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const idCarrito = parseInt(req.params.cid);
        const idProducto = parseInt(req.params.pid);
        const actualizado = await cartManager.addProductToCart(idCarrito, idProducto);

        console.log('producto agregado al carrito:', idCarrito);
        res.json({ status: 'success', data: actualizado });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
});

export default router;

