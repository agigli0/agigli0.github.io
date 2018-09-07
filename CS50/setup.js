var canvas;
var marginLeft = 330;
var marginGeneral = 10;
var topMargin = 20;

function setup() {
	var w = window.innerWidth;
	var h = window.innerHeight;
  // create canvas
  canvas = createCanvas(w - (marginLeft + marginGeneral), h - marginGeneral - topMargin);
  canvas.position(marginLeft, topMargin);
  background(0);
}

window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;  
  canvas.size(w - (marginLeft + marginGeneral), h - marginGeneral - topMargin);
  canvas.position(marginLeft, topMargin);
  width = w - (marginLeft + marginGeneral);
  height = h - marginGeneral - topMargin;
  setScales();
};