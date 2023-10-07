"use strict";
import { SliderCliente, cargaDeProf, gruposDeProfesionales, publiCli, link } from "./util/dependencias.js";

//año actual en footer
let ano = new Date().getFullYear();
let span = document.getElementById('ano_actual')
span.innerHTML = ano;

//observer
export let secciones = document.querySelectorAll('section');
const observer = new IntersectionObserver((entradas) => {

  entradas.forEach(entrada => {
    const id = entrada.target.getAttribute('id');
    const menuLink = document.querySelector(`nav a[href="#${id}"]`);


    if (entrada.isIntersecting) {

      try {
        let seleccionado = document.querySelector('nav a.seleccionado');
        if (seleccionado != null) {
          seleccionado.classList.remove('seleccionado');
        }
        menuLink.classList.add('seleccionado');
      } catch (e) {
        console.log('pasando por seccion clientes o otro error')
      }
    }

  });
}
  , {
    rootMargin: '-50% 0% -50% 0%'
  });

secciones.forEach(seccion => observer.observe(seccion))

//botones inicio
let llamanos = document.querySelector('#btn_llamanos_inicio');
let popup = document.querySelector('#popup_inicio');
let timeoutID;
function animaIN() {
  popup.classList.remove('bounceOutDown');
  popup.classList.remove('init');
  popup.classList.add('bounceInUp');
}
function animaOut() {
  popup.classList.remove('bounceInUp');
  popup.classList.add('bounceOutDown');
}
llamanos.addEventListener('click', () => {
  if (!popup.className.includes('bounceInUpClick')) {
    popup.classList.add('bounceInUpClick')
  } else if (popup.className.includes('bounceInUpClick')) {
    popup.classList.remove('bounceInUpClick');
    animaOut();
  }
})
llamanos.addEventListener('mouseenter', () => {
  clearTimeout(timeoutID);
  animaIN();
})
llamanos.addEventListener('mouseleave', () => {
  timeoutID = setTimeout(() => {
    animaOut();
  }, 500);
})


// botones contactos
let llamanos2 = document.querySelector('#btn_llamanos_contacto');
let popup2 = document.querySelector('#popup_contacto');
function animaInContacto() {
  popup2.classList.remove('bounceOutUp')
  popup2.classList.remove('init')
  popup2.classList.add('bounceInDown')
}
function animaOutContacto() {
  popup2.classList.remove('bounceInDown')
  popup2.classList.add('bounceOutUp')

}
llamanos2.addEventListener('click', () => {

  if (!popup2.className.includes('bounceInDownClick')) {
    popup2.classList.add('bounceInDownClick');
  } else if (popup2.className.includes('bounceInDownClick')) {
    popup2.classList.remove('bounceInDownClick');
    animaOutContacto();
  }
})
llamanos2.addEventListener('mouseenter', () => {
  clearTimeout(timeoutID);
  animaInContacto();
})
llamanos2.addEventListener('mouseleave', () => {
 timeoutID = setTimeout(() => {
    animaOutContacto();
  }, 500);
})

//Menu Scroll

let prevY = window.scrollY;
let menu = document.querySelector('.menu');

window.addEventListener('scroll', function () {
  if (prevY < this.scrollY) {
    menu.classList.add('menuScroll')

  } else if (prevY < 50) {
    menu.classList.remove('menuScroll')

  };

  prevY = window.scrollY
});


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


export const cargarNosotrosCarrusel = () => {
  let contenedor = document.querySelector('.cont_carrusel');
  //Recorre los arrays y e inserta en cada grupo de profesionales, cada profesional
  gruposDeProfesionales.forEach(profesionales => {
    const cont_view_nosotros = crearElemento('DIV', 'cont_principalView');
    profesionales.forEach(({ nombre, foto, especialidad }) => {
      cont_view_nosotros.appendChild(tarjetasCarrusel(nombre, foto, especialidad));
    });
    contenedor.appendChild(cont_view_nosotros);
  });
}

//clientes dicen ----------

// Construyendo las tarjetas individuales
function tarjetaCLiente(nombre, comentario) {
  const contTarjeta = crearElemento('DIV', 'tar_clientes');
  const contCabecera = crearElemento('DIV', 'cont_cabecera_tar_clientes');
  const h3Nombre = crearElemento('H3', '', nombre);
  const aLink = crearElemento('a', 'link_clientes', 'Comentarios Google');
  const estrellasCont = crearElemento('DIV', 'estrellas_tar_clientes');
  const imgEstrellas = crearElemento('IMG');
  const pTexto = crearElemento('P', '', comentario);

  imgEstrellas.setAttribute('src', 'img/clientes/Estrellitas.svg');
  aLink.setAttribute('href', link);
  aLink.setAttribute('target', '_blank')

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
const cargarPublicaciones = () => {

  const cont_view_clientes = crearElemento('DIV', 'view_clientes');
  publiCli.forEach(tar => {
      cont_view_clientes.appendChild(tarjetaCLiente(tar.nombre, tar.mensaje))
    SliderCliente.appendChild(cont_view_clientes);
  });
};
cargarPublicaciones();


// fix scroll beheivor en todos los navegadores, con jquery-------->
$(document).ready(function () {
  // Add smooth scrolling to all links
  $(".alink").on('click', function (event) {

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