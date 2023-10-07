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
let contenedorClientes = document.querySelector('.slider_clientes');
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
// let widthView2 = function width2() {
//     let anchoDelViewport = window.innerWidth;
//     var valorEnPX = (24.73   / 100) * anchoDelViewport; // 23.3 es el numero en vw del contenedor TarClientes
//     return valorEnPX;
// }

//Carrusel clientes
let SliderCliente = document.querySelector('.slider_clientes');
let link = 'https://www.google.com/search?q=the+animal+center+bs+as&sca_esv=568605030&sxsrf=AM9HkKmlaqFn531dQomUvkmFXOT8kqCDoA%3A1695760500804&ei=dEATZYDOMOqJ4dUPqbO_8AM&ved=0ahUKEwiA2JiSkMmBAxXqRLgEHanZDz4Q4dUDCBA&uact=5&oq=the+animal+center+bs+as&gs_lp=Egxnd3Mtd2l6LXNlcnAiF3RoZSBhbmltYWwgY2VudGVyIGJzIGFzMgUQIRigAUjeC1C3BFi9CnABeACQAQCYAb8BoAHQBaoBAzEuNbgBA8gBAPgBAcICBxAjGLADGCfCAg4QLhiABBjHARivARiwA8ICBxAAGB4YsAPCAgkQABgIGB4YsAPCAgQQIxgnwgILEC4YgAQYxwEYrwHCAgYQABgWGB7CAgUQABiiBMICCBAhGBYYHhgd4gMEGAEgQYgGAZAGCg&sclient=gws-wiz-serp#lrd=0x95bcca8539294d17:0x1bcd278cd8b81cd8,1,,,,'
let cargaDeCli = async () => {
    let URL = './js/JSON/comentarios_clientes.json';
    let solicitud = new Request(URL);
    let resp = await fetch(solicitud);
    let publiCli = await resp.json();
    return publiCli;
}
let publiCli = await cargaDeCli();
var widthView2 = 100 / publiCli.length;
// const grupoMensajes = publiCli.reduce((acc, curr, index, array) => {
//     if (index % 3 === 0) {
//         acc.push(array.slice(index, index + 3))
//     }
//     return acc
// }, []);




export { contenedor, contenedorGrande, totalViews, principalView, rootStyles, getTransformValue, SliderCliente, widthView, cargaDeProf, gruposDeProfesionales, link,contenedorClientes,widthView2,publiCli }