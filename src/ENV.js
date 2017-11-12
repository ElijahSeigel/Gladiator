//ENV.js
//this is just filler to work on the charachter.

export default class ENV{
	constructor(hght, wdth,level){
		this.borders = [{x:0, y: hght-5, height:5, width: wdth}];		
		this.render = this.render.bind(this);
	}//end constructor
	
	render(ctx){
		this.borders.ForEach((boundry)=>{
			ctx.save();
			ctx.fillStyle = 'lime';
			ctx.fillRect(boundry.x, boundry.y, boundry.width, boundry.height);
			ctx.restore();
		});
	}
	
}//end environment