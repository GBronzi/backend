import cartModel from '../models/cart.model.js';

// crear carrito
async function createCart() {
    try {
        const cart = await cartModel.create({ products: [] });
        console.log('carrito creado:', cart._id);
        return cart;
    } catch (error) {
        throw error;
    }
}

// traer todos los carritos
async function getAllCarts() {
    try {
        const carts = await cartModel.find().populate('products.product');
        return carts;
    } catch (error) {
        throw error;
    }
}

// traer carrito por id
async function getCartById(id) {
    try {
        const cart = await cartModel.findById(id).populate('products.product');
        return cart;
    } catch (error) {
        throw error;
    }
}

// agregar producto al carrito
async function addProductToCart(cartId, productId) {
    try {
        const cart = await cartModel.findById(cartId);
        if (!cart) return null;

        const index = cart.products.findIndex(p => p.product.toString() === productId);

        if (index !== -1) {
            cart.products[index].quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        await cart.save();
        return await cartModel.findById(cartId).populate('products.product');
    } catch (error) {
        throw error;
    }
}

// actualizar cantidad de producto
async function updateProductQuantity(cartId, productId, quantity) {
    try {
        const cart = await cartModel.findById(cartId);
        if (!cart) return null;

        const index = cart.products.findIndex(p => p.product.toString() === productId);

        if (index !== -1) {
            cart.products[index].quantity = quantity;
            await cart.save();
            return await cartModel.findById(cartId).populate('products.product');
        }

        return null;
    } catch (error) {
        throw error;
    }
}

// eliminar producto del carrito
async function removeProductFromCart(cartId, productId) {
    try {
        const cart = await cartModel.findById(cartId);
        if (!cart) return null;

        cart.products = cart.products.filter(p => p.product.toString() !== productId);

        await cart.save();
        return await cartModel.findById(cartId).populate('products.product');
    } catch (error) {
        throw error;
    }
}

// actualizar todo el carrito con array de productos
async function updateCart(cartId, products) {
    try {
        const cart = await cartModel.findById(cartId);
        if (!cart) return null;

        cart.products = products;
        await cart.save();
        return await cartModel.findById(cartId).populate('products.product');
    } catch (error) {
        throw error;
    }
}

// vaciar carrito (eliminar todos los productos)
async function clearCart(cartId) {
    try {
        const cart = await cartModel.findById(cartId);
        if (!cart) return null;

        cart.products = [];
        await cart.save();
        console.log('carrito vaciado');
        return cart;
    } catch (error) {
        throw error;
    }
}

// borrar carrito
async function deleteCart(id) {
    try {
        const cart = await cartModel.findByIdAndDelete(id);
        return cart;
    } catch (error) {
        throw error;
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

