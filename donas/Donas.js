const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.donut-card');
const countEl = document.getElementById('cart-count');
const toast = document.getElementById('toast');

let count = 0;
let toastTimer;

filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filter = button.dataset.filter;

    cards.forEach(card => {
      const category = card.dataset.category;
      card.classList.toggle(
        'hidden',
        filter !== 'todas' && category !== filter
      );
    });
  });
});

document.querySelectorAll('.add').forEach(button => {
  button.addEventListener('click', () => {
    count++;
    countEl.textContent = count;

    toast.textContent = `${button.dataset.name} agregada al carrito 🍩`;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 1700);
  });
});

document.querySelectorAll('.box-btn').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.box-btn').forEach(btn => {
      btn.classList.remove('active');
    });

    button.classList.add('active');

    document.getElementById('box-result').innerHTML =
      `Caja seleccionada: <strong>${button.dataset.box} donas</strong> 🍩`;
  });
});
