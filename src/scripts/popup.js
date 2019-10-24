let popup = document.querySelector('.header__popup');
let buttonBurger = document.querySelector('.hero__mobile');
let exit = popup.querySelector('.header__popup-close');
let nav = popup.querySelector('.nav-popup')



function close() { popup.style.right = "-3000px" }
buttonBurger.addEventListener('click', function() { popup.style.right = "0" });
exit.addEventListener('click', function(e) {e.preventDefault(); close() });
nav.addEventListener('click', function() { close() });