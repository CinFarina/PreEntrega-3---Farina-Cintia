// Variables para almacenar los productos del carrito y el total
let carrito = [];
let total = 0;

// Seleccionar los elementos del DOM
const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
const listaCarrito = document.getElementById('carrito');
const totalElemento = document.getElementById('total');
const mensajeElemento = document.getElementById('mensaje');
const botonFinalizarCompra = document.getElementById('finalizar-compra');
const botonCancelarCompra = document.getElementById('cancelar-compra');
const botonDeshacerMovimiento = document.getElementById('deshacer-movimiento');

// Cargar el carrito desde localStorage al iniciar
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        total = carrito.reduce((acc, item) => acc + item.precio, 0); // Calcular total
        actualizarCarrito();
    }
}

// Función para agregar producto al carrito
botonesAgregarCarrito.forEach(boton => 
    boton.addEventListener('click', e => {
        const producto = e.target.dataset.producto;
        const precio = parseFloat(e.target.dataset.precio);

        // Agregar producto al carrito
        carrito.push({ producto, precio });

        // Actualizar total
        total += precio;

        // Guardar el carrito en localStorage
        localStorage.setItem('carrito', JSON.stringify(carrito));

        // Actualizar la vista del carrito
        actualizarCarrito();
    })
);

// Función para actualizar el carrito en el DOM
const actualizarCarrito = () => {
    listaCarrito.innerHTML = carrito.map(item => `<li>${item.producto} - $${item.precio.toFixed(2)}</li>`).join('');
    totalElemento.textContent = total.toFixed(2);
    mensajeElemento.textContent = "";  // Limpiar el mensaje al actualizar
};

// Función para finalizar la compra
botonFinalizarCompra.addEventListener('click', () => {
    carrito = [];
    total = 0;

    // Limpiar localStorage
    localStorage.removeItem('carrito');

    // Actualizar la vista del carrito y mostrar mensaje de finalización
    actualizarCarrito();
    mensajeElemento.textContent = "Compra finalizada. ¡Gracias por tu compra!";
});

// Función para cancelar toda la compra
botonCancelarCompra.addEventListener('click', () => {
    carrito = [];
    total = 0;

    // Limpiar localStorage
    localStorage.removeItem('carrito');

    // Actualizar la vista del carrito y mostrar mensaje de cancelación
    actualizarCarrito();
    mensajeElemento.textContent = "Compra cancelada.";
});

// Función para deshacer el último movimiento
botonDeshacerMovimiento.addEventListener('click', () => {
   const ultimoProducto = carrito.pop() ?? null; // Si no hay productos, no hace nada

   // Si hay un producto, restar su precio del total
   if (ultimoProducto) {
       total -= ultimoProducto.precio;
       mensajeElemento.textContent = `Último producto eliminado: ${ultimoProducto.producto}.`;

       // Guardar el nuevo estado del carrito en localStorage
       localStorage.setItem('carrito', JSON.stringify(carrito));
   } else {
       mensajeElemento.textContent = "No hay productos para deshacer.";
   }

   // Actualizar la vista del carrito después de deshacer movimiento
   actualizarCarrito();
});

// Cargar el carrito al iniciar la página
cargarCarrito();
