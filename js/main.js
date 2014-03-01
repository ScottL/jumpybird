/* main.js

*/
var FRAME_TIME = 1000 / 30; // 30 FPS
var startScreenState = 0;
var gameRunningState = 1;
var currentState;

var ground = document.getElementById("ground");
var ceiling = document.getElementById("ceiling");
var sprite = document.getElementById("sprite");
 
var position = 280;
/*var speed = 0;
var jump = -5; // -6 or -8
var gravity = 0.2; // 0.5 */
var speed = 0;
var jump = -10
var gravity = 0.5

$(document).on("mousedown", leftClick);
$(document).ready(function(){
	console.log( "ready!" );
	// setup and initilize
	// show start / splash screen
	
	startScreen();
});

/* Start / Spash screen. Called when document is ready */
function startScreen(){
	currentState = startScreenState;
	//$('ground').addClass('notransition'); // to remove transition
	//$('ceiling').addClass('notransition'); // to remove transition
	
	ground.style.webkitAnimationPlayState = 'running';
	ceiling.style.webkitAnimationPlayState = 'running';
	sprite.style.webkitAnimationPlayState = 'paused';
}

/* Left screen click action */
function leftClick(){
	console.log( "screen click!" );
	
	// start game if still on start / splash screen
	// perform jump action if game is running
	if (currentState == startScreenState){
		gameStart();
	} else if (currentState == gameRunningState){
		jumpUp();
	}
}

/* Game is running state. */
function gameStart(){
	currentState = gameRunningState;
	
	jumpUp();
	setInterval( gameThread, FRAME_TIME );
}

/* Change positions to update sprite */
function jumpUp(){
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
}
