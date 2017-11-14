//ENV.js
//this is just filler to work on the charachter.

export default class ENV{
	constructor(hght, wdth,level){
		this.borders = [[0, hght-5, 0, hght, wdth, hght-5, wdth, hght]];		
		this.render = this.render.bind(this);
	}//end constructor
	
	render(ctx){
		this.borders.forEach((boundry)=>{
			ctx.save();
			ctx.fillStyle = 'lime';
			ctx.fillRect(0, 995, 2000, 5);
			ctx.restore();
		});
	}
	
}//end environment