import { Router } from 'express';
import productRoutes from './productRoutes.js';
import cartRoutes from './cartRoutes.js';

const router = Router();

// rutas de productos
router.use('/products', productRoutes);

// rutas de carritos
router.use('/carts', cartRoutes);

export default router;

