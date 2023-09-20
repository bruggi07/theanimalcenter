// Carrusel nosotros
let contenedor = document.querySelector('.cont_carrusel');
let contenedorGrande = document.querySelector('.cont_wrapper_carrusel');
let principalView = document.querySelectorAll('.cont_principalView');
let totalViews = principalView.length;
const rootStyles = document.documentElement.style;
let getTransformValue = () => Number(rootStyles.getPropertyValue('--slide-transform').replace('px', ""))
let widthView = principalView[0].scrollWidth;

export {contenedor,contenedorGrande,totalViews,principalView,rootStyles,widthView,getTransformValue}  



