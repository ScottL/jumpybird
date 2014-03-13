/* main.js

*/

/******* Variables ********/
var FRAME_TIME = 1000 / 60; // 60 FPS
var startScreenState = 0;
var gameRunningState = 1;
var endGameState = 2;
var currentState;

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
	//$('ground').addClass('notransition'); // to remove transition
	//$('ceiling').addClass('notransition'); // to remove transition
	
	//ground.style.webkitAnimationPlayState = 'running';
	//ceiling.style.webkitAnimationPlayState = 'running';
	sprite.style.webkitAnimationPlayState = 'paused'; //no sprite webkit animation for now
	
	pipeQueue = new Array();


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
	}
}

/* Game is running state. */
function gameStart(){
	currentState = gameRunningState;

	spriteJump();
	gamethread = setInterval( gameThread, FRAME_TIME );
	pipethread = setInterval( drawPipes, 1300 );

}

/* Change positions to update sprite */
function spriteJump(){
	// action of sprite will be here
	speed = jump;

}

/* Main game loop */
function gameThread(){
	
	speed += gravity;
	position += speed;
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
		//ground collision
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
			console.log("spriteTop: " + spriteTop + "pipeTop: " + pipeTop);
			console.log("spriteBottom: " + spriteBottom + "pipeBottom: " + pipeBottom);
		}
		else {
			//collision
			console.log("collide");
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
		currentState = endGameState;
		clearInterval(gamethread);
		clearInterval(pipethread);
		
		$(".animated").css('animation-play-state', 'paused');
		$(".animated").css('-webkit-animation-play-state', 'paused');

		/* End game: Score screen. Restart button */
		
		startScreen();
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

