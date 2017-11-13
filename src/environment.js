//environment.js
//Very basic. Has an array of platforms and renders them.

export default class Environment{
	constructor(x,y){
		this.width = x;
		this.height = y;
		this.platforms = [];
		//add platform coordinates
		this.platforms.push({
			x = 0,
			y = 0,
			width = 0,
			height = 0
		});
		this.floor = 100;// floor/bottom of the level
	}
	
	render(ctx){
		ctx.fillStyle = "white";
		this.platforms.forEach((block) => {
			ctx.save();
			ctx.beginPath();
			ctx.moveTo(block.x, block.y);
			ctx.lineTo(block.x + block.width, block.y);
			ctx.lineTo(block.x + block.width, block.y + block.height);
			ctx.lineTo(block.x, block.y2 + block.height);
			ctx.closePath();
			ctx.fill();
			ctx.restore();
		});
	}
}