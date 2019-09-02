'use strict';

function createElement(tag, className) {
  var element = document.createElement(tag);
  if (className) {
    var classList = className.split(' ');
    classList.forEach(name => element.classList.add(name));
  }
  return element;
}

function menu() {
  var navBtn = document.querySelector('.navbar-burger');

  function handleMenuClick(evt) {
    evt.preventDefault();
    var target = evt.target;
    var navMenu = document.getElementById(target.dataset.target);

    if (!target.classList.contains('is-active')) {
      target.classList.add('is-active');
      navMenu.classList.add('is-active');
    } else {
      target.classList.remove('is-active');
      navMenu.classList.remove('is-active');
    }
  }

  navBtn.addEventListener('click', handleMenuClick);
}

document.addEventListener('DOMContentLoaded', menu);
