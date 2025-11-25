import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import ProductManager from './managers/ProductManager.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

const httpServer = createServer(app);
const io = new Server(httpServer);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.set('io', io);

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

const productManager = new ProductManager('./data/products.json');

io.on('connection', (socket) => {
    console.log('cliente conectado');

    // agregar producto
    socket.on('addProduct', async (data) => {
        try {
            await productManager.addProduct(data);
            const prods = await productManager.getProducts();
            io.emit('updateProducts', prods);
        } catch (error) {
            console.log('error al agregar:', error.message);
            socket.emit('error', error.message);
        }
    });

    // borrar producto
    socket.on('deleteProduct', async (id) => {
        try {
            await productManager.deleteProduct(id);
            const prods = await productManager.getProducts();
            io.emit('updateProducts', prods);
        } catch (error) {
            socket.emit('error', error.message);
        }
    });

    socket.on('disconnect', () => {
        console.log('cliente desconectado');
    });
});

httpServer.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});

