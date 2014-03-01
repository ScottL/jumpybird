/* main.js

*/

$(document).ready(function(){
	console.log( "ready!" );
	// setup and initilize

	
	// show ready / splash screem
	startScreen();
});

function startScreen(){
	//$('ground').addClass('notransition'); // to remove transition
	//$('ceiling').addClass('notransition'); // to remove transition
	//var elem = document.getElementById("ground");
	//elem.style.webkitAnimationPlayState = 'paused';

}

function click(){
	// mouse click makes the sprite jump
	jump();
	// or start the game, if game hasnt started
	gameStart();
}

function gameStart(){

}

function jump(){
	// action of sprite will be here
}

function gameThread(){
	// main thread to loop the game

}
