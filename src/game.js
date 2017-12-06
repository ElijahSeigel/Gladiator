//game control class
//beta to develop character
import Character from './character';
import CollisionController from './collision-controller';
import Environment from './ENV';
import Enemy from './enemy'

export default class Game{
	constructor(){
		//initializing boring state variables
		this.over = false;
		this.level = -1;
		this.paused = true;
		this.input = [];

		//this is the size of the displayed screen -> subject to change depending on env
		this.width = 1500;
		this.height = 650;

		//construct game entities and collision control
		this.collisionControl = new CollisionController();
		this.environment = new Environment(this.height, this.width, this.level);
		this.collisionControl.addEnvironment(this.environment.borders);

		// Add enemies for 4 (tentative) levels
		this.enemies = [
			[], [], [], []
		]
		// Level 0 enemies
		this.enemies[0].push(new Enemy(300, 300, 100, 100, 'ork1', 10, ['R'], true, 100, 2))
		this.enemies[0].push(new Enemy(500, 300, 100, 100, 'ork2', 10, ['R'], true, 100, 2))
		this.enemies[0].push(new Enemy(300, 100, 100, 100, 'ork3', 10, ['R'], true, 100, 2))
		// Level 1 enemies
		
		// Level 2 enemies
		
		// Level 3 enemies
		

		this.maps = [
			// Level Zero
			[
				[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
				[10, 10, 10,  1,  1,  1,  1,  1,  1, 10, 10, 10],
				[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
				[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
				[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
				[10, 10, 10,  1,  1,  1,  1,  1,  1, 10, 10, 10],
				[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
				[10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
				[ 1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 1 ]
			],
			// Level One
			[
				[ 1,  1,  1, 10, 10, 10,  1,  1,  1, 10, 10, 10],
				[ 1,  1,  1, 10, 10, 10,  1,  1,  1, 10, 10, 10],
				[ 1,  1,  1, 10, 10, 10,  1,  1,  1, 10, 10, 10],
				[ 1,  1,  1, 10, 10, 10,  1,  1,  1, 10, 10, 10]
			],
			// Level Two
			[
				[ 1,  1,  1, 10, 10, 10,  1,  1,  1, 10, 10, 10],
				[ 1,  1,  1, 10, 10, 10,  1,  1,  1, 10, 10, 10],
				[ 1,  1,  1, 10, 10, 10,  1,  1,  1, 10, 10, 10],
				[ 1,  1,  1, 10, 10, 10,  1,  1,  1, 10, 10, 10]
			],
			// Level Three
			[
				[ 1,  1,  1, 10, 10, 10,  1,  1,  1, 10, 10, 10],
				[ 1,  1,  1, 10, 10, 10,  1,  1,  1, 10, 10, 10],
				[ 1,  1,  1, 10, 10, 10,  1,  1,  1, 10, 10, 10],
				[ 1,  1,  1, 10, 10, 10,  1,  1,  1, 10, 10, 10]
			],
		]

		this.player = new Character (1000, 100, this.collisionControl);
		//this.collisionControl.addPlayer(this.player);
		//TO DO: ADD AI AND ADD AI TO collisionController


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

		//bind class functions
		this.handleInput = this.handleInput.bind(this);
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
		this.loop = this.loop.bind(this);

		// Set up event handlers
		window.onkeydown = this.handleInput;
		window.onkeyup = this.handleInput;


		// Start the game loop
		this.nextLevel();
		this.interval = setInterval(this.loop, 30);

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
			if (map2[81]){//q
			  this.input = this.input.filter(function(i){
				return i!== 'punch';
			  });
			}
			if (map2[87]){//w
			  this.input = this.input.filter(function(i){
				return i!== 'sword';
			  });
			}
			if (map2[69]){//e
			  this.input = this.input.filter(function(i){
				return i!== 'spear';
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
			if ((map[81])&& this.input.findIndex(function(i){return i=== 'punch'})=== -1 )//q
			  this.input.push('punch');
			if ((map[87])&& this.input.findIndex(function(i){return i=== 'sword'})=== -1 )//w
			  this.input.push('sword');
			if ((map[69])&& this.input.findIndex(function(i){return i=== 'spear'})=== -1 )//e
			  this.input.push('spear');
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
			this.enemies[this.level].forEach(enemy => enemy.update(this.player.positionVector));
			//this.environment.update(this.player.positionVector);
  }//end update

	//render the game world
	render() {

		this.backBufferContext.fillStyle = '#000';
    this.backBufferContext.fillRect(0, 0, this.width, this.height);

		this.maps[this.level].forEach((row, y) => {
			row.forEach((tile, x) => {
				var img = new Image();
				img.src = "/tiles/tile_" + tile + ".png";
				var tileWidth  = this.width  / row.length;
				var tileHeight = this.height / this.maps[this.level].length;
				this.backBufferContext.drawImage(img, x * tileWidth, y * tileHeight, tileWidth, tileHeight);
			})
		})

		this.player.render(this.backBufferContext);
		this.enemies[this.level].forEach(enemy => enemy.render(this.backBufferContext));
		this.environment.render(this.backBufferContext);

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
			this.screenBufferContext.fillText("Game Paused", 20, 200);
			this.screenBufferContext.strokeText("Game Paused", 20, 200);
			this.screenBufferContext.font = '30px sans-serif';
			this.screenBufferContext.fillText("Press esc to resume", 20, 240);
			this.screenBufferContext.strokeText("Press esc to resume", 20, 240);
			this.screenBufferContext.font = '40px sans-serif';
			this.screenBufferContext.fillText("Instructions", 20, 290);
			this.screenBufferContext.strokeText("Instructions", 20, 290);
			this.screenBufferContext.font = '30px sans-serif';
			this.screenBufferContext.fillText("Reach the ladder to complete a level", 20, 330);
			this.screenBufferContext.strokeText("Reach the ladder to complete a level", 20, 330);
			this.screenBufferContext.fillText("Jump: up arrow", 20, 370);
			this.screenBufferContext.fillText("Move right: right arrow", 20, 410);
			this.screenBufferContext.fillText("Move left: left arrow", 20, 450);
			this.screenBufferContext.strokeText("Jump: up arrow", 20, 370);
			this.screenBufferContext.strokeText("Move right: right arrow", 20, 410);
			this.screenBufferContext.strokeText("Move left: left arrow", 20, 450);
			this.screenBufferContext.fillText("Punch: 'Q' ", 20, 490);
			this.screenBufferContext.strokeText("Punch: 'Q' ", 20, 490);
			if(this.player.moves.sword){
				this.screenBufferContext.fillText("Stab: 'W' ", 20, 530);
				this.screenBufferContext.strokeText("Stab: 'W' ", 20, 530);
			}
			if(this.player.moves.spear){
				this.screenBufferContext.fillText("Impale: 'E' ", 20, 570);
				this.screenBufferContext.strokeText("Impale: 'E' ", 20, 570);
			}
			if(this.player.moves.dash){
				this.screenBufferContext.fillText("Dash: 'R' ", 20, 610);
				this.screenBufferContext.strokeText("Dash: 'R' ", 20, 610);
			}
		}
		//GUI overlay
		this.screenBufferContext.fillStyle = "white";
		this.screenBufferContext.font = '16px sans-serif';
		this.screenBufferContext.fillText("Lives: "+ this.player.lives, 10, this.height-5);
	}// end render

	nextLevel() {
		this.level++;
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
