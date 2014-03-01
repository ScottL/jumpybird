/* main.js

*/
var startScreenState = 0;
var gameRunningState = 1;

var currentState;

var ground = document.getElementById("ground");
var ceiling = document.getElementById("ceiling");
var sprite = document.getElementById("sprite");
 
var position = 280;
var speed = 0;
var jump = -10;
var gravity = 2;

$(document).on("mousedown", leftClick);
$(document).ready(function(){
	console.log( "ready!" );
	// setup and initilize
	// show start / splash screen
	
	startScreen();
});


function startScreen(){
	currentState = startScreenState;
	//$('ground').addClass('notransition'); // to remove transition
	//$('ceiling').addClass('notransition'); // to remove transition
	
	ground.style.webkitAnimationPlayState = 'running';
	ceiling.style.webkitAnimationPlayState = 'running';
	sprite.style.webkitAnimationPlayState = 'paused';

}

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

function gameStart(){
	currentState = gameRunningState;
}

function jumpUp(){
	// action of sprite will be here
	
	
	sprite.style.top = position;
}

function gameThread(){
	// main thread to loop the game

}
