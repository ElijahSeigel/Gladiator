//ENV.js
//this is just filler to work on the charachter.

export default class ENV{
	constructor(hght, wdth,level){
<<<<<<< HEAD
		this.borders = [[{x: 0,	 y: 100}, {x: 100, y: 100}, {x: 100, y: 0}, {x: 0, y: 0}]];
=======
		this.height = hght;
		this.width = wdth;
		this.borders = [[{x: 0, y: hght}, {x: wdth, y:hght}, {x: wdth, y: hght-50}, {x: 0, y: hght-50}]];
>>>>>>> fb30331f1bc8a81ac536fbf52766e2e50aa71ee6
		this.render = this.render.bind(this);
	}//end constructor

	render(ctx){
		this.borders.forEach((boundry)=>{
			ctx.save();
			ctx.fillStyle = 'lime';
			ctx.fillRect(0, this.height, this.width, -50);
			ctx.restore();
		});
	}

}//end environment
