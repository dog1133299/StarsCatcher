
function deg(d) {
	return d/180*Math.PI;
}

 var canvas=document.getElementById('canvas');
 var ctx=canvas.getContext('2d'); 
 var cursorX=0;
 var cursorY=0;
 var level=40;
 var score=0;
 var life=3;
 var starRadius=8;
 var rockRadius=15;
 var starSpeed=3;
 var rockSpeed=5;
 var stars=[];
	function star(sx) {
		this.X=sx;
		this.Y=0;
		this.angle=0;
		this.name='s';
	}
var rocks=[];
	function rock(sx) {
		this.X=sx;
		this.Y=0;
		this.angle=180;
		this.name='r';
	}
 var bucketX=canvas.width/2;
 var bucketWidth=80;
 var bucketHeight=50;
 var DrawTimer;
 var beep=document.createElement('audio');
 var gameover=document.createElement('audio');
if (!!(beep.canPlayType&&beep.canPlayType('audio/mpeg').replace(/no/,' '))) {
	beep.src='src/beep.mp3';
	gameover.src='src/blip04.mp3';
}else{
	beep.src='src/beep.ogg';
	gameover.src='src/gameover.ogg';

}

document.getElementById("button").addEventListener("click",function(){

	DrawTimer=setInterval(draw,20);
	this.style.display="none";
	document.getElementById("msg").style.display="none";
});
document.getElementById("reload").addEventListener("click",function(){

	  document.location.reload();
});
document.addEventListener("mousemove",mouseMoveHandler,false);


function mouseMoveHandler(e){
	bucketX=e.clientX- canvas.offsetLeft; 
	//var relativeX = e.clientX - canvas.offsetLeft;
	//console.log(cursorX);
	//console.log(cursorY);

};
 
function DrawBucket(){

ctx.beginPath();
ctx.moveTo(bucketX+bucketWidth/2,canvas.height-30-bucketHeight);
//ctx.quadraticCurveTo(bucketX-bucketWidth/2,canvas.height-30-bucketHeight,bucketX-bucketWidth/2,canvas.height-30-bucketHeight/2);
ctx.lineTo(bucketX-bucketWidth/2,canvas.height-30-bucketHeight);
ctx.quadraticCurveTo(bucketX-bucketWidth/2,canvas.height-30,bucketX,canvas.height-30);
ctx.quadraticCurveTo(bucketX+bucketWidth/2,canvas.height-30,bucketX+bucketWidth/2,canvas.height-30-bucketHeight);
//ctx.quadraticCurveTo(bucketX+bucketWidth/2,canvas.height-30-bucketHeight,bucketX,canvas.height-30-bucketHeight);
//ctx.lineTo(bucketX-bucketWidth/2,canvas.height-30-bucketHeight);
ctx.fillStyle="rgba(200,200,250,0.8)"
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(bucketX+bucketWidth/4,canvas.height-30-bucketHeight/2,bucketWidth/8,0,Math.PI*2);
ctx.fillStyle="rgba(255,255,255,1)";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(bucketX-bucketWidth/4,canvas.height-30-bucketHeight/2,bucketWidth/8,0,Math.PI*2);
ctx.fillStyle="rgba(255,255,255,1)";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(bucketX+bucketWidth/4,canvas.height-35-bucketHeight/2,bucketWidth/16,0,Math.PI*2);
ctx.fillStyle="rgba(0,0,0,1)";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(bucketX-bucketWidth/4,canvas.height-35-bucketHeight/2,bucketWidth/16,0,Math.PI*2);
ctx.fillStyle="rgba(0,0,0,1)";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(bucketX+bucketWidth/4,canvas.height-30-bucketHeight/5,bucketWidth/16,0,Math.PI*2);
ctx.fillStyle="rgba(250,0,0,0.3)";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(bucketX-bucketWidth/4,canvas.height-30-bucketHeight/5,bucketWidth/16,0,Math.PI*2);
ctx.fillStyle="rgba(250,0,0,0.3)";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(bucketX+bucketWidth/16,canvas.height-30-bucketHeight/5,bucketWidth/16,0,Math.PI);
ctx.strokeStyle="rgba(0,0,0,1)";
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.arc(bucketX-bucketWidth/16,canvas.height-30-bucketHeight/5,bucketWidth/16,0,Math.PI);
ctx.strokeStyle="rgba(0,0,0,1)";
ctx.stroke();
ctx.closePath();
}

