import {contenedorClientes, publiCli, rootStyles, widthView2 } from "./dependencias.js";

// console.log(TotalClientes)
// let contadorSlider = 0;
// let enTransicion = false;
// let reordenSliderClientes = () => {
//     rootStyles.setProperty('--transition2', 'none');
//     if (contadorSlider === TotalClientes - 1) {
//         var transformValue = getTransformValue2();
//         contenedorClientes.appendChild(contenedorClientes.firstElementChild);
//         rootStyles.setProperty(`--slide-transform2`, `${transformValue + widthView2()}px`);
//         contadorSlider--;
//     }
//     else if (contadorSlider === 0) {
//         contenedorClientes.prepend(contenedorClientes.lastElementChild);
//         var transformValue = getTransformValue2();
//         rootStyles.setProperty(`--slide-transform2`, `${transformValue - widthView2()}px`);

//         contadorSlider++;
//     }
//     enTransicion = false;
// }

let algo = 0;
let slider_clientes = document.querySelector('.slider_clientes');
function moverSliderDerechaC() {
    // if (enTransicion) return;
    rootStyles.setProperty('--transition2', 'all 1s ease');
    slider_clientes.style.transform = `translateX(${algo-widthView2}%)`
    algo-=widthView2
    // contadorSlider++;
}
function moverSliderIzquierdaC() {
    rootStyles.setProperty('--transition2', 'all 1s ease');
    slider_clientes.style.transform = `translateX(${algo+widthView2}%)`
    algo+=widthView2
    // contadorSlider--;
}
// reordenSliderClientes();
// contenedorClientes.addEventListener('transitionend', reordenSliderClientes);

let botones = document.querySelectorAll('.cont_clientes span')
let tarNum= publiCli.length;
botones.forEach(tar => {
    tar.addEventListener('click', () => {
        if (tar.classList.value == 'btn_derech' && (tarNum + ((algo/100)*tarNum)) > 3) {
            moverSliderDerechaC();
        } else if (tar.classList.value == 'btn_izq' && algo < 0) {
            moverSliderIzquierdaC();
        }
    })
});