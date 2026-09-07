const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.cake-card');
const cartCount = document.getElementById('cart-count');
const toast = document.getElementById('toast');

const yearsInput = document.getElementById('years-input');
const loveBtn = document.getElementById('love-btn');
const loveResult = document.getElementById('love-result');

const messageInput = document.getElementById('message-input');
const messageBtn = document.getElementById('message-btn');
const loveLetter = document.getElementById('love-letter');

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

// CALCULADORA DE ANIVERSARIO
if (loveBtn) {
  loveBtn.addEventListener('click', () => {
    let years = Number(yearsInput.value);

    if (!years || years < 1) {
      years = 1;
      yearsInput.value = 1;
    }

    let mensaje;

    if (years === 1) {
      mensaje = 'Están creando recuerdos desde hace 1 año. 💕';
    } else if (years < 5) {
      mensaje = `¡${years} años juntos! Ya tienen bastantes recuerdos bonitos. 💗`;
    } else if (years < 10) {
      mensaje = `¡${years} años! Eso ya merece pastel grande JAJAJA 🎂💕`;
    } else {
      mensaje = `¡${years} años juntos! Eso sí es una historia de amor. ✨💗`;
    }

    loveResult.innerHTML = `
      <strong>¡Qué bonito! ✨</strong>
      <span>${mensaje}</span>
    `;
  });
}

// TARJETA / DEDICATORIA
if (messageBtn) {
  messageBtn.addEventListener('click', () => {
    const mensaje = messageInput.value.trim();

    if (!mensaje) {
      loveLetter.innerHTML = `
        <small>PARA MI PERSONA FAVORITA</small>
        <p>Escribí primero una dedicatoria 💗</p>
        <span>— Choppy Sweets</span>
      `;
      return;
    }

    const p = document.createElement('p');
    p.textContent = mensaje;

    loveLetter.innerHTML = `
      <small>PARA MI PERSONA FAVORITA</small>
    `;
    loveLetter.appendChild(p);
    loveLetter.insertAdjacentHTML(
      'beforeend',
      '<span>— Choppy Sweets</span>'
    );
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
      toast.textContent = `${producto.nombre} agregado al carrito 💗`;
      toast.classList.add('show');

      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 1800);
    }
  });
});

actualizarContador();
