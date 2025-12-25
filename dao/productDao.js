import productModel from '../models/product.model.js';

// crear producto
async function createProduct(productData) {
    try {
        const product = await productModel.create(productData);
        console.log('producto creado en db:', product.title);
        return product;
    } catch (error) {
        throw error;
    }
}

// traer todos los productos
async function getAllProducts() {
    try {
        const products = await productModel.find();
        return products;
    } catch (error) {
        throw error;
    }
}

// traer productos con paginacion y filtros
async function getProductsWithFilters(limit, page, sort, query) {
    try {
        const options = {
            limit: limit || 10,
            page: page || 1,
            lean: true
        };

        if (sort === 'asc') {
            options.sort = { price: 1 };
        } else if (sort === 'desc') {
            options.sort = { price: -1 };
        }

        let filter = {};
        if (query) {
            if (query === 'disponible') {
                filter.status = true;
            } else if (query === 'nodisponible') {
                filter.status = false;
            } else {
                filter.category = query;
            }
        }

        const result = await productModel.paginate(filter, options);
        return result;
    } catch (error) {
        throw error;
    }
}

// traer producto por id
async function getProductById(id) {
    try {
        const product = await productModel.findById(id);
        return product;
    } catch (error) {
        throw error;
    }
}

// traer producto por codigo
async function getProductByCode(code) {
    try {
        const product = await productModel.findOne({ code });
        return product;
    } catch (error) {
        throw error;
    }
}

// actualizar producto
async function updateProduct(id, updates) {
    try {
        const product = await productModel.findByIdAndUpdate(id, updates, { new: true });
        return product;
    } catch (error) {
        throw error;
    }
}

// borrar producto
async function deleteProduct(id) {
    try {
        const product = await productModel.findByIdAndDelete(id);
        return product;
    } catch (error) {
        throw error;
    }
}

export default {
    createProduct,
    getAllProducts,
    getProductsWithFilters,
    getProductById,
    getProductByCode,
    updateProduct,
    deleteProduct
};

