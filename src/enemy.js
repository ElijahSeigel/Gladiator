//enemy.js

export default class AI{
	constructor(x,y,radius){
		this.position = {x: x, y: y};
		//use width and height values for temporary rectangle
		this.width = 5;
		this.height = 10;
		this.origin = x;
		this.patrol = radius;
		this.direction = 1;
		this.update = this.update.bind(this);
	}
	
	update(){
		if(this.position.x >= (this.origin + this.radius) || this.position.x <= (this.origin - this.radius)){
			this.direction *= -1;
		}
		if(this.direction === -1) this.position.x--;
		else this.position.x++;
	}
	
	render(ctx){
		ctx.save();
		ctx.fillStyle = 'blue';
		ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
		ctx.restore();
	}
}