const ACTOR_RAD = 30;
const ACTOR_SPEED = 5;

class actor {
	constructor(x, y, colour) {
		this.x = x;
		this.y = y;
		this.colour = colour;
		this.a = Math.PI/2;
	}

	lookAt(x, y) {
		this.a = Math.atan2(y-this.y, x-this.x);
	}

	draw(xo, yo) {
		ctx.fillStyle = this.colour;
		ctx.beginPath();
		ctx.arc(this.x-xo, this.y-yo, ACTOR_RAD, 0, Math.PI*2);
		ctx.fill();
		ctx.lineWidth = 10;
		ctx.beginPath();
		ctx.strokeStyle = "beige";
		var m1 = ACTOR_RAD/2, m2=ACTOR_RAD+20;
		var a = this.a+Math.PI;
		ctx.moveTo(this.x+Math.cos(a)*m1-xo, this.y+Math.sin(a)*m1-yo);
		ctx.lineTo(this.x+Math.cos(a)*m2-xo, this.y+Math.sin(a)*m2-yo);
		ctx.stroke();
		ctx.lineWidth = 1;
	}

	move(x, y) {
		var dx = this.x+x, dy = this.y+y;
		for(var a = 0; a < Math.PI*2; a += 0.3) {
			var tx = dx + Math.cos(a)*ACTOR_RAD;
			var ty = dy + Math.sin(a)*ACTOR_RAD;
			if(currentMap.pointBlocked(tx, ty))
				return false;
		}
		this.x = dx;
		this.y = dy;
		return true;
	}

	amove(a) {
		var moved = false;
		for(var m = ACTOR_SPEED; m > 0 && !moved; m--)
			moved = this.move(Math.cos(a)*m, Math.sin(a)*m);
	}

	control() {
		var x = 0, y = 0;
		if(keyDown(87))
			y = -1;
		if(keyDown(83))
			y = 1;
		if(keyDown(65))
			x = -1;
		if(keyDown(68))
			x = 1;
		if(x != 0 || y != 0) {
			var a = Math.atan2(y,x);
			this.amove(a);
		}

		this.a = Math.atan2(canvas.height/2-mouse.y, canvas.width/2-mouse.x);
	}
}

var player = new actor(200, 100, "blue");
