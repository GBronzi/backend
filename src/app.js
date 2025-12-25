import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import { createServer } from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import routes from '../routes/index.js';
import productService from '../services/productService.js';
import viewsRouter from './routes/views.router.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

// conexion a mongodb
mongoose
.connect('mongodb+srv://gbronzi91_db_user:t7XHxcZ5mKvNt280@cluster0.v9srikr.mongodb.net/ProductosGbronzi?retryWrites=true&w=majority')
.then(() => console.log('conectado a mongodb'))
.catch((err) => console.error('error al conectar a mongodb:', err));

const httpServer = createServer(app);
const io = new Server(httpServer);

// configuracion handlebars con helpers
app.engine('handlebars', engine({
    helpers: {
        multiply: (a, b) => a * b
    },
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.set('io', io);

// rutas api con arquitectura MVC + DAO + Service
app.use('/api', routes);

// rutas de vistas (handlebars)
app.use('/', viewsRouter);

// websockets para tiempo real
io.on('connection', (socket) => {
    console.log('cliente conectado');

    // agregar producto
    socket.on('addProduct', async (data) => {
        try {
            await productService.createProduct(data);
            const prods = await productService.getAllProducts();
            io.emit('updateProducts', prods);
        } catch (error) {
            console.log('error al agregar:', error.message);
            socket.emit('error', error.message);
        }
    });

    // borrar producto
    socket.on('deleteProduct', async (id) => {
        try {
            await productService.deleteProduct(id);
            const prods = await productService.getAllProducts();
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

