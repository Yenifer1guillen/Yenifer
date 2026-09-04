/* =========================
   BUSCADOR DE EVENTOS
========================= */

function buscarEventos() {

    const texto =
        document
        .getElementById("buscar")
        .value
        .toLowerCase();

    const categoria =
        document
        .getElementById("categoria")
        .value;

    const eventos =
        document.querySelectorAll(".evento");

    let encontrados = 0;


    eventos.forEach(function(evento) {

        const nombre =
            evento
            .dataset
            .nombre
            .toLowerCase();

        const tipo =
            evento
            .dataset
            .categoria;


        const coincideNombre =
            nombre.includes(texto);

        const coincideCategoria =
            categoria === "todos" ||
            tipo === categoria;


        if (
            coincideNombre &&
            coincideCategoria
        ) {

            evento.style.display = "block";

            encontrados++;

        } else {

            evento.style.display = "none";

        }

    });


    if (encontrados === 0) {

        document
        .getElementById("sinResultados")
        .style.display = "block";

    } else {

        document
        .getElementById("sinResultados")
        .style.display = "none";

    }

}


/* =========================
   FILTRAR CATEGORÍA
========================= */

function filtrarCategoria(categoria) {

    document
    .getElementById("categoria")
    .value = categoria;

    buscarEventos();

    document
    .getElementById("eventos")
    .scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================
   MOSTRAR DETALLES
========================= */

function mostrarEvento(
    titulo,
    fecha,
    hora,
    lugar
) {

    document
    .getElementById("modalTitulo")
    .textContent = titulo;

    document
    .getElementById("modalFecha")
    .textContent = fecha;

    document
    .getElementById("modalHora")
    .textContent = hora;

    document
    .getElementById("modalLugar")
    .textContent = lugar;


    document
    .getElementById("modal")
    .classList.add("activo");

}


/* =========================
   CERRAR MODAL
========================= */

function cerrarModal() {

    document
    .getElementById("modal")
    .classList.remove("activo");

}


/* =========================
   CERRAR MODAL AL
   HACER CLICK AFUERA
========================= */

document
.getElementById("modal")
.addEventListener("click", function(event) {

    if (event.target === this) {

        cerrarModal();

    }

});


/* =========================
   TECLA ESC
========================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            cerrarModal();

        }

    }
);