var canvas;
var marginLeft = 330;
var marginGeneral = 10;

function setup() {
	var w = window.innerWidth;
	var h = window.innerHeight;
  // create canvas
  canvas = createCanvas(w - (marginLeft + marginGeneral), h - 2 * marginGeneral);
  canvas.position(marginLeft, marginGeneral);
  background(0);
}

window.onresize = function() {
  var w = window.innerWidth;
  var h = window.innerHeight;  
  canvas.size(w - (marginLeft + marginGeneral), h - 2 * marginGeneral);
  canvas.position(marginLeft, marginGeneral);
};