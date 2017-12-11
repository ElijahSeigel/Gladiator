//character.js
import CollisionController from './collision-controller';
import Sprite from './sprite';

export default class Character{
	constructor(xpos, ypos, collisionClass){
		//initialize character variables
		this.height = 20; //subject to change based on sprite
		this.width = 20; //subject to change based on sprite
		this.health = 100;//subject to change
		this.invincible = 0;
		this.lives = 3;
		this.objectController;
		this.dying = 7;
		this.over = false;

		//movement varaibles
		this.positionVector = {x: xpos, y: ypos};
		this.movementSpeed = 5;
		this.velocityVector = {x: this.movementSpeed, y: 1};
		this.jumpValue = -15;
		this.canJump = true;
		this.direction = "right";
		this.sprite = new Sprite('knight');

		//attack variables
		this.moves = {sword: true, lightning: true, dash: true};
		this.attackAgain = 0;
		this.dashAgain = 0;

		//initialize collisionController
		this.collisionController = collisionClass;

		//bind class functions
		this.update = this.update.bind(this);
		this.render = this.render.bind(this);

	}//end constructor

	addObjectController(controller){
		this.objectController = controller;
	}

	applyObject(id){
		this.objectController.removeObject(id);
		switch(id) {
			case 'dash':
				this.moves['dash'] = true;
		}
	}

