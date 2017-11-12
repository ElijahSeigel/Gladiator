//collision.js

export default class collision{
	constructor(){
		this.environment;
		this.player;
		//TO DO: ADD AI
		
		//bind class functions
		this.addENV = this.addENV.bind(this);
		this.addPlayer = this.addPlayer.bind(this);
		this.checkENVCollision = this.checkENVCollision.bind(this);
		//TO DO: ADD CHECK HIT
	}//end constructor
	
	addENV(env){
		this.environment = env;
	}//end addENV
	
	addPlayer(plyr){
		this.addPlayer = plyr;
	}//end addPlayer
	
	checkCollision(x,y, height, width){
		this.environment.borders.foreach((boundry)=>{
			if(x < boundry.x + boundry.width &&
			    x + width > boundry.x&&
				y < boundry.y + boundry.height &&
				y + height > boundry.y){
					return true;
				}
		});
	}//end checkCollision
	return false
}//end collision