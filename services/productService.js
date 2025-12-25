import productDao from '../dao/productDao.js';

// crear producto
async function createProduct(productData) {
    if (!productData.title || !productData.description || !productData.code ||
        !productData.price || productData.stock === undefined || !productData.category) {
        throw new Error('faltan campos obligatorios');
    }

    // ver si el codigo ya existe
    const existe = await productDao.getProductByCode(productData.code);
    if (existe) {
        throw new Error('el codigo ya existe');
    }

    const prod = await productDao.createProduct(productData);
    return prod;
}

// traer todos los productos
async function getAllProducts() {
    const prods = await productDao.getAllProducts();
    return prods;
}

// traer productos con paginacion
async function getProductsWithFilters(limit, page, sort, query) {
    const result = await productDao.getProductsWithFilters(limit, page, sort, query);
    return result;
}

// traer producto por id
async function getProductById(id) {
    const prod = await productDao.getProductById(id);
    if (!prod) {
        throw new Error('producto no encontrado');
    }
    return prod;
}

// actualizar producto
async function updateProduct(id, updates) {
    delete updates._id;

    if (updates.code) {
        const existe = await productDao.getProductByCode(updates.code);
        if (existe && existe._id.toString() !== id) {
            throw new Error('el codigo ya existe');
        }
    }

    const prod = await productDao.updateProduct(id, updates);
    if (!prod) {
        throw new Error('producto no encontrado');
    }
    return prod;
}

// borrar producto
async function deleteProduct(id) {
    const prod = await productDao.deleteProduct(id);
    if (!prod) {
        throw new Error('producto no encontrado');
    }
    return prod;
}

export default {
    createProduct,
    getAllProducts,
    getProductsWithFilters,
    getProductById,
    updateProduct,
    deleteProduct
};

