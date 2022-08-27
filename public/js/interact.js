let canvas, ctx, w, h, particles = [];
let mouse = {
	x: undefined,
	y: undefined
}
let hue = 0;
var moving = false;

function init() {
	canvas = document.querySelector("canvas");
	ctx = canvas.getContext("2d");
	resizeReset();
    animate();
}

function resizeReset() {
	w = canvas.width = window.innerWidth;
	h = canvas.height = window.innerHeight;
}

function drawScene() {
	particles.map((particle) => {
		particle.update();
		particle.draw();
	})
}

function arrayCleanup(){
    particles.map((particle) => {
        if(particle.r === 0)
            return ;
        else return particle;
    })
}

class Particle{
    constructor(x,y,r,color){
        this.x=x;
        this.y=y;
        this.r=r;
        this.hue = hue % 360;
        this.alpha=1
        this.hue
		this.color=color
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        // ctx.strokeStyle = `hsla(${this.hue}, 100%, 50%, ${this.alpha})`;
		ctx.strokeStyle = this.color;
        ctx.stroke();
    }
    update(){
        if(this.r>=.1)
        this.r-=.1;
		else
		this.r=0;
    }
}
var toogle =true;
function animate(){
	if(toogle){
	var radius = Math.floor(Math.random() * 10);
	// var color = Math.floor(Math.random()*2)===0?"#7267CB":"#00ddff";
	var x = Math.floor(Math.random() * w)
	var y = Math.floor(Math.random() * h)
	particles.push(new Particle(x,y,radius,"#eee"));
	toogle=false;
	}else toogle = true;
	
	if(mouse.x!=undefined && mouse.y!=undefined && moving){
		var radius = Math.floor(Math.random() * 20);
		var color = Math.floor(Math.random()*2)===0?"#7267CB":"#00ddff";
        particles.push(new Particle(mouse.x,mouse.y,radius,color));
    }

    ctx.clearRect(0, 0, w, h);
	ctx.globalCompositeOperation='destination-over';
    moving = false;
    drawScene();
    arrayCleanup();
    requestAnimationFrame(animate);
}

window.addEventListener("DOMContentLoaded", init);
window.addEventListener('mousemove',(e) => {
    mouse.x = e.x;
    mouse.y = e.y;
    moving = true;
})

// let canvas, ctx, w, h, particles = [];
// let mouse = {
// 	x: undefined,
// 	y: undefined
// }
// let hue = 0;

// function init() {
// 	canvas = document.querySelector("canvas");
// 	ctx = canvas.getContext("2d");
// 	resizeReset();
//     animationLoop();
// }

// function resizeReset() {
// 	w = canvas.width = window.innerWidth;
// 	h = canvas.height = window.innerHeight;
// }
// var moving = false;
// function mousemove(e) {
// 	mouse.x = e.x;
// 	mouse.y = e.y;

//     moving = true;
// }
// var prevX = undefined;
// var prevY = undefined;
// function mouseout() {
// 	mouse.x = undefined;
// 	mouse.y = undefined;
// }

// function animationLoop() {
// 	if (mouse.x != undefined && mouse.y != undefined && moving) {
// 		hue += 10;
// 		particles.push(new Particle(mouse.x, mouse.y));
// 	}
	
// 	ctx.clearRect(0, 0, w, h);
// 	ctx.globalCompositeOperation = 'lighter';
//     moving = false;
// 	drawScene();
// 	arrayCleanup();
// 	requestAnimationFrame(animationLoop);
// }

// function arrayCleanup() {
// 	let dump = [];
// 	particles.map((particle) => {
// 		if (particle.radius > 0) {
// 			dump.push(particle);
// 		}
// 	});
// 	particles = dump;
// }

// function drawScene() {
// 	particles.map((particle) => {
// 		particle.update();
// 		particle.draw();
// 	})
// }

// class Particle {
// 	constructor(x, y) {
// 		this.x = x;
// 		this.y = y;
// 		this.radius = 5;
// 		this.size = 0;
// 		this.rotate = 0;
// 		this.hue = hue % 360;
// 		this.alpha = 0.5;
// 	}
// 	setPoint() {
// 		let r, x, y;
// 		this.point = [];
// 		for (let a = 0; a < 360; a += 36) {
// 			let d = ((a / 36) % 2 === 0) ? this.size : this.size / 2;
// 			// r = (Math.PI / 180) * (a + this.rotate);
//             r=1;
// 			x = this.x + d ;
// 			y = this.y + d;
// 			this.point.push({x: x, y: y, r: this.radius});
// 		}
// 	}
// 	draw() {
// 		if (this.radius <= 0) return;
// 		// draw points
// 		this.point.map((p) => {
// 			ctx.beginPath();
//             ctx.lineTo(p.x,p.y);
// 			ctx.fillStyle = `hsla(${this.hue}, 100%, 50%, ${this.alpha})`;
// 			ctx.fill();
// 			ctx.closePath();
// 		});

// 		// draw lines
// 		ctx.beginPath();
// 		for (let i = 0; i < this.point.length; i++) {
// 			if (i === 0) {
// 				ctx.moveTo(this.point[i].x, this.point[i].y);
// 			} else {
// 				ctx.lineTo(this.point[i].x, this.point[i].y);
// 			}
// 		}
// 		ctx.closePath();
// 		ctx.strokeStyle = `hsla(${this.hue}, 100%, 50%, ${this.alpha})`;
// 		ctx.stroke();
// 	}
// 	update() {
// 		this.setPoint();
// 		this.radius -= .05;
// 		this.size += 1;
// 		this.rotate -= 1;
// 		this.alpha = (this.radius * 0.5 < 0.5) ? this.radius * 0.5 : 0.5;
// 	}
// }

// window.addEventListener("DOMContentLoaded", init);
window.addEventListener("resize", resizeReset);
// window.addEventListener("mousemove", mousemove);
// window.addEventListener("mouseout", mouseout);