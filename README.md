# Proyecto Backend - E-commerce

Sistema de productos y carritos con Node.js, Express, MongoDB y WebSockets

## Instalación

```bash
npm install
npm start
```

Servidor: `http://localhost:8080`

## Tecnologías

- Node.js + Express
- MongoDB Atlas + Mongoose
- Handlebars
- Socket.io
- Bootstrap 5
- SweetAlert2

## Estructura del Proyecto

```
src/
├── app.js              
├── views/              
│   ├── layouts/
│   ├── products.handlebars
│   ├── productDetail.handlebars
│   ├── cart.handlebars
│   └── realTimeProducts.handlebars
routes/
├── productRoutes.js    
├── cartRoutes.js       
└── viewsRoutes.js     
controllers/
├── productController.js
└── cartController.js
services/
├── productService.js
└── cartService.js
dao/
├── productDao.js
└── cartDao.js
models/
├── product.model.js
└── cart.model.js
public/
├── styles.css
├── realtime.css
└── realtime.js
```


## Vistas

- `/` - Inicio
- `/products` - Lista de productos con paginación
- `/products/:pid` - Detalle del producto
- `/carts/:cid` - Vista del carrito
- `/realtimeproducts` - Productos en tiempo real (agregar/eliminar)

## Funcionalidades

✅ CRUD completo de productos
✅ Gestión de carritos
✅ Paginación y filtros
✅ Persistencia en MongoDB
✅ Actualización en tiempo real con WebSockets
✅ Carrito funcional con localStorage
✅ Alertas con SweetAlert2
✅ Diseño responsive con Bootstrap
