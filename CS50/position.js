function position() {


	//plot axes and tick marks
	push();
	noFill();
	stroke(255);
	strokeWeight(2);

	var xAxisPos = originY - brdr;
	var yAxisPos = originX - brdr;

	//axes
	line(yAxisPos, height - xAxisPos, width - brdr, height - xAxisPos);
	line(yAxisPos, height - xAxisPos, yAxisPos, xAxisPos);

	var tickSpacing = pow(10,order);

	//tick marks
	if (points.length > 0) {
		
		//x-axis
		for (var p = 0; p*tickSpacing*scl+originX < width-brdr; p++) {
			line(p*tickSpacing*scl + originX, height-(xAxisPos), p*tickSpacing*scl + originX, height-(xAxisPos+brdr/4));
		}
		//y-axis
		for (var p = 0; p*tickSpacing*scl+originY < height-brdr; p++) {
			line(yAxisPos, height-(p*tickSpacing*scl + originY), yAxisPos + brdr/4, height-(p*tickSpacing*scl + originY));
		}
	}
	
	pop();

	push();
	noFill();
	stroke(100);
	strokeWeight(0.5);

	//gridlines
	if (points.length > 0) {

		//vertical
		for (var p = 0; p*tickSpacing*scl+originX < width-brdr; p++) {
			line(p*tickSpacing*scl + originX, height-(xAxisPos), p*tickSpacing*scl + originX, brdr);
		}

		//horizontal
		for (var p = 0; p*tickSpacing*scl+originY < height-brdr; p++) {
			line(yAxisPos, height-(p*tickSpacing*scl + originY), width-brdr, height-(p*tickSpacing*scl + originY));
		}
	}

	pop();

	//labels
	push();
	noStroke();
	fill(255)
	text("y", brdr, brdr/2);
	text("x", width-brdr/2, height-brdr);
	if (points.length > 0) {

		for (var p = 0; p*tickSpacing*scl+originX < width-brdr; p++) {
			text(p*tickSpacing + " m", p*tickSpacing*scl + originX, height-(brdr/2));
		}

		for (var p = 0; p*tickSpacing*scl+originY < height-brdr; p++) {
			text(p*tickSpacing + " m", brdr/4, height-(p*tickSpacing*scl + originY));
		}

	}
	pop();

	//plot points
	push();
	noFill();
	stroke(255);
	strokeWeight(1);
	beginShape();

	for(var i = 0; i < points.length-1; i++) {
		var rx = points[i][0];
		var ry = points[i][1];
		vertex(rx*scl + originX, height - (ry*scl + originY));
	}

	endShape();
	pop();

	//animate projectile
	push();
	if (points.length > 0) {
		var timescale = 1/(frameRate()*step_size);
		
		if (q < points.length-1) {
			
			//change color based on speed
			var vX = points[round(q)][2];
			var vY = points[round(q)][3];
			var vMag = sqrt(vX*vX + vY*vY);
			var v0 = sqrt(points[0][2]*points[0][2] + points[0][3]*points[0][3]);
			var vFraction = 255*vMag/maxSpeed;
			fill(vFraction, 255-vFraction, 255);

			//plot location
			var px = points[round(q)][0];
			var py = points[round(q)][1];
			ellipse(px*scl + originX, height - (py*scl + originY), 10);
			q += timescale;
		}

		//reset ball
		else {
			q = 0;
		}
		
	}
	pop();

	//cursor
	push();
	fill(255);
	textAlign(RIGHT);
	if (mouseX > originX && mouseX < width-brdr && mouseY > brdr && mouseY < height-originY) {
		mX = (mouseX-originX)/scl;
		mY = (mouseY + originY - height)*(-1)/(scl);
		text("(" + mX.toFixed(2) + ", " + mY.toFixed(2) + ")", width-brdr, 3*brdr);
	}
	
	
	pop();
}