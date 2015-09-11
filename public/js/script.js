window.onload = function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	canvas.width = document.body.scrollWidth;
	canvas.height = document.body.scrollHeight;
	console.log(document.body.scrollHeight);
};