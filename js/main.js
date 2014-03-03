/* main.js

*/

/******* Variables ********/
var FRAME_TIME = 1000 / 60; // 60 FPS
var startScreenState = 0;
var gameRunningState = 1;
var currentState;

var gamethread;

var ground = document.getElementById("ground");
var ceiling = document.getElementById("ceiling");
var sprite = document.getElementById("sprite");
 
var position = 280;
var speed = 0;
var jump = -6; // -6 or -8
var gravity = 0.3; // 0.5 
/*var speed = 0;
var jump = -10
var gravity = 0.5*/



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
	
	ground.style.webkitAnimationPlayState = 'running';
	ceiling.style.webkitAnimationPlayState = 'running';
	sprite.style.webkitAnimationPlayState = 'paused'; //no sprite webkit animation for now
	
	

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
}

/* Change positions to update sprite */
function spriteJump(){
	// action of sprite will be here
	speed = jump;

}

/* Main game loop */
function gameThread(){
	/* console.log( "gameThread!" );
	speed += gravity;
	position += speed;
	position = 100;
	sprite.style.top = position;
	//$(srpite).css(top, position);
	console.log( position ); */
	
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
	
	left = boundingBox.left;
	right = boundingBox.right;
	bottom = boundingBox.bottom;
	spriteTop = bottom - 50;
	
	spriteTop = bottom - 50;
	console.log("bottom: " + bottom );
	console.log("top: " + spriteTop);
	console.log("ceiling: " + ceiling.getBoundingClientRect().bottom ); 

	if( bottom >= ground.getBoundingClientRect().top){
		//ground collision - game over
		gameOver();
	}
	
	if( spriteTop <= ceiling.getBoundingClientRect().bottom){
		console.log( "collide top" )
		//ceiling collision - set speed to prevent jumping further
		speed = 0;
	}
}

/* End the game when collision occurs */
function gameOver(){
		clearInterval(gamethread);
		startScreen();
}

/* Pipes */
function drawPipes(){


}

