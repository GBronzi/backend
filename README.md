# Proyecto Backend - Productos y Carritos

Servidor con Node.js, Express, Handlebars y WebSockets

## Instalación

```bash
npm install
npm start
```

Servidor: `http://localhost:8080`

## Estructura

```
src/
├── managers/
│   ├─ ProductManager.js
│   └─ CartManager.js
├── routes/
│   ├─ products.router.js
│   ├─ carts.router.js
│   └─ views.router.js
├── views/
│   ├── layouts/
│   │   └─ main.handlebars
│   ├─ home.handlebars
│   └─ realTimeProducts.handlebars
└── app.js
data/
├── products.json
└── carts.json
public/
├── styles.css
├── realtime.css
└── realtime.js
```

## Vistas

- `/` - Lista de productos
- `/realtimeproducts` - Productos en tiempo real

Ejemplo:
```json
{
  "title": "Producto",
  "description": "Descripción",
  "code": "ABC123",
  "price": 100,
  "stock": 50,
  "category": "Categoría"
}
```

## Funcionalidades

- CRUD de productos
- Gestión de carritos
- Persistencia en JSON
- Handlebars para vistas
- WebSockets con Socket.io
- Actualización en tiempo real
- SweetAlert2 para alertas
- Archivos estáticos en public

## Tecnologías

- Node.js
- Express
- Handlebars
- Socket.io
- SweetAlert2

