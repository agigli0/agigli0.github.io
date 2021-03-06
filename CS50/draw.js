var clicked = false;
//for graphic purposes. draw() tries to execute 60 times every second, and I would be in trouble if q reset to some default value every cycle.
var q = 0;

//use p5's library to draw graphics
function draw() {
	//draw background
	background(20);



	//draw position graph
	if (clicked == false) {
		position();
	}
	

	//draw velocity-time graph
	else {
		speed();
	}
	
	
	//metrics
	push();
	fill(255);
	textAlign(RIGHT);
	text(round(frameRate()), width - brdr, brdr);
	text(round(programRunTime) + " ms to calculate " + points.length + " points", width-brdr, 1.5*brdr);
	text(step_size.toFixed(4) + " s resolution", width-brdr, 2*brdr);
	pop();
}

function clickered() {
	clicked = !clicked;
}