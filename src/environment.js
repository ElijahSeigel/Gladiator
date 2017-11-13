//environment.js
//Very basic. Has an array of platforms and renders them.

export default class Environment{
	constructor(x,y){
		this.width = x;
		this.height = y;
		this.platforms = [];
		//add platform coordinates
		this.platforms.push({
			x = 50,
			y = 50,
			width = 10,
			height = 10
		});
		this.render = this.render.bind(this);
	}
	
	render(ctx){
		ctx.fillStyle = "white";
		this.platforms.forEach((block) => {
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(block.x, block.y);
			ctx.lineTo(block.x + block.width, block.y);
			ctx.lineTo(block.x + block.width, block.y + block.height);
			ctx.lineTo(block.x, block.y + block.height);
			ctx.closePath();
			ctx.fill();
			ctx.restore();
		});
	}
}