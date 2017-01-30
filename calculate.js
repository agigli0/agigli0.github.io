//origin of the graph
var originX = 100;
var originY = 100;

//border spacing
var brdr = 50;

//global dt variable
var step_size = 0;

//array of arrays for holding all the points
var points = [];

//for scaling
var scl = 1;
var vscl = 1;
var tscl = 1;

//orders of magnitude for tick marks
var order;
var vorder;
var torder;

//peak of the particle's path
var apex = [0,0];

//max speed
var maxSpeed = 0;

//how long the program takes to run in milliseconds
var programRunTime = 0;

//did it work?
var success = false;


//load all the points into an array
function calculate() {

	//start the stopwatch
	var t0 = performance.now();

	//grab variables from HTML forms
	var A = Number(document.getElementById("A").value);
	var cd = Number(document.getElementById("cd").value);
	var v = Number(document.getElementById("v").value);
	var angle = Number(document.getElementById("a").value);
	var m = Number(document.getElementById("m").value);
	var y0 = Number(document.getElementById("y").value);

	//make sure the values won't crash the program
	if (v < 0 || v > 100000 || angle > 90 || angle < -90 || m <= 0 || cd < 0 || A < 0 || y0 < 0) {
		document.getElementById("warnings").innerHTML = "I can't work with those numbers!";
		success = false;
		return(1);
	}

	else {
		document.getElementById("warnings").innerHTML = "";
	}

	//create a velocity vector from given data
	var vX = v*cos(angle*PI/180);
	var vY = v*sin(angle*PI/180);
	var vect = createVector(vX,vY);

	//pipe variables into a new projectile that I called "ball" because the aerodynamic simulation I am using models a ball
	var ball = new Projectile(m, A, cd, vect, y0);

	//set step size based on predicted time in air.
	if (v > 9) {
		ball.h = log(v)*log(v)/3000;
	}

	else {
		ball.h = (abs(v/3)+ sqrt(ball.r.y))/3000;
	}

	//store step size in a global variable
	step_size = ball.h;

	//clear points array
	points = [];

	//ensure that y > 0 before beginning the while loop
	append(points, [ball.r.x, ball.r.y, ball.v.x, ball.v.y, ball.t, ball.v.mag()]);
	ball.updateRK4();
	
	//fill points array
	while (ball.r.y >= 0) {
		append(points, [ball.r.x, ball.r.y, ball.v.x, ball.v.y, ball.t, ball.v.mag()]);
		ball.updateRK4();
	}

	apex = points[0];
	//find the top of the path
	for(var q = 0; points[q][1] < points[q+1][1]; q++) {
		apex = points[q+1];
		q++;
	}

	
	//find max speed
	for(var i = 0; i < points.length-1; i++) {
		if (maxSpeed < points[i][5]) {
			maxSpeed = points[i][5];
		}
	}

	if (points[points.length - 1][5] > maxSpeed) {
		maxSpeed = points[points.length - 1][5];
	}
	

	//set an appropriate scale
	if (apex[1]*(width/height) > points[points.length-1][0]) {
		scl = (height - (brdr + originY))/(apex[1]);
		order = floor(log(apex[1])/log(10));
	}

	else {
		scl = (width - (brdr + originX))/(points[points.length-1][0])
		order = floor(log(points[points.length-1][0])/log(10));
	}

	vscl = (height - (brdr + originY))/maxSpeed;
	vorder = floor(log(maxSpeed)/log(10));

	tscl = (width - (brdr + originX))/points[points.length-1][4];
	torder = floor(log(points[points.length-1][4])/log(10));

	//stop the stopwatch
	var t1 = performance.now();
	programRunTime = t1 - t0;

	//it worked
	success = true;
}