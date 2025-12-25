import { Router } from 'express';
import productController from '../controllers/productController.js';

const router = Router();

// traer todos los productos
router.get('/', (req, res) => {
    productController.getAllProducts(req, res);
});

// traer producto por id
router.get('/:pid', (req, res) => {
    productController.getProductById(req, res);
});

// crear producto
router.post('/', (req, res) => {
    productController.createProduct(req, res);
});

// actualizar producto
router.put('/:pid', (req, res) => {
    productController.updateProduct(req, res);
});

// borrar producto
router.delete('/:pid', (req, res) => {
    productController.deleteProduct(req, res);
});

export default router;