function DrawStar(n){ 
	var starY=stars[n].Y;
	var starX=stars[n].X;
	var ang=stars[n].angle;
	var r=starRadius;

	ctx.beginPath();
 	ctx.arc(starX,starY,3.2*r,0,Math.PI*2);
 	ctx.fillStyle="rgba(255,255,255,0.1)";
 	ctx.fill();
 	ctx.closePath();


	ctx.beginPath();
	ctx.moveTo(starX+r*Math.cos(deg(ang)),starY+r*Math.sin(deg(ang)));
	ctx.quadraticCurveTo(starX+3*r*Math.cos(deg(ang+36)),starY+3*r*Math.sin(deg(ang+36)),starX+r*Math.cos(deg(ang+72)),starY+r*Math.sin(deg(ang+72)));
	ctx.quadraticCurveTo(starX+3*r*Math.cos(deg(ang+36+72)),starY+3*r*Math.sin(deg(ang+36+72)),starX+r*Math.cos(deg(ang+72*2)),starY+r*Math.sin(deg(ang+72*2)));
	ctx.quadraticCurveTo(starX+3*r*Math.cos(deg(ang+36+72*2)),starY+3*r*Math.sin(deg(ang+36+72*2)),starX+r*Math.cos(deg(ang+72*3)),starY+r*Math.sin(deg(ang+72*3)));
	ctx.quadraticCurveTo(starX+3*r*Math.cos(deg(ang+36+72*3)),starY+3*r*Math.sin(deg(ang+36+72*3)),starX+r*Math.cos(deg(ang+72*4)),starY+r*Math.sin(deg(ang+72*4)));
	ctx.quadraticCurveTo(starX+3*r*Math.cos(deg(ang+36+72*4)),starY+3*r*Math.sin(deg(ang+36+72*4)),starX+r*Math.cos(deg(ang+72*5)),starY+r*Math.sin(deg(ang+72*5)));
	ctx.fillStyle="rgb(255, 219, 77)";
	ctx.fill();
	ctx.closePath();

 	ctx.beginPath();
 	ctx.arc(starX,starY-r*3,1.7,0,Math.PI*2);
 	ctx.fillStyle="white";
 	ctx.fill();
 	ctx.closePath();

 	ctx.beginPath();
 	ctx.arc(starX,starY-r*5,1.5,0,Math.PI*2);
 	ctx.fillStyle="white";
 	ctx.fill();
 	ctx.closePath();

 	

	stars[n].angle+=3;
		if (stars[n].Y<canvas.height) {
			stars[n].Y+=starSpeed;
		} 
}

function DrawRock(n){
	var rockY=rocks[n].Y;
	var rockX=rocks[n].X;
	var ang=rocks[n].angle;
	var r=rockRadius;

	ctx.beginPath();
 	ctx.arc(rockX,rockY,r*1.7,0,Math.PI*2);
 	ctx.fillStyle="rgba(100,0,10,0.1)";
 	ctx.fill();
 	ctx.closePath();

	ctx.beginPath();
 	ctx.arc(rockX,rockY,r,0,Math.PI*2);
 	ctx.fillStyle="rgb(210,210,210)";
 	ctx.fill();
 	ctx.closePath();

 	ctx.beginPath();
 	ctx.arc(rockX+Math.cos(deg(ang+30))*r/2,rockY+Math.sin(deg(ang+30))*r/2,r/3,0,Math.PI*2);
 	ctx.fillStyle="rgb(0,0,0)";
 	ctx.fill();
 	ctx.closePath();

 	ctx.beginPath();
 	ctx.arc(rockX+Math.cos(deg(ang+150))*r/2,rockY+Math.sin(deg(ang+150))*r/2,r/3,0,Math.PI*2);
 	ctx.fillStyle="rgb(0,0,0)";
 	ctx.fill();
 	ctx.closePath();

 	ctx.beginPath();
 	ctx.arc(rockX+Math.cos(deg(ang+90))*r/3,rockY+Math.sin(deg(ang+90))*r/3,r,deg(ang-20),deg(ang-160),true);
 	ctx.strokeStyle="rgb(0,0,0)";
 	ctx.stroke();
 	ctx.closePath();

 	ctx.beginPath();
 	ctx.arc(rockX,rockY,1,0,Math.PI*2);
 	ctx.fillStyle="rgb(0,0,0)";
 	ctx.fill();
 	ctx.closePath();

 	rocks[n].angle++;
 		if (rocks[n].Y<canvas.height) {
 			rocks[n].Y+=rockSpeed;
 		}

}

