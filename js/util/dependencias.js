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
    if (index % 4 === 0) {
        acumulador.push(array.slice(index, index + 4))
    }
    return acumulador
}, []);

let contenedor = document.querySelector('.cont_carrusel');
let contenedorGrande = document.querySelector('.cont_wrapper_carrusel');
let principalView = document.querySelectorAll('.cont_principalView');
let totalViews = Math.ceil(publi.length / 4);
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



export { contenedor, contenedorGrande, totalViews, principalView, rootStyles, getTransformValue, SliderCliente, widthView, cargaDeProf, gruposDeProfesionales,grupoMensajes }