class shape {
	constructor(vrt, colour) {
		this.vrt = vrt;
		this.colour = colour;
	}

	draw(xo, yo) {
		ctx.fillStyle = this.colour;
		ctx.beginPath();
		ctx.moveTo(this.vrt[0]-xo, this.vrt[1]-yo);
		for(var i = 1; i < Math.floor(this.vrt.length/2); i++)
			ctx.lineTo(this.vrt[i*2]-xo, this.vrt[i*2+1]-yo);
		ctx.fill();
	}

	pointWithin(x, y) {
		var len = Math.floor(this.vrt.length/2);
		for(var i = 0; i < len; i++) {
			var j = (i+1) % len;
			var x1 = this.vrt[i*2], y1 = this.vrt[i*2+1];
			var x2 = this.vrt[j*2], y2 = this.vrt[j*2+1];
			var d = (x-x1)*(y2-y1) - (y-y1)*(x2-x1);
			if(d > 0 && len > 3)
				return false;
			if(d < 0 && len <= 3)
				return false;
		}
		return true;
	}
}

class map {
	constructor(w, h, colour) {
		this.w = w;
		this.h = h;
		this.walls = [];
		this.floors = [];
		this.colour = colour;
	}

	addWall(s) {
		this.walls[this.walls.length] = s;
	}

	addFloor(s) {
		this.floors[this.floors.length] = s;
	}

	pointBlocked(x, y) {
		if(x < 0 || y < 0 || x >= this.w || y >= this.h)
			return true;
		for(var i = 0; i < this.walls.length; i++)
			if(this.walls[i].pointWithin(x, y))
				return true;
		return false;
	}

	drawWalls(xo, yo) {
		for(var i = 0; i < this.walls.length; i++)
			this.walls[i].draw(xo, yo);
	}

	drawFloor(xo, yo) {
		ctx.fillStyle = this.colour;
		ctx.fillRect(-xo, -yo, this.w, this.h);
		for(var i = 0; i < this.floors.length; i++)
			this.floors[i].draw(xo, yo);
	}

	draw(xo, yo) {
		this.drawFloor(xo, yo);
		this.drawWalls(xo, yo);
	}
}

var currentMap = new map(700, 700, "green");
currentMap.addFloor(new shape([100,200, 200,100, 500,100, 600,200, 600,500, 500,600, 200,600, 100,500], "lightgrey"));
currentMap.addWall(new shape([50,50, 100,48, 123,50, 120,120, 53,121], "darkgrey"));
currentMap.addWall(new shape([220,500, 480,480, 300,220], "darkgrey"));