function drawScore(){
	ctx.font="25px fantasy";
	ctx.fillStyle="white";
	ctx.fillText("Score: "+score,20,canvas.height-20);

	if (life>0) {
	ctx.beginPath();
	ctx.moveTo(canvas.width-30,25);
	ctx.quadraticCurveTo(canvas.width-10,10,canvas.width-30,40);
	ctx.quadraticCurveTo(canvas.width-50,10,canvas.width-30,25);
	ctx.fillStyle="pink";
	ctx.fill();
	ctx.closePath();
	}
	if (life>1) {
	ctx.beginPath();
	ctx.moveTo(canvas.width-60,25);
	ctx.quadraticCurveTo(canvas.width-40,10,canvas.width-60,40);
	ctx.quadraticCurveTo(canvas.width-80,10,canvas.width-60,25);
	ctx.fillStyle="pink";
	ctx.fill();
	ctx.closePath();
	}

	if (life>2) {
	ctx.beginPath();
	ctx.moveTo(canvas.width-90,25);
	ctx.quadraticCurveTo(canvas.width-70,10,canvas.width-90,40);
	ctx.quadraticCurveTo(canvas.width-110,10,canvas.width-90,25);
	ctx.fillStyle="pink";
	ctx.fill();
	ctx.closePath();
	}

}
function bucketCatch(obj){

	var tmp=obj.length;
	for (var i = 0; i < tmp; i++) {
		if (obj[i].Y>canvas.height-30-bucketHeight/4*3&&obj[i].Y<canvas.height-30&&obj[i].X<bucketX+bucketWidth/2&&obj[i].X>bucketX-bucketWidth/2) {
			
			if (obj[i].name=='s') {
				score++;
				beep.cloneNode().play();
			}else{
				score--;
				life--;
				gameover.cloneNode().play();
			}
			obj.shift(obj[i]);
			//console.log(score);
			i--;
			tmp--;
		}
	}
 
	tmp=obj.length;
	for (var i = 0; i < tmp; i++) {
		if (obj[i].Y>canvas.height-30) {
			obj.shift(obj[i]);
			i--;
			tmp--;
		}
	}
	
}
 function draw() { 

 	if (bucketX+bucketWidth/2>=canvas.width) {
 		bucketX=canvas.width-bucketWidth/2;
 	}
 	if (bucketX<=bucketWidth/2) {
 		bucketX=bucketWidth/2;
 	}

 	ctx.clearRect(0,0,canvas.width,canvas.height);
 	DrawBucket();

//new star
 	if (stars.length<20&&Math.ceil(Math.random()*level)==level/2) {
 	var s =new star(Math.ceil(Math.random()*20)*29);
 	stars.push(s);
 	}
//new rock
 	if (rocks.length<10&&Math.ceil(Math.random()*level*2)==level/2) {
	 	var s =new rock(Math.ceil(Math.random()*20)*29);
	 	rocks.push(s);

 	}

	bucketCatch(stars);
	bucketCatch(rocks);
 //draw star 
 	for (var i = 0; i < stars.length; i++) {
 		 DrawStar(i);
 	}
 	for (var i = 0; i < rocks.length; i++) {
 		 DrawRock(i);
 	}
 	 
	drawScore();
	 if (score>starSpeed*5&&starSpeed<20) {
	 		starSpeed++;
	 	if (rockSpeed<22) {
	 		rockSpeed++;
	 	}

	 }
	 	
	if (life<0) {
		clearInterval(DrawTimer); 
		document.getElementById("msg").innerHTML="Game Over!<br> Score:"+score;
		document.getElementById("msg").style.display="block";
		document.getElementById("reload").style.display="block";
	}
	if (score>99) {
		clearInterval(DrawTimer); 
		document.getElementById("msg").innerHTML="Catch 99 stars!!<br> You wim!";
		document.getElementById("msg").style.display="block";
		document.getElementById("reload").style.display="block";
	}
 }


