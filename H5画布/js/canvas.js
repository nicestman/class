function Stage(ctx) {
	this.ctx = ctx;
	this.displayObjects = [];
}

Stage.prototype.add = function(displayObject) {
	this.displayObjects.push(displayObject);
};

Stage.prototype.render = function() {
	var displayObjects = this.displayObjects;
	var ctx = this.ctx;

	function loop() {
		ctx.clearRect(0, 0, 400, 400);
		displayObjects.forEach(function(displayObject) {
			displayObject.update(ctx);
		});
		requestAnimationFrame(loop);
	}

	loop();
};

function Rectangle(x, y, w, h) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
}

Rectangle.prototype.update = function(ctx) {
	ctx.beginPath();
	ctx.rect(this.x, this.y, this.w, this.h);
	ctx.stroke();
	ctx.closePath();
};

var stage;

function init() {
	var canvas = document.getElementById('cvs');
	var ctx = canvas.getContext('2d');

	var rect = new Rectangle(10, 10, 20, 40);
	var sqr = new Rectangle(0, 0, 30, 30);
	var sqr1 = new Rectangle(30, 0, 30, 30);
	var sqr2 = new Rectangle(60, 0, 30, 30);
	var sqr3 = new Rectangle(90, 0, 30, 30);
	var sqr4 = new Rectangle(120, 0, 30, 30);

	stage = new Stage(ctx);

	stage.add(rect);
	stage.add(sqr1);
	stage.add(sqr2);
	stage.add(sqr3);
	stage.add(sqr4);
	stage.add(sqr);

	stage.render();

	// change rect position
	setInterval(function() {
		rect.x = (rect.x + 1) % 400;
		rect.y = (rect.y + 1) % 400;
	}, 16)
	
	// 标记是否移动事件
	var isMove = false,
		mouseX = 0,
		mouseY = 0;
	canvas.onmousedown = function(e) {
		isMove = true;
		canvas.style.cursor = "move";
		var box = windowToCanvas(e.clientX, e.clientY);
		mouseX = box.x;
		mouseY = box.y;
		return false;
	}
	
	canvas.onmouseout = function(e) {
		isMove = false;
		canvas.style.cursor = "default";
	}
	
	canvas.onmouseup = function(e) {
		isMove = false;
		canvas.style.cursor = "default";
	}
	
	canvas.onmousemove = function(e) {
		if(isMove) {
			var box = windowToCanvas(e.clientX, e.clientY);
			drawImgByMove(box.x, box.y);
		}
	}
	
	function drawImgByMove(x, y) {
		stage.displayObjects.forEach(function (data,i) {
			if (i>0) {
				data.x = data.x + (x - mouseX);
				data.y = data.y + (y - mouseY);
			}
		});
		mouseX = x;
		mouseY = y;
	}
	
	function windowToCanvas(x,y) {
		var box = canvas.getBoundingClientRect();
		return {
			'x': x - box.left,
			'y': y - box.top
		}
	}
}

init();