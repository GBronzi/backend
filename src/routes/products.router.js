import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./data/products.json');

// traer todos los productos
router.get('/', async (req, res) => {
    try {
        const prods = await productManager.getProducts();
        console.log('productos obtenidos:', prods.length);
        res.json({ status: 'success', data: prods });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// traer producto por id
router.get('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const prod = await productManager.getProductById(id);

        if (!prod) {
            return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        }

        res.json({ status: 'success', data: prod });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// crear producto
router.post('/', async (req, res) => {
    try {
        const newProduct = await productManager.addProduct(req.body);

        const io = req.app.get('io');
        if (io) {
            const prods = await productManager.getProducts();
            io.emit('updateProducts', prods);
        }

        res.status(201).json({ status: 'success', data: newProduct });
    } catch (error) {
        console.log('error al crear producto:', error.message);
        res.status(400).json({ status: 'error', message: error.message });
    }
});

// actualizar producto
router.put('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        const actualizado = await productManager.updateProduct(id, req.body);

        const io = req.app.get('io');
        if (io) {
            const prods = await productManager.getProducts();
            io.emit('updateProducts', prods);
        }

        res.json({ status: 'success', data: actualizado });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
});

// borrar producto
router.delete('/:pid', async (req, res) => {
    try {
        const id = parseInt(req.params.pid);
        await productManager.deleteProduct(id);

        const io = req.app.get('io');
        if (io) {
            const prods = await productManager.getProducts();
            io.emit('updateProducts', prods);
        }

        res.json({ status: 'success', message: 'Producto eliminado' });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
});

export default router;

