const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('open');
});

const searchBtn = document.getElementById('searchBtn');
const searchModal = document.getElementById('searchModal');
const closeSearch = document.getElementById('closeSearch');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

const paginas = [
  { nombre: 'Pasteles', url: 'Pasteles/Pasteles.html' },
  { nombre: 'Postres', url: 'Postres/Postres.html' },
  { nombre: 'Galletas', url: 'Galletas/Galletas.html' },
  { nombre: 'Cupcakes', url: 'Cupcakes/Cupcakes.html' },
  { nombre: 'Donas', url: 'Donas/Donas.html' },
  { nombre: 'Cumpleaños', url: 'Cumpleaños/Cumpleaños.html' },
  { nombre: 'Aniversarios', url: 'Aniversarios/Aniversarios.html' }
];

searchBtn?.addEventListener('click', () => {
  searchModal.classList.add('open');
  setTimeout(() => searchInput.focus(), 100);
});

closeSearch?.addEventListener('click', () => {
  searchModal.classList.remove('open');
});

searchModal?.addEventListener('click', (e) => {
  if (e.target === searchModal) {
    searchModal.classList.remove('open');
  }
});

searchInput?.addEventListener('input', () => {
  const texto = searchInput.value.trim().toLowerCase();

  if (!texto) {
    searchResults.innerHTML = '';
    return;
  }

  const encontrados = paginas.filter(item =>
    item.nombre.toLowerCase().includes(texto)
  );

  searchResults.innerHTML = encontrados.length
    ? encontrados.map(item =>
        `<a class="search-result" href="${item.url}">${item.nombre} →</a>`
      ).join('')
    : '<div class="search-result">No encontré nada con ese nombre 😢</div>';
});

// Si una imagen todavía no existe, dejamos visible el texto de referencia.
// Cuando coloques el archivo correcto, la imagen aparecerá encima.
document.querySelectorAll('.hero-image img, .collection-image img, .pairing-image img')
  .forEach(img => {
    img.addEventListener('error', () => {
      img.style.display = 'none';
    });
  });
 

// =======================================================
// CARRITO GLOBAL · CHOPPY SWEETS
// Este mismo bloque puede copiarse a los JS de las páginas
// de productos. El carrito queda guardado en localStorage.
// =======================================================

const CLAVE_CARRITO = 'choppySweetsCarrito';

function obtenerCarrito(){
  try{
    return JSON.parse(localStorage.getItem(CLAVE_CARRITO)) || [];
  }catch(error){
    return [];
  }
}

function guardarCarrito(carrito){
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  actualizarContadorCarrito();
}

function agregarAlCarrito(producto){
  const carrito = obtenerCarrito();
  const existente = carrito.find(item => String(item.id) === String(producto.id));

  if(existente){
    existente.cantidad += Number(producto.cantidad || 1);
  }else{
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: Number(producto.precio),
      imagen: producto.imagen || '',
      cantidad: Number(producto.cantidad || 1)
    });
  }

  guardarCarrito(carrito);
}

function actualizarContadorCarrito(){
  const contador = document.getElementById('cartCount');
  if(!contador) return;

  const total = obtenerCarrito().reduce(
    (suma, producto) => suma + Number(producto.cantidad || 0),
    0
  );

  contador.textContent = total;
}

// Automático: funciona con cualquier botón que tenga esta forma:
// <button class="agregar-carrito"
//   data-id="pastel-1"
//   data-nombre="Pastel de fresa"
//   data-precio="15.00"
//   data-imagen="Pastel1.jfif">Agregar al carrito</button>
document.querySelectorAll('.agregar-carrito').forEach(boton => {
  boton.addEventListener('click', () => {
    agregarAlCarrito({
      id: boton.dataset.id,
      nombre: boton.dataset.nombre,
      precio: boton.dataset.precio,
      imagen: boton.dataset.imagen,
      cantidad: 1
    });

    const textoOriginal = boton.textContent;
    boton.textContent = '✓ Agregado';
    boton.disabled = true;

    setTimeout(() => {
      boton.textContent = textoOriginal;
      boton.disabled = false;
    }, 900);
  });
});

actualizarContadorCarrito();