	//update the character based on input
	update(input){
		if(this.health>0){
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
				if(this.collisionController.playerEnvironmentCollides({x: this.positionVector.x + this.width, y: this.positionVector.y + this.velocityVector.y + this.height}) || this.collisionController.playerEnvironmentCollides({x: this.positionVector.x, y: this.positionVector.y + this.velocityVector.y + this.height}) ){
					for(i = this.velocityVector.y - 1; i>=0; i--){
						if(!this.collisionController.playerEnvironmentCollides({x: this.positionVector.x + this.width, y: this.positionVector.y + i + this.height}) && !this.collisionController.playerEnvironmentCollides({x: this.positionVector.x, y: this.positionVector.y + i + this.height})){
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
				if(this.collisionController.playerEnvironmentCollides({x: this.positionVector.x + this.width, y: this.positionVector.y + this.velocityVector.y}) || this.collisionController.playerEnvironmentCollides({x: this.positionVector.x, y: this.positionVector.y + this.velocityVector.y}) ){//send top
					for(i = this.velocityVector.y + 1; i<=0; i++){
						if(!this.collisionController.playerEnvironmentCollides({x: this.positionVector.x + this.width, y: this.positionVector.y + i}) && !this.collisionController.playerEnvironmentCollides({x: this.positionVector.x, y: this.positionVector.y + i})){
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
					this.sprite.reverse(false);
					if(!this.collisionController.playerEnvironmentCollides({x: this.positionVector.x + this.velocityVector.x + this.width, y: this.positionVector.y + this.height}) && !this.collisionController.playerEnvironmentCollides({x: this.positionVector.x + this.velocityVector.x + this.width, y: this.positionVector.y})){
						this.positionVector.x += this.velocityVector.x;
						this.sprite.setState('run');
						stateSet = true;
					}
					else{
						for(i = this.velocityVector.x - 1; i>=0; i--){
							if(!this.collisionController.playerEnvironmentCollides({x: this.positionVector.x + i + this.width, y: this.positionVector.y + this.height}) && !this.collisionController.playerEnvironmentCollides({x: this.positionVector.x + i + this.width, y: this.positionVector.y})){
								this.positionVector.x += i;
								break;
							}
						}
					}
				}
				else if (input.includes("left")){
					this.direction = "left";
					this.sprite.reverse(true);
					if(!this.collisionController.playerEnvironmentCollides({x: this.positionVector.x - this.velocityVector.x, y: this.positionVector.y + this.height}) && !this.collisionController.playerEnvironmentCollides({x: this.positionVector.x - this.velocityVector.x, y: this.positionVector.y})){
						this.positionVector.x -= this.velocityVector.x;
						this.sprite.setState('run');
						stateSet = true;
					}
					else{
						for(i = this.velocityVector.x - 1; i>=0; i--){
							if(!this.collisionController.playerEnvironmentCollides({x: this.positionVector.x - i ,y: this.positionVector.y + this.height}) && !this.collisionController.playerEnvironmentCollides({x: this.positionVector.x - i ,y: this.positionVector.y})){
								this.positionVector.x -= i;
								break;
							}
						}
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
					if(!this.collisionController.playerEnvironmentCollides({x: this.positionVector.x + this.velocityVector.x*10 + this.width, y: this.positionVector.y + this.height}) && !this.collisionController.playerEnvironmentCollides({x: this.positionVector.x + this.velocityVector.x*10 + this.width, y: this.positionVector.y})){
						this.positionVector.x += this.velocityVector.x*10;
						this.sprite.setState('run');
						stateSet = true;
					}
					else{
						for(i = this.velocityVector.x*10 - 1; i>=0; i--){
							if(!this.collisionController.playerEnvironmentCollides({x: this.positionVector.x + i + this.width, y: this.positionVector.y + this.height}) && !this.collisionController.playerEnvironmentCollides({x: this.positionVector.x + i + this.width, y: this.positionVector.y})){
								this.positionVector.x += i;
								break;
							}
						}
					}
				}
				else {
					if(!this.collisionController.playerEnvironmentCollides({x: this.positionVector.x - this.velocityVector.x*10, y: this.positionVector.y + this.height}) && !this.collisionController.playerEnvironmentCollides({x: this.positionVector.x - this.velocityVector.x*10, y: this.positionVector.y})){
						this.positionVector.x -= this.velocityVector.x*10;
						this.sprite.setState('run');
						stateSet = true;
					}
					else{
						for(i = this.velocityVector.x*10 - 1; i>=0; i--){
							if(!this.collisionController.playerEnvironmentCollides({x: this.positionVector.x - i ,y: this.positionVector.y + this.height}) && !this.collisionController.playerEnvironmentCollides({x: this.positionVector.x - i ,y: this.positionVector.y})){
								this.positionVector.x -= i;
								break;
							}
						}
					}
				}


			}

			//attack some stuff
			if(this.attackAgain === 0){
				if(input.includes("sword") && this.moves.sword){
					this.attackAgain = 7;//where 7 is the number of frames for the attack animation
					var point1;
					var point2;
					if(this.direction = "right"){
						point1 = {x: this.positionVector.x+this.width+20, y: this.positionVector.y+this.height/2};//20 is the range of the attack
						point2 = {x: this.positionVector.x+this.width, y: this.positionVector.y+this.height/2};
					}else{
						point1 = {x: this.positionVector.x-20, y: this.positionVector.y+this.height/2};//20 is the range of the attack
						point1 = {x: this.positionVector.x, y: this.positionVector.y+this.height/2};
					}
					if(!this.collisionController.playerHitsEnemy(point1, 25)){
						this.collisionController.playerHitsEnemy(point2, 25)
					}//where 25 is the damage done
					this.sprite.setState('attack');
					stateSet = true;
				}
				else if(input.includes("lightning") && this.moves.lightning){
					this.attackAgain = 14;//where 6 is the number of frames for the attack animation
					var point1;
					var point2;
					var point3;
					var point4;
					point1 = {x: this.positionVector.x+this.width+40, y: this.positionVector.y+this.height/2};//20 is the range of the attack
					point2 = {x: this.positionVector.x+this.width, y: this.positionVector.y+this.height/2};
					point3 = {x: this.positionVector.x-40, y: this.positionVector.y+this.height/2};//20 is the range of the attack
					point4 = {x: this.positionVector.x, y: this.positionVector.y+this.height/2};
					if(!this.collisionController.playerHitsEnemy(point1, 25)){
						if(!this.collisionController.playerHitsEnemy(point2, 25)){
							if(!this.collisionController.playerHitsEnemy(point3, 25)){
								this.collisionController.playerHitsEnemy(point4, 25)
							}
						}
					}//where 25 is the damage done
					this.sprite.setState('lightning');
					stateSet = true;
				}
			}
			if (!stateSet && this.canJump && this.attackAgain === 0) this.sprite.setState('idle');
		}
		else{//health less than or equal to 0
			this.sprite.setState('die');
			this.dying --;
			if(this.dying<0){
				this.over = true;
			}
		}
		this.sprite.update();

		var objectCollidesId = this.collisionController.playerObjectCollides({x: this.positionVector.x - this.width/2, y: this.positionVector.y + this.height/2 + 20});
		if(objectCollidesId){
			//console.log(objectCollidesId);
			this.applyObject(objectCollidesId);
		}
	}//end update

	//render the character
	render(ctx){
		ctx.save();
		this.sprite.render(ctx, this.positionVector.x, this.positionVector.y);
		//ctx.fillRect(this.positionVector.x, this.positionVector.y, this.width, this.height);
		ctx.restore();
	}//end render

}//end character
