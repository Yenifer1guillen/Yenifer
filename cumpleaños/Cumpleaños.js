const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.cake-card');
const cartCount = document.getElementById('cart-count');
const toast = document.getElementById('toast');

const ageInput = document.getElementById('age-input');
const ageBtn = document.getElementById('age-btn');
const candlesResult = document.getElementById('candles-result');

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

// SIMULADOR DE VELITAS
if (ageBtn) {
  ageBtn.addEventListener('click', () => {
    let edad = Number(ageInput.value);

    if (!edad || edad < 1) {
      edad = 1;
      ageInput.value = 1;
    }

    if (edad > 100) {
      edad = 100;
      ageInput.value = 100;
    }

    candlesResult.innerHTML =
      `🎂 <strong>${edad} ${edad === 1 ? 'velita' : 'velitas'}</strong> listas para pedir un deseo.`;
  });
}

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
      existente.cantidad++;
    } else {
      carrito.push(producto);
    }

    guardarCarrito(carrito);

    if (toast) {
      toast.textContent = `${producto.nombre} agregado al carrito 🎂`;
      toast.classList.add('show');

      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 1800);
    }
  });
});

actualizarContador();
