import Triangle from './js/triangle.js';
import Rectangle from './js/rectangle.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function handleTriangleForm() {
  event.preventDefault();
}

function handleRectangleForm() {
  event.preventDefault();
}

window.addEventListener("load", function() {
  document.querySelector("#triangle-checker-form").addEventListener("submit", handleTriangleForm);
  this.document.querySelector("#rectangle-area-form").addEventListener("submit", handleRectangleForm);
});