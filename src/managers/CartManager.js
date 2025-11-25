import fs from 'fs';

class CartManager {
    constructor(path) {
        this.path = path;
    }

    // traer todos los carritos
    async getCarts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const carts = JSON.parse(data);
                console.log('carritos:', carts.length);
                return carts;
            }
            return [];
        } catch (error) {
            console.log('error al leer carritos:', error);
            return [];
        }
    }

    // buscar carrito por id
    async getCartById(id) {
        const carts = await this.getCarts();
        const carrito = carts.find(c => c.id === id);
        return carrito;
    }

    // crear carrito nuevo
    async createCart() {
        const carts = await this.getCarts();
        const nuevoId = carts.length > 0 ? Math.max(...carts.map(c => c.id)) + 1 : 1;

        const nuevoCarrito = {
            id: nuevoId,
            products: []
        };

        console.log('creando carrito:', nuevoId);
        carts.push(nuevoCarrito);
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        return nuevoCarrito;
    }

    // agregar producto al carrito
    async addProductToCart(cartId, productId) {
        const carts = await this.getCarts();
        const index = carts.findIndex(c => c.id === cartId);

        if (index === -1) {
            throw new Error('Carrito no encontrado');
        }

        const carrito = carts[index];
        const prodIdx = carrito.products.findIndex(p => p.product === productId);

        // si ya existe sumo cantidad
        if (prodIdx !== -1) {
            carrito.products[prodIdx].quantity += 1;
            console.log('cantidad actualizada:', carrito.products[prodIdx].quantity);
        } else {
            carrito.products.push({ product: productId, quantity: 1 });
            console.log('producto agregado al carrito:', productId);
        }

        carts[index] = carrito;
        await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2));
        return carrito;
    }
}

export default CartManager;

