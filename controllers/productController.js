import productService from '../services/productService.js';

// crear producto
async function createProduct(req, res) {
    try {
        const prod = await productService.createProduct(req.body);
        console.log('producto creado:', prod.title);
        res.status(201).json({ status: 'success', data: prod });
    } catch (error) {
        console.log('error al crear:', error.message);
        res.status(400).json({ status: 'error', message: error.message });
    }
}

// traer todos los productos con paginacion
async function getAllProducts(req, res) {
    try {
        // obtener parametros de query
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort;
        const query = req.query.query;

        const result = await productService.getProductsWithFilters(limit, page, sort, query);

        // armar respuesta con formato solicitado
        const response = {
            status: 'success',
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}` : null,
            nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}` : null
        };

        console.log('productos obtenidos:', result.docs.length);
        res.json(response);
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
}

// traer producto por id
async function getProductById(req, res) {
    try {
        const prod = await productService.getProductById(req.params.pid);
        res.json({ status: 'success', data: prod });
    } catch (error) {
        res.status(404).json({ status: 'error', message: error.message });
    }
}

// actualizar producto
async function updateProduct(req, res) {
    try {
        const prod = await productService.updateProduct(req.params.pid, req.body);
        res.json({ status: 'success', data: prod });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
}

// borrar producto
async function deleteProduct(req, res) {
    try {
        await productService.deleteProduct(req.params.pid);
        console.log('producto eliminado');
        res.json({ status: 'success', message: 'producto eliminado' });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
}

export default {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};

