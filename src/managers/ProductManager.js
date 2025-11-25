import fs from 'fs';

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    // traer todos los productos
    async getProducts() {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const prods = JSON.parse(data);
                // console.log('productos cargados:', prods.length);
                return prods;
            }
            return [];
        } catch (error) {
            console.log('error al leer productos:', error);
            return [];
        }
    }

    // buscar producto por id
    async getProductById(id) {
        const prods = await this.getProducts();
        const prod = prods.find(p => p.id === id);
        return prod;
    }

    async addProduct(productData) {
        const prods = await this.getProducts();

        // validar que esten todos los campos
        if (!productData.title || !productData.description || !productData.code ||
            !productData.price || !productData.stock || !productData.category) {
            throw new Error('Todos los campos son obligatorios');
        }

        // ver si el codigo ya existe
        const existe = prods.find(p => p.code === productData.code);
        if (existe) {
            console.log('codigo duplicado:', productData.code);
            throw new Error('El código ya existe');
        }

        // crear el id nuevo
        const nuevoId = prods.length > 0 ? Math.max(...prods.map(p => p.id)) + 1 : 1;

        // detalles del producto
        const newProduct = {
            id: nuevoId,
            title: productData.title,
            description: productData.description,
            code: productData.code,
            price: productData.price,
            status: productData.status !== undefined ? productData.status : true,
            stock: productData.stock,
            category: productData.category,
            thumbnails: productData.thumbnails || []
        };

        console.log('agregando producto:', newProduct.title);
        prods.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(prods, null, 2));
        return newProduct;
    }

    // actualizar un producto
    async updateProduct(id, updates) {
        const prods = await this.getProducts();
        const index = prods.findIndex(p => p.id === id);

        if (index === -1) {
            throw new Error('Producto no encontrado');
        }

        delete updates.id;
        prods[index] = { ...prods[index], ...updates };

        console.log('producto actualizado:', id);
        await fs.promises.writeFile(this.path, JSON.stringify(prods, null, 2));
        return prods[index];
    }

    // borrar producto
    async deleteProduct(id) {
        const prods = await this.getProducts();
        const index = prods.findIndex(p => p.id === id);

        if (index === -1) {
            throw new Error('Producto no encontrado');
        }

        console.log('eliminando producto:', id);
        prods.splice(index, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(prods, null, 2));
        return true;
    }
}

export default ProductManager;

