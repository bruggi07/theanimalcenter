import { contenedor, contenedorGrande, rootStyles, principalView, totalViews } from "./dependencias.js";

let getTransformValue = () => Number(rootStyles.getPropertyValue('--slide-transform').replace('px', ""))
let widthView = principalView[0].scrollWidth;
let contadorSlider = 0;
let enTransicion = false;

let reordenSlider = () => {
    rootStyles.setProperty('--transition', 'none')
    if (contadorSlider === totalViews - 1) {
        var transformValue = getTransformValue();
        contenedor.appendChild(contenedor.firstElementChild);
        rootStyles.setProperty(`--slide-transform`, `${transformValue + widthView}px`);
        contadorSlider--;
    }
    else if (contadorSlider === 0) {
        contenedor.prepend(contenedor.lastElementChild)
        var transformValue = getTransformValue();
        rootStyles.setProperty(`--slide-transform`, `${transformValue - widthView}px`);
        contadorSlider++
    }
    enTransicion = false;
}
function moverSliderDerecha() {
    if (enTransicion) return;
    rootStyles.setProperty('--transition', 'all 1s ease')
    enTransicion = true;
    var transformValue = getTransformValue();
    rootStyles.setProperty(`--slide-transform`, `${transformValue - widthView}px`);
    contadorSlider++
}
function moverSliderIzquierda() {
    if (enTransicion) return;
    rootStyles.setProperty('--transition', 'all 1s ease')
    enTransicion = true;
    var transformValue = getTransformValue();
    rootStyles.setProperty(`--slide-transform`, `${transformValue + widthView}px`);
    contadorSlider--
}
var intervID = setInterval(() => {
    moverSliderDerecha();
}, 5000);
function LoopInterval(){
    if(!intervID){
        var intervID = setInterval(() => {
            moverSliderDerecha();
        }, 5000);
    }
}

reordenSlider();
contenedor.addEventListener('transitionend', reordenSlider)

// API Hammer para gestos táctiles-----

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(contenedor);

// listen to events...
mc.on("panleft panright pressup press", function (ev) {
    if (ev.deltaX < 0 && enTransicion === false) {
        clearInterval(intervID);
        moverSliderDerecha()
    }
    else if (ev.deltaX > 0 && enTransicion === false) {
        clearInterval(intervID);
        moverSliderIzquierda()
    }
    else if (ev.type === 'press') {
        enTransicion = true;
        clearInterval(intervID);
    }else if(ev.type === 'pressup'){
        enTransicion = false
        LoopInterval()
    }
});