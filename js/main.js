window.onload = () => {

  addCanvasListeners();

  addInputListeners();

  resizeCanvas();

};

let clickX = [];
let clickY = [];
let clickDrag = [];
let paint;

let currentColor = '#000000';
let clickColor = [];

let clickSize = [];
let currentSize = "5";


const addCanvasListeners = () => {

  let canvas = document.getElementById('canvas');

  window.addEventListener('resize', resizeCanvas, false);

  canvas.addEventListener('mousedown', async function (e) {

    paint = true;

    await addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);

    redraw();
  }, false);

  canvas.addEventListener('mousemove', function (e) {
    if (paint) {
      addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
      redraw();
    }
  }, false);

  canvas.addEventListener('mouseup', () => {
    paint = false;
  }, false);

  canvas.addEventListener('mouseleave', () => {
    paint = false;
  }, false);

};


const addInputListeners = () => {

  document
    .getElementById('changeColor')
    .addEventListener('change', function () {
      currentColor = this.value;
    }, false);

  document
    .getElementById('changeSize')
    .addEventListener('change', function () {
      currentSize = this.value;
    }, false);


  document.getElementById('clear')
    .addEventListener('click', clearCanvas, false);

};


const clearCanvas = () => {
  let context = document.getElementById('canvas').getContext("2d");

  context.clearRect(0, 0, canvas.width, canvas.height);

  clickX = [];
  clickY = [];
  clickDrag = [];
  clickColor = [];
  clickSize = [];

};


const resizeCanvas = () => {

  mainFeaturePoperties = getComputedStyle(document.getElementById('main-feature'));

  let canvas = document.getElementById('canvas');

  canvas.width = parseInt(mainFeaturePoperties.width);
  canvas.height = parseInt(mainFeaturePoperties.height);

  redraw();
};


const addClick = async (x, y, dragging = false) => {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(currentColor);
  clickSize.push(currentSize);
};


const redraw = () => {

  const promises = clickX.map(async (item, index) => {
    drawLIne(item, index);
  });

  Promise.all(promises);

};


const drawLIne = (item, index) => {

  let context = document.getElementById('canvas').getContext("2d");

  context.lineJoin = "round";

  context.beginPath();

  if (clickDrag[index] && index) {
    context.moveTo(clickX[index - 1], clickY[index - 1]);
  } else {
    context.moveTo(item - 1, clickY[index]);
  }

  context.lineTo(item, clickY[index]);
  context.closePath();
  context.strokeStyle = clickColor[index];
  context.lineWidth = clickSize[index];
  context.stroke();

};
