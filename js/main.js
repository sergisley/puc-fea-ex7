let clickX = [];
let clickY = [];
let clickDrag = [];
var paint;

let currentColor = '#000000';
let clickColor = [];

let clickSize = [];
var currentSize = "2";

window.onload = () => {

  canvas = document.getElementById('canvas');
  context = canvas.getContext("2d");

  window.addEventListener('resize', resizeCanvas, false);

  canvas.addEventListener('mousedown', function (e) {

    paint = true;

    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);

    redraw();
  }, false);

  canvas.addEventListener('mousemove', function (e) {
    if (paint) {
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      redraw();
    }
  }, false);

  canvas.addEventListener('mouseup', function () {
    paint = false;
  }, false);

  canvas.addEventListener('mouseleave', function () {
    paint = false;
  }, false);


  changeColorInput = document.getElementById('changeColor');
  changeColorInput.addEventListener('change', function () {
    currentColor = changeColor.value;
  }, false);

  changeSizeInput = document.getElementById('changeSize');
  changeSizeInput.addEventListener('change', function () {
    currentSize = changeSizeInput.value;
  }, false);


  document.getElementById('clear')
    .addEventListener('click', function () {
      context.clearRect(0, 0, canvas.width, canvas.height);
      clickX = [];
      clickY = [];
      clickDrag = [];
      clickColor = [];
      clickSize = [];
    }, false);

  resizeCanvas();

};

function resizeCanvas() {

  mainFeaturePoperties = getComputedStyle(document.getElementById('main-feature'));

  canvas.width = parseInt(mainFeaturePoperties.width);
  canvas.height = parseInt(mainFeaturePoperties.height);

  redraw();
}

function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(currentColor);
  clickSize.push(currentSize);
}

function redraw() {

  context.lineJoin = "round";

  for (var i = 0; i < clickX.length; i++) {
    context.beginPath();
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i - 1], clickY[i - 1]);
    } else {
      context.moveTo(clickX[i] - 1, clickY[i]);
    }

    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.strokeStyle = clickColor[i];
    context.lineWidth = clickSize[i];
    context.stroke();
  }
}
