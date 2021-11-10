function draw() {
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	var xo = player.x - canvas.width/2;
	var yo = player.y - canvas.height/2;

	currentMap.draw(xo, yo);
	player.draw(xo, yo);
}

setInterval(draw, 1000/25);
