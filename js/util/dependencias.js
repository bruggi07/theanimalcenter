import { publi } from "../main.js";

// Carrusel nosotros
let contenedor = document.querySelector('.cont_carrusel');
let contenedorGrande = document.querySelector('.cont_wrapper_carrusel');
let principalView = document.querySelectorAll('.cont_principalView');
let totalViews = Math.ceil(publi.length/4);
const rootStyles = document.documentElement.style;
let getTransformValue = () => Number(rootStyles.getPropertyValue('--slide-transform').replace('px', ""))
let widthView = function width (){
    let anchoDelViewport = window.innerWidth;
    var valorEnPX = (89.584 / 100) * anchoDelViewport; // 89.584 es el numero en vw del contenedor cont_principalView
    return valorEnPX
}

//Carrusel clientes
let SliderCliente = document.querySelector('.slider_clientes');

export {contenedor,contenedorGrande,totalViews,principalView,rootStyles,getTransformValue,SliderCliente,widthView}  



