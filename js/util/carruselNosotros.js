import { contenedor, rootStyles, totalViews, getTransformValue, widthView } from "./dependencias.js";


let contadorSlider = 0;
let enTransicion = false;
let reordenSlider = () => {
    rootStyles.setProperty('--transition', 'none');
    if (contadorSlider === totalViews - 1) {
        var transformValue = getTransformValue();
        contenedor.appendChild(contenedor.firstElementChild);
        rootStyles.setProperty(`--slide-transform`, `${transformValue + widthView()}px`);
        contadorSlider--;
    }
    else if (contadorSlider === 0) {
        contenedor.prepend(contenedor.lastElementChild);
        var transformValue = getTransformValue();
        rootStyles.setProperty(`--slide-transform`, `${transformValue - widthView()}px`);
        contadorSlider++;
    }
    enTransicion = false;
}
function moverSliderDerecha() {
    if (enTransicion) return;
    rootStyles.setProperty('--transition', 'all 1s ease');
    enTransicion = true;
    var transformValue = getTransformValue();
    rootStyles.setProperty(`--slide-transform`, `${transformValue - widthView()}px`);
    contadorSlider++;
}
function moverSliderIzquierda() {
    if (enTransicion) return;
    rootStyles.setProperty('--transition', 'all 1s ease');
    enTransicion = true;
    var transformValue = getTransformValue();
    rootStyles.setProperty(`--slide-transform`, `${transformValue + widthView()}px`);
    contadorSlider--;
}
var intervID
function startInterval() {
    intervID = setInterval(() => {
        moverSliderDerecha();
    }, 5000);
}
function stopInterval() {
    clearInterval(intervID);
}
startInterval();
reordenSlider();
contenedor.addEventListener('transitionend', reordenSlider);

// API Hammer para gestos táctiles-----

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(contenedor);

// listen to events...
mc.on("panleft panright pressup press", function (ev) {

    if (ev.type === 'panleft' && enTransicion === false) {
        stopInterval();
        moverSliderDerecha();
        startInterval();
    }
    else if (ev.type === 'panright' && enTransicion === false) {
        stopInterval();
        moverSliderIzquierda();
        startInterval();
    }
    else if (ev.type === 'press') {
        stopInterval();
    } else if (ev.type === 'pressup') {
        enTransicion = false;
        startInterval();
    }
});