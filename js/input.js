var mouse = {x:0, y:0};
var keyboardState = [];

function trackMouse(event) {
	if(event == null)
		return;
	mouse.x = event.clientX;
	mouse.y = event.clientY;
}
trackMouse();
canvas.addEventListener("mousemove", trackMouse, false);

window.onkeyup = function(event) {
	keyboardState[event.keyCode] = false;
}
window.onkeydown = function(event) {
	keyboardState[event.keyCode] = true;
}

function keyDown(k) {
	return keyboardState[k];
}
