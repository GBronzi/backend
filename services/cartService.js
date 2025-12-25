import cartDao from '../dao/cartDao.js';
import productDao from '../dao/productDao.js';

// crear carrito
async function createCart() {
    const cart = await cartDao.createCart();
    return cart;
}

// traer todos los carritos
async function getAllCarts() {
    const carts = await cartDao.getAllCarts();
    return carts;
}

// traer carrito por id
async function getCartById(id) {
    const cart = await cartDao.getCartById(id);
    if (!cart) {
        throw new Error('carrito no encontrado');
    }
    return cart;
}

// agregar producto al carrito
async function addProductToCart(cartId, productId) {
    const prod = await productDao.getProductById(productId);
    if (!prod) {
        throw new Error('producto no encontrado');
    }

    const cart = await cartDao.addProductToCart(cartId, productId);
    if (!cart) {
        throw new Error('carrito no encontrado');
    }
    return cart;
}

// actualizar cantidad de producto
async function updateProductQuantity(cartId, productId, quantity) {
    if (quantity < 1) {
        throw new Error('la cantidad debe ser mayor a 0');
    }

    const cart = await cartDao.updateProductQuantity(cartId, productId, quantity);
    if (!cart) {
        throw new Error('carrito o producto no encontrado');
    }
    return cart;
}

// eliminar producto del carrito
async function removeProductFromCart(cartId, productId) {
    const cart = await cartDao.removeProductFromCart(cartId, productId);
    if (!cart) {
        throw new Error('carrito no encontrado');
    }
    return cart;
}

// actualizar todo el carrito
async function updateCart(cartId, products) {
    const cart = await cartDao.updateCart(cartId, products);
    if (!cart) {
        throw new Error('carrito no encontrado');
    }
    return cart;
}

// vaciar carrito
async function clearCart(cartId) {
    const cart = await cartDao.clearCart(cartId);
    if (!cart) {
        throw new Error('carrito no encontrado');
    }
    return cart;
}

// borrar carrito
async function deleteCart(id) {
    const cart = await cartDao.deleteCart(id);
    if (!cart) {
        throw new Error('carrito no encontrado');
    }
    return cart;
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

