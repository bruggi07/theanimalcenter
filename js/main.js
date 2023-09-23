"use strict";
import { SliderCliente } from "./util/dependencias.js";


//nosotros------

//construccion de elementos de DOM
function crearElemento(tag, classNombre = '', textContent = '') {
  const elemento = document.createElement(tag);
  if (classNombre) elemento.classList.add(classNombre);
  if (textContent) elemento.textContent = textContent;
  return elemento;
}
//Construyendo las "tarjetas" para cada profesional/trabajador || funcion crearElemento(tagHTML,clase,textoDentro)
function tarjetasCarrusel(nombre, img, cargo) {
  const tarCar = crearElemento('DIV', 'tar_carrusel');
  const imgDiv = crearElemento('DIV', 'img_carrusel');
  const imgUser = crearElemento('IMG');
  const h3Carrusel = crearElemento('H3', '', nombre);
  const pCarrusel = crearElemento('p', '', cargo);

  //Insertando atributos a los contenedores
  imgUser.setAttribute('src', img);
  imgUser.setAttribute('alt', nombre);

  //Ordenando los contenedores e insertandolos en su correcto orden
  imgDiv.appendChild(imgUser);
  tarCar.appendChild(imgDiv);
  tarCar.appendChild(h3Carrusel);
  tarCar.appendChild(pCarrusel);
  return tarCar;
}
const cargarNosotrosCarrusel = async () => {
  try {
    // Cargando desde archivo json
    let URL = './js/JSON/nuestros_profesionales.json';
    let solicitud = new Request(URL);
    let resp = await fetch(solicitud);
    let publi = await resp.json();

    let contenedor = document.querySelector('.cont_carrusel');

    //Extrae y crea grupos de 4 profesionales del archivo JSON con los profesionales cargados
    const gruposDeProfesionales = publi.reduce((acumulador, current, index, array) => {
      if (index % 4 === 0) {
        acumulador.push(array.slice(index, index + 4))
      }
      return acumulador
    }, []);

    //Recorre los arrays y e inserta en cada grupo de profesionales, cada profesional
    gruposDeProfesionales.forEach(profesionales => {
      const cont_view_nosotros = crearElemento('DIV', 'cont_principalView');
      profesionales.forEach(({ nombre, foto, especialidad }) => {
        cont_view_nosotros.appendChild(tarjetasCarrusel(nombre, foto, especialidad));
      });
      contenedor.appendChild(cont_view_nosotros);
    });

  } catch (e) {
    console.log('ERROR EN cargarNosotrosCarrusel(), el error es', e);
  }
}
cargarNosotrosCarrusel();

//clientes dicen ----------

// Construyendo las tarjetas individuales
function tarjetaCLiente(nombre, comentario, link) {
  const contTarjeta = crearElemento('DIV', 'tar_clientes');
  const contCabecera = crearElemento('DIV', 'cont_cabecera_tar_clientes');
  const h3Nombre = crearElemento('H3', '', nombre);
  const aLink = crearElemento('a', 'link_clientes', 'Comentarios Google');
  const estrellasCont = crearElemento('DIV', 'estrellas_tar_clientes');
  const imgEstrellas = crearElemento('IMG');
  const pTexto = crearElemento('P', '', comentario);

  imgEstrellas.setAttribute('src', 'img/clientes/Estrellitas.svg');
  aLink.setAttribute('href', link);

  //Ordenando los contenedores e insertandolos en su correcto orden
  estrellasCont.appendChild(imgEstrellas);
  contCabecera.appendChild(h3Nombre);
  contCabecera.appendChild(aLink);
  contCabecera.appendChild(estrellasCont);
  contTarjeta.appendChild(contCabecera);
  contTarjeta.appendChild(pTexto);
  return contTarjeta;
}

//  cargando publicaciones desde json
const cargarPublicaciones = async () => {
  try {
    let URL = './js/JSON/comentarios_clientes.json';
    let solicitud = new Request(URL);
    let resp = await fetch(solicitud);
    let publi = await resp.json();

    // carga los datos en cada tarjeta y cada 3 cambia de contenedor

    const cont_view_clientes = crearElemento('DIV', 'view_clientes');
    const grupoMensajes = publi.reduce((acc, curr, index, array) => {
      if (index % 3 === 0) {
        acc.push(array.slice(index, index + 3))
      }
      return acc
    }, []);

    grupoMensajes.forEach(mensajes => {
      const cont_view_clientes = crearElemento('DIV', 'view_clientes');
      mensajes.forEach(({ nombre, mensaje, link }) => {
        cont_view_clientes.appendChild(tarjetaCLiente(nombre, mensaje, link))
      });
      SliderCliente.appendChild(cont_view_clientes);
    });
  } catch (err) {
    console.log('ERROR EN cargarPublicaciones!!, el error es: ', err)
  }
};
cargarPublicaciones();


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