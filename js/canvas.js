var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

function stretchCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
stretchCanvas();

window.onresize = stretchCanvas;
