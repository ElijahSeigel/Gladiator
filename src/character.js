//character.js
import Collision from './collision';
export default class Character{
	constructor(xpos, ypos, collisionClass){
		//initialize character variables
		this.height = 200; //subject to change based on sprite
		this.width = 100; //subject to change based on sprite
		this.health = 100;//subject to change
		this.invincible = 0;
		this.lives = 3;
		
		//movement varaibles
		this.positionVector = {x: xpos, y: ypos};
		this.movementSpeed = 10;
		this.velocityVector = {x: this.movementSpeed, y: 1};
		this.jumpValue = -25;
		this.canJump = true;
		this.direction = "right";
		
		
		//attack variables
		this.moves = {punch: true, sword: true, spear: true, dash: true};
		this.attackAgain = 0;
		this.dashAgain = 0;
		
		//initialize collisionController
		this.collisionController = collisionClass;
		
		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);
		
	}//end constructor
	
	//update the character based on input
	update(input){
			
		//decrement attackAgain
		if (this.attackAgain > 0)
		{
		this.attackAgain--;
		}
		
		//decrement dashAgain
		if (this.dashAgain > 0)
		{
		this.dashAgain--;
		}
		
		//jump and gravity stuff
		if(this.attackAgain ===0 && this.canJump && input.includes("jump")){ // don't want to fall if initial jumping
			this.velocityVector.y = this.jumpValue;
			this.canJump = false;
		}
		
		if(this.velocityVector.y>0){//send bottom
			if(this.collisionController.playerEnvironmentCollides(this.positionVector.x + this.width/2, this.positionVector.y + this.velocityVector.y + this.height) ){
				this.canJump = true;
				this.velocityVector.y = 1;
			}else{
				this.positionVector.y += this.velocityVector.y;
				this.velocityVector.y += 2;
			}
		}
		else{
			if(this.collisionController.playerEnvironmentCollides(this.positionVector.x + this.width/2, this.positionVector.y + this.velocityVector.y)){//send top
				this.velocityVector.y = 1;
			}else{
				this.positionVector.y += this.velocityVector.y;
				this.velocityVector.y += 2;
			}
		}
		
		//move left or right
		if(this.attackAgain===0){//don't want to move during attack
			if(input.includes("right")){
				this.direction = "right";
				if(!this.collisionController.playerEnvironmentCollides(this.positionVector.x + this.velocityVector.x + this.width, this.positionVector.y + this.height/2)){
					this.positionVector.x += this.velocityVector.x;
				}
			}
			else if (input.includes("left")){
				this.direction = "left";
				if(!this.collisionController.playerEnvironmentCollides(this.positionVector.x - this.velocityVector.x, this.positionVector.y + this.height/2)){
					this.positionVector.x -= this.velocityVector.x;
				}
			}
		}
		
		//Dash
		if (input.includes("dash")&& this.moves.dash && this.dashAgain === 0 && this.attackAgain === 0){
			this.invincible = 3;
			this.attackAgain = 3;
			this.dashAgain = 20;
		}
		
		if(this.invincible >0){
			this.invincible --;
			if(this.direction === "right"){
				if(!this.collisionController.playerEnvironmentCollides(this.positionVector.x + 3*this.velocityVector.x +this.width , this.positionVector.y + this.height/2)){
					this.positionVector.x += 10*this.velocityVector.x;
				}
			}else{
				if(!this.collisionController.playerEnvironmentCollides(this.positionVector.x - 3*this.velocityVector.x, this.positionVector.y + this.height/2)){
					this.positionVector.x -= 10*this.velocityVector.x;
				}
			}
		}

		//attack some stuff
		if(this.attackAgain === 0){
			if(input.includes("punch") && this.moves.punch){
				this.attackAgain = 20;//where 5 is the number of frames for the punch animation
				//this.collisionController.checkHit(this.positionVector.x, this.positionVector.y, 50, this.direction, 25);//where 50 is the range of the attack and 25 is the damage done
			}
			else if(input.includes("sword") && this.moves.sword){
				this.attackAgain = 40;//where 5 is the number of frames for the punch animation
				//this.collisionController.checkHit(this.positionVector.x, this.positionVector.y, 100, this.direction, 50);//where 100 is the range of the attack and 50 is the damage done
			}
			else if(input.includes("spear") && this.moves.spear){
				this.attackAgain = 60;//where 5 is the number of frames for the punch animation
				//this.collisionController.checkHit(this.positionVector.x, this.positionVector.y, 150, this.direction, 100);//where 150 is the range of the attack and 100 is the damage done
			}
		}
		
	}//end update
	
	//render the character
	render(ctx){
		ctx.save();
		ctx.fillStyle = 'red';
		ctx.fillRect(this.positionVector.x, this.positionVector.y, this.width, this.height);
		ctx.restore();
	}//end render
	
}//end character