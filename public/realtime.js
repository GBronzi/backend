const socket = io();

// formulario para agregar productos
document.getElementById('addProductForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const prod = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        code: document.getElementById('code').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value),
        category: document.getElementById('category').value
    };

    console.log('enviando producto:', prod);
    socket.emit('addProduct', prod);
    e.target.reset();
});

// funcion para borrar producto
function deleteProduct(id) {
    const swalBotones = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    swalBotones.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "No, cancelar",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            console.log('eliminando producto:', id);
            socket.emit('deleteProduct', id);
            swalBotones.fire({
                title: "¡Eliminado!",
                text: "El producto ha sido eliminado.",
                icon: "success"
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalBotones.fire({
                title: "Cancelado",
                text: "El producto está a salvo :)",
                icon: "error"
            });
        }
    });
}

// escuchar actualizaciones de productos
socket.on('updateProducts', (prods) => {
    const productsList = document.getElementById('productsList');

    if (prods.length === 0) {
        productsList.innerHTML = `
            <div class="empty-message">
                <p>No hay productos disponibles</p>
                <p style="font-size: 0.9em; margin-top: 10px;">Agrega un producto usando el formulario</p>
            </div>
        `;
    } else {
        productsList.innerHTML = prods.map(p => `
            <div class="product-card" data-id="${p.id}">
                <h3>${p.title}</h3>
                <p>${p.description}</p>
                <div class="price">$${p.price}</div>
                <div>
                    <span class="badge badge-code">Código: ${p.code}</span>
                    <span class="badge badge-category">${p.category}</span>
                    <span class="badge badge-stock">Stock: ${p.stock}</span>
                </div>
                <p style="margin-top: 10px; font-size: 0.9em;">
                    <strong>ID:</strong> ${p.id}</p>
                <button class="btn-delete" onclick="deleteProduct(${p.id})">🗑️ Eliminar</button>
            </div>
        `).join('');
    }
});

// mostrar errores
socket.on('error', (msg) => {
    console.log('error:', msg);
    Swal.fire({
        title: 'Error',
        text: msg,
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#f44336'
    });
});

// mostrar mensajes de exito
socket.on('success', (msg) => {
    Swal.fire({
        title: '¡Éxito!',
        text: msg,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#4caf50',
        timer: 2000
    });
});

