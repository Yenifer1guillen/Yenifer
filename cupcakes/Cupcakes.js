const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.cupcake-card');
const cartCount = document.getElementById('cart-count');
const toast = document.getElementById('toast');

const packButtons = document.querySelectorAll('.pack');
const packResult = document.getElementById('pack-result');

const CLAVE_CARRITO = 'choppySweetsCarrito';
let toastTimer;

// ------------------------------
// FILTROS
// ------------------------------
filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    cards.forEach(card => {
      const category = card.dataset.category;

      const mostrar =
        filter === 'todos' ||
        category === filter;

      card.style.display = mostrar ? '' : 'none';
    });
  });
});

// ------------------------------
// ARMA TU PACK
// ------------------------------
packButtons.forEach(button => {
  button.addEventListener('click', () => {
    packButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const cantidad = button.dataset.pack;

    if (packResult) {
      packResult.innerHTML =
        `Tu cajita: <strong>${cantidad} cupcakes</strong> 🧁`;
    }
  });
});

// ------------------------------
// CARRITO CHOPPY SWEETS
// ------------------------------
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

  const total = carrito.reduce(
    (suma, producto) => suma + Number(producto.cantidad || 0),
    0
  );

  if (cartCount) {
    cartCount.textContent = total;
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
      existente.cantidad += 1;
    } else {
      carrito.push(producto);
    }

    guardarCarrito(carrito);

    if (toast) {
      toast.textContent = `${producto.nombre} agregado al carrito 🧁`;
      toast.classList.add('show');

      clearTimeout(toastTimer);

      toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 1800);
    }
  });
});

actualizarContador();
