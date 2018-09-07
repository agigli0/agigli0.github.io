function speed() {

	//legend
	push();
	noFill();
	stroke(255);
	line(width/5, brdr/2, width/5 + width/20, brdr/2);
	stroke(255, 0, 0);
	line(2*width/5, brdr/2, 2*width/5 + width/20, brdr/2);
	stroke(0, 0, 255);
	line(3*width/5, brdr/2, 3*width/5 + width/20, brdr/2);
	pop();

	push();
	noStroke();
	fill(255);
	text("speed", width/5 + width/15, brdr/2);
	text("x-speed", 2*width/5 + width/15, brdr/2);
	text("y-speed", 3*width/5 + width/15, brdr/2);
	pop();

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

	var tickSpacingV = pow(10, vorder);
	var tickSpacingT = pow(10, torder);

	//tick marks
	if (points.length > 0) {
		
		//x-axis
		for (var p = 0; p*tickSpacingT*tscl+originX < width-brdr; p++) {
			line(p*tickSpacingT*tscl + originX, height-(xAxisPos), p*tickSpacingT*tscl + originX, height-(xAxisPos+brdr/4));
		}
		//y-axis
		for (var p = 0; p*tickSpacingV*vscl+originY < height-brdr; p++) {
			line(yAxisPos, height-(p*tickSpacingV*vscl + originY), yAxisPos + brdr/4, height-(p*tickSpacingV*vscl + originY));
		}

	}
	pop();

	//labels
	push();
	noStroke();
	fill(255)
	text("v", brdr, brdr/2);
	text("t", width-brdr/2, height-brdr);
	if (points.length > 0) {

		for (var p = 0; p*tickSpacingT*tscl+originX <= width-brdr; p++) {
			text(p*tickSpacingT + " s", p*tickSpacingT*tscl + originX, height-(brdr/2));
		}

		for (var p = 0; p*tickSpacingV*vscl+originY <= height-brdr; p++) {
			text(p*tickSpacingV + " m/s", brdr/4, height-(p*tickSpacingV*vscl + originY));
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
		for (var p = 0; p*tickSpacingT*tscl+originX <= width-brdr; p++) {
			line(p*tickSpacingT*tscl + originX, height-(xAxisPos), p*tickSpacingT*tscl + originX, brdr);
		}

		//horizontal
		for (var p = 0; p*tickSpacingV*vscl+originY <= height-brdr; p++) {
			line(yAxisPos, height-(p*tickSpacingV*vscl + originY), width-brdr, height-(p*tickSpacingV*vscl + originY));
		}
	}

	pop();

	//plot points
	push();
	noFill();
	stroke(255)
	strokeWeight(1);
	
	//speed
	beginShape();
	stroke(255);
	for(var i = 0; i < points.length-1; i++) {
		var rv = points[i][5];
		var rt = points[i][4];
		vertex(rt*tscl + originX, height - (rv*vscl + originY));
	}
	endShape();

	//vx
	beginShape();
	stroke(255,0,0);
	for(var i = 0; i < points.length-1; i++) {
		var rvx = points[i][2];
		var rt = points[i][4];
		vertex(rt*tscl + originX, height - (rvx*vscl + originY));
	}
	endShape();

	//vy
	beginShape();
	stroke(0,0,255);
	for(var i = 0; i < points.length-1; i++) {
		var rvy = points[i][3];
		var rt = points[i][4];
		vertex(rt*tscl + originX, height - (abs(rvy)*vscl + originY));
	}
	endShape();
	pop();

	//cursor
	push();
	fill(255);
	textAlign(RIGHT);
	if (mouseX > originX && mouseX < width-brdr && mouseY > brdr && mouseY < height-originY) {
		mX = (mouseX-originX)/tscl;
		mY = (mouseY + originY - height)*(-1)/(vscl);
		text("(" + mX.toFixed(2) + ", " + mY.toFixed(2) + ")", width-brdr, 3*brdr);
	}	
	pop();

}