import ObjectController from './object-controller';
//ENV.js
//this is just filler to work on the charachter.

export default class ENV{
	constructor(hght, wdth,level){
		this.height = hght;
		this.width = wdth;
this.borders = [[{x: 0, y: hght-50}, {x: 0, y: hght}, {x: wdth, y: hght}, {x: wdth, y: hght-50}],
							[{x: 0, y: 450},{x: 0, y: 500},{x: 1300, y: 500},{x: 1300, y: 450}],
							[{x: 200, y: 300},{x: 200, y: 350},{x: 1500, y: 350},{x: 1500, y: 300}]];
		this.render = this.render.bind(this);
		this.objectController = new ObjectController();
		this.objectController.newObject('potion', 100, 100);
	}//end constructor

	render(ctx){
		ctx.save();
		ctx.fillStyle = 'lime';
		this.borders.forEach((boundry)=>{
			ctx.beginPath();
			var point = 1;
			ctx.moveTo(boundry[0].x, boundry[0].y);
			while(point < boundry.length){
				ctx.lineTo(boundry[point].x, boundry[point].y);
				point++;
			}
			ctx.lineTo(boundry[0].x, boundry[0].y);
			ctx.fill();
			ctx.closePath();
			//ctx.fillRect(50, 600, 1400, 50);
		});
		ctx.restore();
	}

}//end environment
