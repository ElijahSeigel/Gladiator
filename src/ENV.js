//ENV.js
//this is just filler to work on the charachter.

export default class ENV{
	constructor(hght, wdth,level){
		this.borders = [[{x: 0, y: 0}, {x: 0, y: 50}, {x: wdth, y: 50}, {x: wdth, y: 0}]];
		this.render = this.render.bind(this);
	}//end constructor

	render(ctx){
		this.borders.forEach((boundry)=>{
			ctx.save();
			ctx.fillStyle = 'lime';
			ctx.fillRect(50, 600, 1400, 50);
			ctx.restore();
		});
	}

}//end environment
