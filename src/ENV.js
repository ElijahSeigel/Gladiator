import ObjectController from './object-controller';
//ENV.js
//this is just filler to work on the charachter.

export default class ENV{
	constructor(hght, wdth,level){
		this.height = hght;
		this.width = wdth;
		this.borders = [[{x: 0, y: hght}, {x: wdth, y:hght}, {x: wdth, y: hght-50}, {x: 0, y: hght-50}],
										[{x: 0, y: hght-60}, {x: 0, y: hght - 100}, {x: wdth/2, y: hght-100}, {x:wdth/2, y: hght-60}]];
	  this.objectController = new ObjectController();
		this.render = this.render.bind(this);
		this.objectController.newObject('dashAbility', 300, 300);
	}//end constructor

	render(ctx){
		this.borders.forEach((boundry)=>{
			ctx.save();
			ctx.fillStyle = 'lime';
			ctx.fillRect(0, this.height, this.width, -50);
			ctx.fillRect(0, this.height-60, this.width/2, -40);
			ctx.restore();
			this.objectController.render(ctx);
		});
	}

}//end environment
