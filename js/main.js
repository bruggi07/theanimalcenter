"use strict";

//clientes dicen 
let SliderCliente = document.querySelector('.slider_clientes');
// creando las tarjetas individuales
function tarjetaCLiente(nombre, comentario, link) {
  const contTarjeta = document.createElement('DIV');
  const contCabecera = document.createElement('DIV');
  const h3Nombre = document.createElement('H3');
  const aLink = document.createElement('a');
  const estrellasCont = document.createElement('DIV');
  const imgEstrellas = document.createElement('IMG');
  const pTexto = document.createElement('P');

  contTarjeta.classList.add('tar_clientes');
  contCabecera.classList.add('cont_cabecera_tar_clientes');
  aLink.classList.add('link_clientes')
  estrellasCont.classList.add('estrellas_tar_clientes');

  h3Nombre.textContent = nombre;
  pTexto.textContent = comentario;
  imgEstrellas.setAttribute('src', 'img/clientes/Estrellitas.svg');
  aLink.setAttribute('href', link)
  aLink.textContent = 'Comentarios google';

  estrellasCont.appendChild(imgEstrellas);
  contCabecera.appendChild(h3Nombre);
  contCabecera.appendChild(aLink);
  contCabecera.appendChild(estrellasCont);
  contTarjeta.appendChild(contCabecera);
  contTarjeta.appendChild(pTexto);
  return contTarjeta
}

//  cargando publicaciones desde json
const cargarPublicaciones = async () => {
  let URL = './js/util/comentarios_clientes.json';
  let solicitud = new Request(URL)
  let resp = await fetch(solicitud);
  let arr = await resp.json();
  let publi = arr.mensajes
  // carga los datos en cada tarjeta y cada 3 cambia de contenedor
  let cliContador = publi.length / 3
  let k = 0;
  for (let j = 0; j < cliContador; j++) {
    const cont_view_clientes = document.createElement('DIV');
    cont_view_clientes.classList.add('view_clientes');

    let i = 0;
    while (i < 3 && k < publi.length) {
      let nombre, mensaje, link;
      nombre = publi[k].nombre
      mensaje = publi[k].mensaje
      link = publi[k].link
      cont_view_clientes.appendChild(tarjetaCLiente(nombre, mensaje, link))
      i++
      k++
    }
    SliderCliente.appendChild(cont_view_clientes);
  }
};
cargarPublicaciones()


// fix scroll beheivor en todos los navegadores, con jquery-------->
$(document).ready(function () {
  // Add smooth scrolling to all links
  $("a").on('click', function (event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 650, function () {

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});