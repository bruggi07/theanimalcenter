'use strict';
// Carrusel nosotros
let cargaDeProf = async () => {
    let URL = './js/JSON/nuestros_profesionales.json';
    let solicitud = new Request(URL);
    let resp = await fetch(solicitud);
    let publi = await resp.json();
    return publi;
}
let publi = await cargaDeProf();
const gruposDeProfesionales = publi.reduce((acumulador, current, index, array) => {
    const grupoActual = acumulador[acumulador.length - 1]; // Obtenemos el grupo actual

    if (grupoActual && grupoActual.length < 4) {
        // Si el grupo actual tiene menos de 4 elementos, agregamos el elemento actual
        grupoActual.push(current);
    } else {
        // Si no, creamos un nuevo grupo y agregamos el elemento actual
        acumulador.push([current]);
    }

    // Verificamos si estamos en el último elemento del arreglo
    if (index === array.length - 1) {
        const ultimoGrupo = acumulador[acumulador.length - 1];
        if (ultimoGrupo.length === 1) {
            // Si el último grupo tiene solo 1 elemento, agrégalo al grupo anterior
            const grupoAnterior = acumulador[acumulador.length - 2];
            grupoAnterior.push(current);
            // Asegúrate de que el grupo anterior tenga 5 elementos en total
            while (grupoAnterior.length < 5) {
                grupoAnterior.push(array[index + 1]);
                index++;
            }
            // Eliminamos el último grupo, ya que ahora está vacío
            acumulador.pop();
        }
    }

    return acumulador;
}, []);
let contenedor = document.querySelector('.cont_carrusel');
let contenedorGrande = document.querySelector('.cont_wrapper_carrusel');
let principalView = document.querySelectorAll('.cont_principalView');
let totalViews = gruposDeProfesionales.length;
const rootStyles = document.documentElement.style;
let getTransformValue = () => Number(rootStyles.getPropertyValue('--slide-transform').replace('px', ""));
let widthView = function width() {
    let anchoDelViewport = window.innerWidth;
    var valorEnPX = (89.584 / 100) * anchoDelViewport; // 89.584 es el numero en vw del contenedor cont_principalView
    return valorEnPX;
}

//Carrusel clientes
let SliderCliente = document.querySelector('.slider_clientes');

let cargaDeCli = async () => {
    let URL = './js/JSON/comentarios_clientes.json';
    let solicitud = new Request(URL);
    let resp = await fetch(solicitud);
    let publiCli = await resp.json();
    return publiCli;
}
let publiCli = await cargaDeCli();
const grupoMensajes = publiCli.reduce((acc, curr, index, array) => {
    if (index % 3 === 0) {
        acc.push(array.slice(index, index + 3))
    }
    return acc
}, []);



export { contenedor, contenedorGrande, totalViews, principalView, rootStyles, getTransformValue, SliderCliente, widthView, cargaDeProf, gruposDeProfesionales, grupoMensajes }