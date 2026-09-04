const authShell = document.getElementById('authShell');

const goRegister = document.getElementById('goRegister');
const goLogin = document.getElementById('goLogin');
const mobileGoRegister = document.getElementById('mobileGoRegister');
const mobileGoLogin = document.getElementById('mobileGoLogin');

function showRegister(){
  authShell.classList.add('register-mode');
}

function showLogin(){
  authShell.classList.remove('register-mode');
}

goRegister.addEventListener('click', showRegister);
goLogin.addEventListener('click', showLogin);
mobileGoRegister.addEventListener('click', showRegister);
mobileGoLogin.addEventListener('click', showLogin);

/* Mostrar / ocultar contraseña */
document.querySelectorAll('.show-pass').forEach(button => {
  button.addEventListener('click', () => {
    const input = document.getElementById(button.dataset.target);

    if(input.type === 'password'){
      input.type = 'text';
      button.textContent = '🙈';
    }else{
      input.type = 'password';
      button.textContent = '👁';
    }
  });
});

/* Fuerza de contraseña */
const registerPassword = document.getElementById('registerPassword');
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');

registerPassword.addEventListener('input', () => {
  const value = registerPassword.value;
  let score = 0;

  if(value.length >= 6) score++;
  if(/[A-Z]/.test(value)) score++;
  if(/[0-9]/.test(value)) score++;
  if(/[^A-Za-z0-9]/.test(value)) score++;

  const widths = ['0%', '28%', '52%', '76%', '100%'];
  const texts = [
    'Escribe una contraseña',
    'Contraseña débil',
    'Contraseña aceptable',
    'Contraseña buena',
    'Contraseña fuerte 🍰'
  ];

  strengthFill.style.width = widths[score];
  strengthText.textContent = texts[score];
});

/* Formularios de demostración */
const toast = document.getElementById('toast');
let toastTimer;

function showToast(message){
  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

document.getElementById('loginForm').addEventListener('submit', event => {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  if(!email || password.length < 6){
    showToast('Revisa tu correo y contraseña 🍓');
    return;
  }

  showToast('Inicio de sesión correcto 🍰✨');
});

document.getElementById('registerForm').addEventListener('submit', event => {
  event.preventDefault();

  const name = document.getElementById('registerName').value.trim();
  const email = document.getElementById('registerEmail').value.trim();
  const password = registerPassword.value;
  const terms = document.getElementById('terms').checked;

  if(name.length < 3 || !email || password.length < 6 || !terms){
    showToast('Completa correctamente todos los campos 🧁');
    return;
  }

  showToast(`¡Bienvenido/a, ${name}! Tu cuenta fue creada 💗`);

  setTimeout(() => {
    showLogin();
  }, 1000);
});
