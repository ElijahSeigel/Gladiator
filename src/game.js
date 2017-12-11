//game control class
//beta to develop character
import Character from './character';
import CollisionController from './collision-controller';
import ObjectController from './object-controller';
import Environment from './ENV';
import Enemy from './enemy'

export default class Game{
	constructor(){
		//initializing boring state variables
		this.over = false;
		this.level = 1;
		this.paused = true;
		this.input = [];

		//this is the size of the displayed screen -> subject to change depending on env
		this.width = 1500;
		this.height = 650;

		//construct game entities and collision control
		this.collisionControl = new CollisionController();
		this.objectController = new ObjectController();
		this.environment = new Environment(this.height, this.width, this.level, this.objectController);
		this.collisionControl.addEnvironment(this.environment.level1);
		this.collisionControl.addObjects(this.environment.objects);

		// Add enemies for 4 (tentative) levels
		this.enemies = [
			[], [], [], []
		]
		// Level 1 enemies
		this.enemies[1].push(new Enemy(218, 166, 30, 20, 'ork1', 40, ['R', 'L', 'R'], true, 100, 2, this.collisionControl));
		this.enemies[1].push(new Enemy(1059, 166, 30, 20, 'ork2', 40, ['R', 'R', 'L'], true, 100, 1, this.collisionControl));
		this.enemies[1].push(new Enemy(714, 452, 30, 20, 'ork3', 40, ['R', 'L', 'L'], true, 100, 4, this.collisionControl));
		// Level 2 enemies

		// Level 3 enemies

		this.player = new Character (1370, 420, this.collisionControl);
		this.player.addObjectController(this.objectController);
		this.collisionControl.addPlayer(this.player);
		//TO DO: ADD AI AND ADD AI TO collisionController
		this.collisionControl.addPlayer(this.player);

		// Create the back buffer canvas
		this.backBufferCanvas = document.createElement('canvas');
		this.backBufferCanvas.width = this.width;
		this.backBufferCanvas.height = this.height;
		this.backBufferContext = this.backBufferCanvas.getContext('2d');

		// Create the screen buffer canvas
		this.screenBufferCanvas = document.createElement('canvas');
		this.screenBufferCanvas.width = this.width;
		this.screenBufferCanvas.height = this.height;
		document.body.appendChild(this.screenBufferCanvas);
		this.screenBufferContext = this.screenBufferCanvas.getContext('2d');

		// Create HTML UI Elements
		var message = document.createElement('div');
		message.id = "message";
		message.textContent = "";
		document.body.appendChild(message);

		// Initialize level art
		this.image = new Image();
		this.image.src = "/levelArt/level1.png";

		// Bind class functions
		this.handleInput = this.handleInput.bind(this);
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
		this.loop = this.loop.bind(this);

		// Set up event handlers
		window.onkeydown = this.handleInput;
		window.onkeyup = this.handleInput;

		// Start the game loop
		setTimeout(() => {

			// Set call some functions
			//this.nextLevel();
			this.render();
			this.collisionControl.addEnemies(this.enemies[this.level]);
			this.interval = setInterval(this.loop, 30);
		}, 3000)

	}//end constructor

	  //function which builds a list of input
	  //keeping track of what keys are currently being pressed
	  //to allow for countinuous input from multiple keys
	handleInput(e) {
		var map = {};
		var map2 = {};
		map2[e.keyCode] = e.type == 'keyup';
		if(!this.paused){
			if (map2[38]){//up
			  this.input = this.input.filter(function(i){
				return i!== 'jump';
			  });
			}
			if (map2[37]){//left
			  this.input = this.input.filter(function(i){
				return i!== 'left';
			  });
			}

			if (map2[39]){//right
			  this.input = this.input.filter(function(i){
				return i!== 'right';
			  });
			}
			if (map2[87]){//w
			  this.input = this.input.filter(function(i){
				return i!== 'sword';
			  });
			}
			if (map2[69]){//e
			  this.input = this.input.filter(function(i){
				return i!== 'lightning';
			  });
			}
			if (map2[82]){//r
			  this.input = this.input.filter(function(i){
				return i!== 'dash';
			  });
			}
		}
		map[e.keyCode] = e.type == 'keydown';
		if(!this.paused){
			if ((map[38])&& this.input.findIndex(function(i){return i=== 'jump'})=== -1 )//up
			  this.input.push('jump');
			if ((map[37])&& this.input.findIndex(function(i){return i=== 'left'})=== -1 )//left
			  this.input.push('left');
			if ((map[39])&& this.input.findIndex(function(i){return i=== 'right'})=== -1 )//right
			  this.input.push('right');
			if ((map[87])&& this.input.findIndex(function(i){return i=== 'sword'})=== -1 )//w
			  this.input.push('sword');
			if ((map[69])&& this.input.findIndex(function(i){return i=== 'spear'})=== -1 )//e
			  this.input.push('lightning');
			if ((map[82])&& this.input.findIndex(function(i){return i=== 'dash'})=== -1 )//r
			  this.input.push('dash');
			if (map[27])//esc
			  this.paused=true;
		}else{
			if (map[27])//esc
			  this.paused=false;
			  this.render();
		}
	}//end handle input


	//function to update the game world
  update() {
			this.player.update(this.input);
			/*if(this.collisionControl){
				this.nextLevel();
			}*/
			this.enemies[this.level].forEach(enemy => enemy.update(this.player.positionVector));
			//this.environment.update(this.player.positionVector);
  }//end update

