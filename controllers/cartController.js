import cartService from '../services/cartService.js';

// crear carrito
async function createCart(req, res) {
    try {
        const cart = await cartService.createCart();
        console.log('carrito creado');
        res.status(201).json({ status: 'success', data: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}

// traer todos los carritos
async function getAllCarts(req, res) {
    try {
        const carts = await cartService.getAllCarts();
        console.log('carritos:', carts.length);
        res.json({ status: 'success', data: carts });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}

// traer carrito por id
async function getCartById(req, res) {
    try {
        const cart = await cartService.getCartById(req.params.cid);
        res.json({ status: 'success', data: cart });
    } catch (error) {
        res.status(404).json({ status: 'error', message: error.message });
    }
}

// agregar producto al carrito
async function addProductToCart(req, res) {
    try {
        const cart = await cartService.addProductToCart(req.params.cid, req.params.pid);
        console.log('producto agregado al carrito');
        res.json({ status: 'success', data: cart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
}

// actualizar cantidad de producto
async function updateProductQuantity(req, res) {
    try {
        const qty = req.body.quantity;
        const cart = await cartService.updateProductQuantity(req.params.cid, req.params.pid, qty);
        res.json({ status: 'success', data: cart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
}

// eliminar producto del carrito
async function removeProductFromCart(req, res) {
    try {
        console.log('eliminando producto del carrito:', req.params.cid, req.params.pid);
        const cart = await cartService.removeProductFromCart(req.params.cid, req.params.pid);
        console.log('producto eliminado del carrito');
        res.json({ status: 'success', data: cart });
    } catch (error) {
        console.error('error al eliminar producto:', error.message);
        res.status(400).json({ status: 'error', message: error.message });
    }
}

// actualizar todo el carrito
async function updateCart(req, res) {
    try {
        const cart = await cartService.updateCart(req.params.cid, req.body.products);
        console.log('carrito actualizado');
        res.json({ status: 'success', data: cart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
}

// vaciar carrito (eliminar todos los productos)
async function clearCart(req, res) {
    try {
        const cart = await cartService.clearCart(req.params.cid);
        console.log('carrito vaciado');
        res.json({ status: 'success', data: cart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
}

// borrar carrito
async function deleteCart(req, res) {
    try {
        await cartService.deleteCart(req.params.cid);
        console.log('carrito eliminado');
        res.json({ status: 'success', message: 'carrito eliminado' });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
}

export default {
    createCart,
    getAllCarts,
    getCartById,
    addProductToCart,
    updateProductQuantity,
    removeProductFromCart,
    updateCart,
    clearCart,
    deleteCart
};

