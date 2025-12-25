import { Router } from 'express';
import productService from '../../services/productService.js';
import cartService from '../../services/cartService.js';

const router = Router();

// pagina de inicio
router.get('/', async (req, res) => {
    try {
        const prods = await productService.getAllProducts();
        res.render('home', { products: prods });
    } catch (error) {
        res.status(500).send('Error');
    }
});

// pagina de productos con paginacion
router.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort;
        const query = req.query.query;

        const result = await productService.getProductsWithFilters(limit, page, sort, query);

        res.render('products', {
            products: result.docs,
            totalPages: result.totalPages,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage
        });
    } catch (error) {
        res.status(500).send('Error');
    }
});

// detalle de producto
router.get('/products/:pid', async (req, res) => {
    try {
        const prod = await productService.getProductById(req.params.pid);
        res.render('productDetail', { product: prod });
    } catch (error) {
        res.status(500).send('Error');
    }
});

// ver carrito
router.get('/carts/:cid', async (req, res) => {
    try {
        const cart = await cartService.getCartById(req.params.cid);
        res.render('cart', { cart: cart });
    } catch (error) {
        res.status(500).send('Error');
    }
});

// pagina de productos en tiempo real
router.get('/realtimeproducts', async (req, res) => {
    try {
        const prods = await productService.getAllProducts();
        res.render('realTimeProducts', { products: prods });
    } catch (error) {
        res.status(500).send('Error');
    }
});

export default router;

