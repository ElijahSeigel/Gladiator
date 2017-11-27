//ENV.js
//this is just filler to work on the charachter.

export default class ENV{
	constructor(hght, wdth,level){
		this.borders = [[{x: 0, y: hght-5}, {x:0, y:hght}, {x:wdth, y:hght-5}, {x:wdth, y:hght}]];
		this.render = this.render.bind(this);
	}//end constructor

	render(ctx){
		this.borders.forEach((boundry)=>{
			ctx.save();
			ctx.fillStyle = 'lime';
			ctx.fillRect(0, 995, 1000, 5);
			ctx.restore();
		});
	}

}//end environment
