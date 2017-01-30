function Projectile(m, A, cd, v, b) {
	this.m = m;		//mass (kg)
	this.A = A;		//cross-sectional area (m^2)
	this.cd = cd;	//drag coefficient (dimensionless)
	this.r = createVector(0, b);	//position vector
	this.v = v;		//velocity vector
	this.h = 0.01;	//integration step size (s)
	this.t = 0.0;	//time (s)

	//return a force vector
	this.resistance_force = function(v) {
		var magnitude = v.magSq()*this.cd*this.A*0.5*1.225;
		var direction = createVector(0,0);
		direction.set(v);
		direction.normalize();
		direction.mult(-1*magnitude);
		return direction;
	};

	//update position and velocity with Euler integration. I'm leaving this in the code even though it is not implemented because it may be of use to a tinkerer
	this.update = function() {
		var g = createVector(0, -9.8);
		var dv = p5.Vector.mult(this.v, this.h);
		this.r.add(dv);
		var a = p5.Vector.mult(this.resistance_force(this.v), 1/this.m);	//calculate an acceleration vector
		a.add(g);
		a.mult(this.h);
		this.v.add(a);
		this.t += this.h;
	};

	//a far more accurate but computationally-intensive numerical integrator. Created with help from http://mtdevans.com/2013/05/fourth-order-runge-kutta-algorithm-in-javascript-with-demo/
	this.updateRK4 = function () {
		var g = createVector(0, -9.8);

		var x1 = createVector(0,0);
		x1.set(this.r);
		var v1 = createVector(0,0);
		v1.set(this.v);
		var a1 = this.resistance_force(v1);
		a1.mult(1/this.m);
		a1.add(g);

		var da1 = p5.Vector.mult(a1, 0.5);
		da1.mult(this.h);
		var v2 = p5.Vector.add(v1, da1);
		var a2 = this.resistance_force(v2);
		a2.mult(1/this.m);
		a2.add(g);

		var da2 = p5.Vector.mult(a2, 0.5);
		da2.mult(this.h);
		var v3 = p5.Vector.add(v2, da2);
		var a3 = this.resistance_force(v3);
		a3.mult(1/this.m);
		a3.add(g);

		var da3 = p5.Vector.mult(a3, this.h);
		var v4 = p5.Vector.add(v3, da3);
		var a4 = this.resistance_force(v4);
		a4.mult(1/this.m);
		a4.add(g);

		var dv = p5.Vector.add(a1, a4);
		a2.mult(2);
		a3.mult(2);
		dv.add(a2);
		dv.add(a3);
		dv.mult(this.h/6);
		this.v.add(dv);

		var dx = p5.Vector.add(v1, v4);
		v2.mult(2);
		v3.mult(2);
		dx.add(v2);
		dx.add(v3);
		dx.mult(this.h/6);
		this.r.add(dx);

		this.t += this.h;
	}
}
