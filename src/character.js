//character.js
import CollisionController from './collision-controller';
import Sprite from './sprite';

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
		this.sprite = new Sprite('knight');

		//attack variables
		this.moves = {punch: true, sword: true, spear: true};
		this.attackAgain = 0;
		this.dashAgain = 0;

		//initialize collisionController
		this.collisionController = collisionClass;

		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);

	}//end constructor

	applyObject(id){
		switch(id) {
			case 'dashAbility':
				this.moves['dash'] = true;
		}
	}

	//update the character based on input
	update(input){

		var stateSet = false;
		//decrement cooldowns
		if (this.attackAgain > 0) this.attackAgain--;
		if (this.dashAgain > 0) this.dashAgain--;

		//jump and gravity
		if(this.attackAgain === 0 && this.canJump && input.includes("jump")){ // don't want to fall if initial jumping
			this.velocityVector.y = this.jumpValue;
			this.canJump = false;
			this.sprite.setState('jump');
			stateSet = true;
		}
		var i; //temp variable for the loops
		if(this.velocityVector.y>0){//send bottom
			if(this.collisionController.playerEnvironmentCollides({x: this.positionVector.x + this.width/2, y: this.positionVector.y + this.velocityVector.y + this.height})){
				for(i = this.velocityVector.y - 1; i>=0; i--){
					if(this.collisionController.playerEnvironmentCollides({x: this.positionVector.x + this.width/2, y: this.positionVector.y + this.velocityVector.y + this.height})){
						this.positionVector.y += i;
						break;
					}
				}
				this.canJump = true;
				this.velocityVector.y = 1;
			}else{
				this.positionVector.y += this.velocityVector.y;
				this.velocityVector.y += 2;
			}
		}
		else{
			if(this.collisionController.playerEnvironmentCollides({x: this.positionVector.x + this.width/2, y: this.positionVector.y + this.velocityVector.y})){//send top
				for(i = this.velocityVector.y + 1; i<=0; i++){
					if(this.collisionController.playerEnvironmentCollides({x: this.positionVector.x + this.width/2, y: this.positionVector.y + this.velocityVector.y + this.height})){
						this.positionVector.y += i;
						break;
					}
				}

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
				if(!this.collisionController.playerEnvironmentCollides({x: this.positionVector.x + this.velocityVector.x + this.width, y: this.positionVector.y + this.height/2})){
					this.positionVector.x += this.velocityVector.x;
					this.sprite.setState('run');
					stateSet = true;
				}
			}
			else if (input.includes("left")){
				this.direction = "left";
				if(!this.collisionController.playerEnvironmentCollides({x: this.positionVector.x - this.velocityVector.x, y: this.positionVector.y + this.height/2})){
					this.positionVector.x -= this.velocityVector.x;
					this.sprite.setState('run');
					stateSet = true;
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
				if(!this.collisionController.playerEnvironmentCollides({x: this.positionVector.x + 10*this.velocityVector.x +this.width , y: this.positionVector.y + this.height/2})){

					this.positionVector.x += 10*this.velocityVector.x;
				}else{
					for(i = this.velocityVector.x*10 - 1; i>0; i--){
						if(this.collisionController.playerEnvironmentCollides({x: this.positionVector.x + i , y: this.positionVector.y + this.height/2})){
							this.positionVector.x += i;
						}
					}
				}
			}else{
				if(!this.collisionController.playerEnvironmentCollides({x: this.positionVector.x - 10*this.velocityVector.x, y: this.positionVector.y + this.height/2})){
					this.positionVector.x -= 10*this.velocityVector.x;
				}else{
					for(i = this.velocityVector.x*10 - 1; i>0; i--){
						if(this.collisionController.playerEnvironmentCollides({x: this.positionVector.x - i , y: this.positionVector.y + this.height/2})){
							this.positionVector.x -= i;
						}
					}
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
		if (!stateSet && this.canJump) this.sprite.setState('idle');
		this.sprite.update();

		var objectCollidesId = this.collisionController.playerObjectCollides({x: this.positionVector.x + this.width/2, y: this.positionVector.y + this.velocityVector.y});
		if(objectCollidesId){
			console.log('got object!');
		}
	}//end update

	//render the character
	render(ctx){
		ctx.save();
		this.sprite.render(ctx, this.positionVector.x, this.positionVector.y);
		ctx.restore();
	}//end render

}//end character
