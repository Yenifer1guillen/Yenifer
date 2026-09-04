const cartCount = document.getElementById('cart-count');
const CLAVE_CARRITO = 'huellasEstiloCarrito';

function obtenerCarrito() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
  } catch (error) {
    return [];
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  actualizarContador();
}

function actualizarContador() {
  const carrito = obtenerCarrito();

  const cantidadTotal = carrito.reduce(
    (total, producto) => total + Number(producto.cantidad || 0),
    0
  );

  if (cartCount) {
    cartCount.textContent = cantidadTotal;
  }
}

document.querySelectorAll('.btn-order-postre').forEach(button => {
  button.addEventListener('click', () => {

    const producto = {
      id: button.dataset.id,
      nombre: button.dataset.name,
      precio: Number(button.dataset.precio),
      imagen: button.dataset.imagen || '',
      cantidad: 1
    };

    const carrito = obtenerCarrito();

    const existente = carrito.find(
      item => String(item.id) === String(producto.id)
    );

    if (existente) {
      existente.cantidad++;
    } else {
      carrito.push(producto);
    }

    guardarCarrito(carrito);

    const textoOriginal = button.textContent;
    button.textContent = '✓ Agregado';

    setTimeout(() => {
      button.textContent = textoOriginal;
    }, 900);
  });
});

actualizarContador();
