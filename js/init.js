const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
};


// Modo dia y noche
let modoNoche = localStorage.getItem('modoNoche') === 'true';

    function aplicarModo() {
        document.body.className = modoNoche ? 'modo-noche' : 'modo-dia';
        document.getElementById('boton').innerHTML = modoNoche ? '<i class="bi bi-moon-fill"></i>' : '<i class="bi bi-sun-fill"></i>';
    }

    function cambiarModo() {
        modoNoche = !modoNoche;
        localStorage.setItem('modoNoche', modoNoche);
        aplicarModo();
    }

    // Agrega el evento al botón
    document.getElementById('boton').addEventListener('click', cambiarModo);

    // Aplica el modo al cargar la página
    aplicarModo();
    updateUsername () 


// Mostrar el nombre del usuario

  function updateUsername () {
    const userName = localStorage.getItem('currentUsername');

    //Mostrar nombre de usuario al iniciar sesión
    const usernameDisplay = document.getElementById ('username-display');
    usernameDisplay.textContent = userName;
  }
  
 //badge--
 function saveToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // verificar si ya esta
  const cartItems = cart.some(item => item.id === product.id);

  if (!cartItems) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartBadge(); 
  } else {
      alert('Este producto ya se encuentra en el carrito.');
  }

  console.log(`Datos guardados en cart: ${JSON.stringify(cart)}`);
}

//funcion para eliminar
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  cart = cart.filter(item => item.id !== productId);
  
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge(); 
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const badge = document.getElementById('cart-badge');
  badge.textContent = cart.length; 
}

window.onload = function() {
  updateCartBadge();
};
