/* main.js

*/

/******* Variables ********/
var FRAME_TIME = 1000 / 60; // 60 FPS
var startScreenState = 0;
var gameRunningState = 1;
var endScreenState = 2;
var currentState;

var groundCollision = 0;
var pipeCollision = 1;
var collisionType;

var gamethread;
var pipethread;

var ground = document.getElementById("ground");
var ceiling = document.getElementById("ceiling");
var sprite = document.getElementById("sprite");
var sky = document.getElementById("sky");
var pipe = document.getElementById("pipe");
 
var position = 280;
var speed = 0;
var jump = -6.5; // -6 or -8
var gravity = 0.3; // 0.5 

var pipeHeight = 160; //space to fly through
var pipeWidth = 52;
var pipeQueue = new Array();


var soundIntro = new buzz.sound("assets/sound_intro.ogg");
var soundJump = new buzz.sound("assets/sound_jump.ogg");
var soundPassPipe = new buzz.sound("assets/sound_score.ogg");


/******* Functions ********/
$(document).ready(function(){
	console.log( "ready!" );
	// setup and initilize
	// show start / splash screen
	
	startScreen();
});

/* Mouse click events */
$(document).mousedown(function(event) {
    switch (event.which) {
		case 1:
            leftClick();
            break;
        case 2:
            //alert('Middle mouse button pressed');
            break;
        case 3:
            //alert('Right mouse button pressed');
            break;
        default:
    }
});

/* Start / Spash screen. Called when document is ready */
function startScreen(){
	currentState = startScreenState;
	$(".animated").css('animation-play-state', 'running');
	$(".animated").css('-webkit-animation-play-state', 'running');
	//$('ground').addClass('notransition'); // to remove transition
	//$('ceiling').addClass('notransition'); // to remove transition
	
	$(".pipe").remove();
	pipeQueue = new Array();
	
	speed = 0;
	position = 280;
	$("#sprite").css({ y: 0, top: 0});
	
	var spritePos = $("#sprite").position().top;
	var defaultPos = 300;
	var toOriginal = Math.max(defaultPos - spritePos);	
	console.log( "Sprite pos: " +  spritePos);
	console.log( "move  " +  toOriginal);
	$("#sprite").transition({ top: toOriginal + 'px'}, 500, 'easeInQuad');
	$("#intro").transition({ opacity: 1 }, 500, 'easeInQuad');
	soundIntro.play();
	
}

/* Left screen click action */
function leftClick(){
	console.log( "screen click!" );
	
	// start game if still on start / splash screen
	// perform jump action if game is running
	if (currentState == startScreenState){
		gameStart();
	} else if (currentState == gameRunningState){
		spriteJump();
	} else if (currentState == endScreenState){
		startScreen();
	}
}

/* Game is running state. */
function gameStart(){
	currentState = gameRunningState;
	$("#intro").transition({ opacity: 0 }, 500, 'easeInQuad');

	spriteJump();
	gamethread = setInterval( gameThread, FRAME_TIME );
	pipethread = setInterval( drawPipes, 1300 );

}

/* Change positions to update sprite */
function spriteJump(){
	// action of sprite will be here
	speed = jump;
	soundJump.stop();
	soundJump.play();
}

/* Main game loop */
function gameThread(){
	
	speed += gravity;
	position += speed;
	detectCollision();
	sprite.style.top = position + 'px';
	detectCollision();
	//console.log( "detect" )
}

/* Sprite colliaion with floor, ceiling, or pipes
 using boounding boxes */
function detectCollision(){
	var boundingBox = sprite.getBoundingClientRect();	
	spriteLeft = boundingBox.left;
	spriteRight = boundingBox.right;
	spriteBottom = boundingBox.bottom - 5; //not accurate
	spriteTop = spriteBottom - 50 + 10;
	
	//console.log("bottom: " + bottom );
	//console.log("top: " + spriteTop);
	//console.log("ceiling: " + ceiling.getBoundingClientRect().bottom ); 

	if( spriteBottom >= ground.getBoundingClientRect().top){
		collisionType = groundCollision;
		gameOver();
	}
	
	if( spriteTop <= ceiling.getBoundingClientRect().bottom){
		console.log( "collide top" )
		//ceiling collision - set speed to prevent jumping further
		speed = 0;
	}
	
	//Pipe collision detection
	if(pipeQueue[0] == null)
		return;
		
	var nextPipe = pipeQueue[0];
	var topPipe = nextPipe.children(".pipeBottom");
	var pipeTop = topPipe.height() - 10;
	var pipeLeft = topPipe.offset().left; 
	var pipeRight = pipeLeft + pipeWidth;
	var pipeBottom = pipeTop + pipeHeight;
   
	if(spriteRight > pipeLeft){
		if(spriteTop > pipeTop && spriteBottom < pipeBottom){
			//passed 
			soundPassPipe.play();
			console.log("spriteTop: " + spriteTop + "pipeTop: " + pipeTop);
			console.log("spriteBottom: " + spriteBottom + "pipeBottom: " + pipeBottom);
		}
		else {
			//collision
			console.log("collide");
			collisionType = pipeCollision;
			gameOver();
			return;
		}
	}
	
	//remove passed pipe from array
	if(spriteLeft > pipeRight) {
	  pipeQueue.splice(0, 1);
	}
	
}

/* End the game when collision occurs */
function gameOver(){
		clearInterval(gamethread);
		clearInterval(pipethread);
		
		$(".animated").css('animation-play-state', 'paused');
		$(".animated").css('-webkit-animation-play-state', 'paused');

		if (collisionType == pipeCollision){
			var sprite = $("#sprite").position().top + $("#sprite").height();		
			var ground = $("#sky").height();
			var drop = Math.max( ground - sprite);
			$("#sprite").transition({ y: drop + 'px'}, 800, 'easeInOutQuad');
			console.log( "Sprite pos: " +  sprite + "ground: " + ground);
			console.log( "drop  " +  drop);
		}
		scoreScreen();
}

/* End game. Display sceen, restart button */
function scoreScreen(){
	currentState = endScreenState;
	console.log("Click once more to restart");

}


/* Pipe creation */
function drawPipes(){	
	screenHeight = document.getElementById('sky').clientHeight;
	minHeight = 80;  //minimum pipe height  
	limit = screenHeight - pipeHeight - (minHeight);
	bottomheight = Math.floor((Math.random() * limit) + minHeight);  
	topheight = screenHeight - bottomheight - pipeHeight;
	
	newPipe = $('<div class="pipe animated"><div class="pipeBottom" style="height: ' + bottomheight + 'px;"></div><div class="pipeTop" style="height: ' + topheight + 'px;"></div></div>');
	$("#sky").append(newPipe);
	pipeQueue.push(newPipe);
	
}

