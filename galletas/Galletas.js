const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.cookie-card');
const cartCount = document.getElementById('cart-count');
const toast = document.getElementById('toast');
const boxButtons = document.querySelectorAll('.box-btn');
const boxResult = document.getElementById('box-result');

const CLAVE_CARRITO = 'huellasEstiloCarrito';
let toastTimer;

// FILTROS
filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    cards.forEach(card => {
      const category = card.dataset.category;
      card.classList.toggle(
        'hidden',
        filter !== 'todos' && category !== filter
      );
    });
  });
});

// CAJA DE 4, 6 O 12
boxButtons.forEach(button => {
  button.addEventListener('click', () => {
    boxButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const cantidad = button.dataset.box;

    if (boxResult) {
      boxResult.innerHTML =
        `Caja seleccionada: <b>${cantidad} galletas</b> 🍪`;
    }
  });
});

// CARRITO
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

document.querySelectorAll('.add').forEach(button => {
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

    if (toast) {
      toast.textContent = `${producto.nombre} agregada al carrito 🍪`;
      toast.classList.add('show');

      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 1800);
    }
  });
});

actualizarContador();