	//render the game world
	render() {

		//console.log(this.image.src)
		this.backBufferContext.drawImage(this.image, 0, 0);
		this.enemies[this.level].forEach(enemy => enemy.render(this.backBufferContext));
		this.player.render(this.backBufferContext);
		this.objectController.render(this.backBufferContext);
		this.screenBufferContext.drawImage(this.backBufferCanvas,0,0);

		//display game over and message
		if(this.over){
			this.screenBufferContext.fillStyle = 'rgba(255,255,255, .2)';
			this.screenBufferContext.fillRect(0,0, this.width, this.height);
			this.screenBufferContext.fillStyle = "white";
			this.screenBufferContext.strokeStyle = "black";
			this.screenBufferContext.fillText("Game Over", 20, 200);
			this.screenBufferContext.strokeText("Game Over", 20, 200);
		}
		//display paused screen and instructions
    if(this.paused && ! this.over){
			this.screenBufferContext.fillStyle = 'rgba(255,255,255, .2)';
			this.screenBufferContext.fillRect(0,0, this.width, this.height);
			this.screenBufferContext.fillStyle = "white";
			this.screenBufferContext.strokeStyle = "black";
			this.screenBufferContext.font = '40px sans-serif';
			this.screenBufferContext.fillText("Game Paused", 20, 100);
			this.screenBufferContext.strokeText("Game Paused", 20, 100);
			this.screenBufferContext.font = '30px sans-serif';
			this.screenBufferContext.fillText("Press esc to resume", 20, 140);
			this.screenBufferContext.strokeText("Press esc to resume", 20, 140);
			this.screenBufferContext.font = '40px sans-serif';
			this.screenBufferContext.fillText("Instructions", 20, 190);
			this.screenBufferContext.strokeText("Instructions", 20, 190);
			this.screenBufferContext.font = '30px sans-serif';
			this.screenBufferContext.fillText("Reach the ladder to complete a level", 20, 230);
			this.screenBufferContext.strokeText("Reach the ladder to complete a level", 20, 230);
			this.screenBufferContext.fillText("Jump: up arrow", 20, 270);
			this.screenBufferContext.strokeText("Jump: up arrow", 20, 270);
			this.screenBufferContext.fillText("Move right: right arrow", 20, 310);
			this.screenBufferContext.fillText("Move left: left arrow", 20, 350);
			this.screenBufferContext.strokeText("Move right: right arrow", 20, 310);
			this.screenBufferContext.strokeText("Move left: left arrow", 20, 350);
			this.screenBufferContext.fillText("Punch: 'Q' ", 20, 390);
			this.screenBufferContext.strokeText("Punch: 'Q' ", 20, 390);
			if(this.player.moves.sword){
				this.screenBufferContext.fillText("Stab: 'W' ", 20, 430);
				this.screenBufferContext.strokeText("Stab: 'W' ", 20, 430);
			}
			if(this.player.moves.spear){
				this.screenBufferContext.fillText("Impale: 'E' ", 20, 470);
				this.screenBufferContext.strokeText("Impale: 'E' ", 20, 470);
			}
			//display paused screen and instructions
		if(this.paused && ! this.over){
				this.screenBufferContext.fillStyle = 'rgba(255,255,255, .2)';
				this.screenBufferContext.fillRect(0,0, this.width, this.height);
				this.screenBufferContext.fillStyle = "white";
				this.screenBufferContext.strokeStyle = "black";
				this.screenBufferContext.font = '40px sans-serif';
				this.screenBufferContext.fillText("Game Paused", 20, 100);
				this.screenBufferContext.strokeText("Game Paused", 20, 100);
				this.screenBufferContext.font = '30px sans-serif';
				this.screenBufferContext.fillText("Press esc to resume", 20, 140);
				this.screenBufferContext.strokeText("Press esc to resume", 20, 140);
				this.screenBufferContext.font = '40px sans-serif';
				this.screenBufferContext.fillText("Instructions", 20, 190);
				this.screenBufferContext.strokeText("Instructions", 20, 190);
				this.screenBufferContext.font = '30px sans-serif';
				this.screenBufferContext.fillText("Reach the ladder to complete a level", 20, 230);
				this.screenBufferContext.strokeText("Reach the ladder to complete a level", 20, 230);
				this.screenBufferContext.fillText("Jump: up arrow", 20, 270);
				this.screenBufferContext.strokeText("Jump: up arrow", 20, 270);
				this.screenBufferContext.fillText("Move right: right arrow", 20, 310);
				this.screenBufferContext.fillText("Move left: left arrow", 20, 350);
				this.screenBufferContext.strokeText("Move right: right arrow", 20, 310);
				this.screenBufferContext.strokeText("Move left: left arrow", 20, 350);
				this.screenBufferContext.fillText("Stab: 'W' ", 20, 390);
				this.screenBufferContext.strokeText("Stab: 'W' ", 20, 390);
				if(this.player.moves.lightning){
					this.screenBufferContext.fillText("Lightning: 'E' ", 20, 430);
					this.screenBufferContext.strokeText("Lightning: 'E' ", 20, 430);
				}
				if(this.player.moves.dash){
					this.screenBufferContext.fillText("Dash: 'R' ", 20, 470);
					this.screenBufferContext.strokeText("Dash: 'R' ", 20, 470);
				}
			}
		//GUI overlay
		}//end if game !over
	}// end render

	nextLevel() {
		this.level++;
		this.image.src = "/levelArt/level" + this.level + ".png";
		this.collisionControl.addEnvironment(this.environment.nextLevel());
		if(this.level === 1)this.player.warpToStart(100,250);
		else if(this.level === 2)this.player.warpToStart(750,400);
		else if(this.level === 3)this.player.warpToStart(300,275);
		else return;//win the game
		//console.log(this.level)
		// call env method to change background
		// change character location
	}

  //game loop, updates and renders each frame
  loop() {
		if (this.level < 0) return;
		if(!this.paused){
				this.update();
				this.render();
		}
  }//end loop

}//end game class
