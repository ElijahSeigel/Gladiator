//character.js

export default class character{
	constructor(xpos, ypos, collisionClass){
		//initialize character variables
		this.height = 200; //subject to change based on sprite
		this.width = 100; //subject to change based on sprite
		this.health = 100;//subject to change
		this.invincible = 0;
		
		//movement varaibles
		this.positionVector = {x: xpos, y: ypos};
		this.movementSpeed = 10;
		this.velocityVector = {x: this.movementSpeed, y: 1};
		this.jumpValue = -20;
		this.canJump = 1;
		this.direction = "right";
		
		
		//attack variables
		this.moves = {punch: true, sword: false, spear: false, dash: false};
		this.attackAgain = 0;
		
		//initialize collisionController
		this.collisionController = collisionClass;
		
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
		
	}//end constructor
	
	//update the character based on input
	update(input){
		//jump and gravity stuff
		if(this.canJump === 1 && input.includes("jump")){ // don't want to fall if initial jumping
			this.velocityVector.y = this.jumpValue;
			this.canJump = 0;
		}
		//this.collisionController.checkENVCollision(this.positionVector.x, this.positionVector.y + this.velocityVector.y, this.height, this.width)
		if(this.positionVector.y + this.velocityVector.y + this.height> 995){
			this.canJump = 1;
			this.velocityVector.y = 1;
		}else{
			this.positionVector.y += this.velocityVector.y;
			this.velocityVector.y += 2;
		}
		
		//move left or right
		if(this.attackAgain===0){//don't want to move during attack
			if(input.includes("right")){
				this.direction = "right";
				if(!this.collisionController.checkENVCollision(this.positionVector.x + this.velocityVector.x, this.positionVector.y, this.height, this.width)){
					this.positionVector.x += this.velocityVector.x;
				}
			}
			else if (input.includes("left")){
				this.direction = "left";
				if(!this.collisionController.checkENVCollision(this.positionVector.x - this.velocityVector.x, this.positionVector.y, this.height, this.width)){
					this.positionVector.x -= this.velocityVector.x;
				}
			}
		}

		//attack some stuff
		//TO DO: ATTACK SOME STUFF
		
	}//end update
	
	//render the character
	render(ctx){
		ctx.save();
		ctx.fillStyle = 'red';
		ctx.fillRect(this.positionVector.x, this.positionVector.y, this.width, this.height);
		ctx.restore();
	}//end render
	
}//end character