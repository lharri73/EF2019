balls = [];
arrows = [];
startX = 50;

function setup() {
	createCanvas(windowWidth, windowHeight);

	balls.push(new ball(50, 100));
	arrows.push(new arrow());
}

function draw() {
	background(135, 206, 250);
	for (let ball of balls) {
		ball.draw();
		ball.update();
	}
	for (let arrow of arrows) {
		arrow.update();
		arrow.draw();
	}

}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked() {
	angleMode(DEGREES);
	length = arrows[0].length / 50;
	balls[0].vel.add(length * cos(arrows[0].theta), -length * sin(arrows[0].theta));
	balls[0].acceleration.set(0, .25);
}

class ball {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.a = 9.81;
		this.vel = createVector(0, 0);
		this.acceleration = createVector(0, 0);
		this.accelAdjust = .2;
	}
	update() {
		this.vel.add(this.acceleration);
		this.pos.add(this.vel);
		if (this.pos.x > windowWidth || this.pos.x < 0) {
			this.vel.x *= -1;
		}
		if (this.pos.y > windowHeight || this.pos.y < 0) {
			this.vel.y *= -1;
		}
	}

	draw() {
		ellipse(this.pos.x, this.pos.y, 50);
	}
}

class arrow {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.length = 0;
		this.theta = 0;
	}
	update() {
		angleMode(DEGREES);
		this.length = sqrt(sq(this.x - mouseX) + sq(this.y - mouseY));
		if (this.y > mouseY && this.x < mouseX) {
			this.theta = round(atan(abs(this.y - mouseY) / abs(this.x - mouseX)));
		} else if (this.y > mouseY && this.x > mouseX) {
			this.theta = round(atan(abs(this.x - mouseX) / abs(this.y - mouseY))) + 90;
		} else if (this.y < mouseY && this.x < mouseX) {
			this.theta = round(atan(abs(this.x - mouseX) / abs(this.y - mouseY))) + 270;
		} else if (this.y < mouseY && this.x > mouseX) {
			this.theta = round(atan(abs(this.y - mouseY) / abs(this.x - mouseX))) + 180;
		}


	}
	draw() {
		this.x = balls[0].pos.x;
		this.y = balls[0].pos.y;
		line(this.x, this.y, mouseX, mouseY);
		text(this.theta, this.x, this.y);
	}
}

function cross(x, y) {
	result[0] = x[0] * y[1];
	result[1] = -1 * x[1] * y[0];
	return result;
}

function magnitude(x) {
	result = sqrt(sq(x[0]) + sq(x[1]));
}