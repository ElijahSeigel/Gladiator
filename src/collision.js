//collision.js

export default class collision{
	constructor(){
		this.environment = null;
		this.player = null;
		//TO DO: ADD AI
		
		//bind class functions
		this.addENV = this.addENV.bind(this);
		this.addPlayer = this.addPlayer.bind(this);
		this.checkENVCollision = this.checkENVCollision.bind(this);
		this.checkHit = this.checkHit.bind(this);
	}//end constructor
	
	addENV(env){
		this.environment = env;
	}//end addENV
	
	addPlayer(plyr){
		this.addPlayer = plyr;
	}//end addPlayer
	
	checkENVCollision(x,y, height, width){
			return false;
		}//end checkENVCollision
		
	checkHit(x,y, range, direction, damage){
		return false;
	}	
}//end collision