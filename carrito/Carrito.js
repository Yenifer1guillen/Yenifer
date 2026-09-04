const CLAVE_CARRITO = 'choppySweetsCarrito';
const NUMERO_WHATSAPP = '50300000000';

const cartItems = document.getElementById('cartItems');
const emptyCart = document.getElementById('emptyCart');
const productCount = document.getElementById('productCount');
const subtotalEl = document.getElementById('subtotal');
const totalEl = document.getElementById('total');
const buyBtn = document.getElementById('buyBtn');
const clearBtn = document.getElementById('clearBtn');

const checkoutModal = document.getElementById('checkoutModal');
const closeCheckout = document.getElementById('closeCheckout');
const checkoutProducts = document.getElementById('checkoutProducts');
const checkoutTotal = document.getElementById('checkoutTotal');
const whatsappBtn = document.getElementById('whatsappBtn');

function obtenerCarrito() {
  try {
    const datos = JSON.parse(localStorage.getItem(CLAVE_CARRITO));
    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    console.error('No se pudo leer el carrito:', error);
    return [];
  }
}

function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  renderizarCarrito();
}

function dinero(valor) {
  return Number(valor || 0).toFixed(2);
}

function totalProductos(carrito) {
  return carrito.reduce((suma, item) => {
    return suma + Number(item.cantidad || 1);
  }, 0);
}

function subtotalCarrito(carrito) {
  return carrito.reduce((suma, item) => {
    return suma +
      Number(item.precio || 0) *
      Number(item.cantidad || 1);
  }, 0);
}

function renderizarCarrito() {

  const carrito = obtenerCarrito();

  cartItems.innerHTML = '';

  if (carrito.length === 0) {

    emptyCart.style.display = 'block';

    productCount.textContent = '0 productos';
    subtotalEl.textContent = '0.00';
    totalEl.textContent = '0.00';

    buyBtn.disabled = true;
    clearBtn.disabled = true;

    return;
  }

  emptyCart.style.display = 'none';

  buyBtn.disabled = false;
  clearBtn.disabled = false;

  carrito.forEach((producto, index) => {

    const cantidad =
      Number(producto.cantidad || 1);

    const precio =
      Number(producto.precio || 0);

    const subtotalProducto =
      precio * cantidad;

    const item =
      document.createElement('article');

    item.className = 'cart-item';

    const imagen = producto.imagen
      ? `
        <img
          src="${producto.imagen}"
          alt="${producto.nombre || 'Producto'}"
        >
      `
      : `
        <div class="item-placeholder">
          🧁
        </div>
      `;

    item.innerHTML = `

      ${imagen}

      <div class="item-info">

        <h3>
          ${producto.nombre || 'Producto'}
        </h3>

        <p>
          $${dinero(precio)} c/u
        </p>

        <div class="qty">

          <button
            type="button"
            class="restar"
            data-index="${index}">
            −
          </button>

          <strong>
            ${cantidad}
          </strong>

          <button
            type="button"
            class="sumar"
            data-index="${index}">
            +
          </button>

        </div>

      </div>

      <div class="item-side">

        <strong>
          $${dinero(subtotalProducto)}
        </strong>

        <button
          type="button"
          class="remove"
          data-index="${index}">
          Eliminar
        </button>

      </div>

    `;

    cartItems.appendChild(item);

  });

  const cantidadTotal =
    totalProductos(carrito);

  const subtotal =
    subtotalCarrito(carrito);

  productCount.textContent =
    `${cantidadTotal} ${
      cantidadTotal === 1
        ? 'producto'
        : 'productos'
    }`;

  subtotalEl.textContent =
    dinero(subtotal);

  totalEl.textContent =
    dinero(subtotal);


  document
    .querySelectorAll('.sumar')
    .forEach(btn => {

      btn.addEventListener(
        'click',
        () => {

          cambiarCantidad(
            Number(btn.dataset.index),
            1
          );

        }
      );

    });


  document
    .querySelectorAll('.restar')
    .forEach(btn => {

      btn.addEventListener(
        'click',
        () => {

          cambiarCantidad(
            Number(btn.dataset.index),
            -1
          );

        }
      );

    });


  document
    .querySelectorAll('.remove')
    .forEach(btn => {

      btn.addEventListener(
        'click',
        () => {

          eliminarProducto(
            Number(btn.dataset.index)
          );

        }
      );

    });

}


function cambiarCantidad(index, cambio) {

  const carrito =
    obtenerCarrito();

  if (!carrito[index]) {
    return;
  }

  carrito[index].cantidad =
    Number(
      carrito[index].cantidad || 1
    ) + cambio;

  if (
    carrito[index].cantidad < 1
  ) {

    carrito[index].cantidad = 1;

  }

  guardarCarrito(carrito);

}


function eliminarProducto(index) {

  const carrito =
    obtenerCarrito();

  carrito.splice(index, 1);

  guardarCarrito(carrito);

}


clearBtn.addEventListener(
  'click',
  () => {

    localStorage.removeItem(
      CLAVE_CARRITO
    );

    renderizarCarrito();

  }
);


buyBtn.addEventListener(
  'click',
  () => {

    const carrito =
      obtenerCarrito();

    if (
      carrito.length === 0
    ) {

      return;

    }

    checkoutProducts.innerHTML =
      carrito.map(producto => `

        <div class="checkout-line">

          <span>
            ${producto.nombre}
            ×
            ${producto.cantidad || 1}
          </span>

          <strong>
            $${dinero(
              Number(
                producto.precio || 0
              ) *
              Number(
                producto.cantidad || 1
              )
            )}
          </strong>

        </div>

      `).join('');

    checkoutTotal.textContent =
      dinero(
        subtotalCarrito(carrito)
      );

    checkoutModal
      .classList
      .add('open');

    checkoutModal
      .setAttribute(
        'aria-hidden',
        'false'
      );

  }
);


closeCheckout.addEventListener(
  'click',
  () => {

    checkoutModal
      .classList
      .remove('open');

    checkoutModal
      .setAttribute(
        'aria-hidden',
        'true'
      );

  }
);


checkoutModal.addEventListener(
  'click',
  event => {

    if (
      event.target === checkoutModal
    ) {

      checkoutModal
        .classList
        .remove('open');

      checkoutModal
        .setAttribute(
          'aria-hidden',
          'true'
        );

    }

  }
);


whatsappBtn.addEventListener(
  'click',
  () => {

    const carrito =
      obtenerCarrito();

    if (
      carrito.length === 0
    ) {

      return;

    }

    const lineas =
      carrito.map(producto => {

        const cantidad =
          Number(
            producto.cantidad || 1
          );

        const subtotal =
          Number(
            producto.precio || 0
          ) * cantidad;

        return (
          `• ${producto.nombre} ` +
          `x${cantidad} — ` +
          `$${dinero(subtotal)}`
        );

      });


    const mensaje = [

      'Hola, quiero realizar este pedido en Choppy Sweets 🧁',

      '',

      ...lineas,

      '',

      `Total: $${dinero(
        subtotalCarrito(carrito)
      )}`

    ].join('\n');


    window.open(

      `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`,

      '_blank'

    );

  }
);


renderizarCarrito();
