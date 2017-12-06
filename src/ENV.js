import ObjectController from './object-controller';
//ENV.js
//this is just filler to work on the charachter.

export default class ENV{
	constructor(hght, wdth,level){
		this.height = hght;
		this.width = wdth;
		this.borders = [
						[{x: 0,y: 650}, {x: 0,y: 416}, {x: 287,y: 416}, {x: 287,y: 449}, {x: 319,y: 449}, {x: 319,y: 480}, {x: 1217,y: 480}, {x: 1217,y: 449}, {x: 1247,y: 449}, {x: 1247,y: 416}, {x: 1279,y: 416}, {x: 1279,y: 449}, {x: 1311,y: 449}, {x: 1311,y: 480}, {x: 1500,y: 480}, {x: 1500,y: 650}],
						[{x: 352,y: 404}, {x: 352,y: 375}, {x: 384,y: 374}, {x: 384,y: 342}, {x: 448,y: 342}, {x: 448,y: 303}, {x: 514,y: 303}, {x: 514,y: 277}, {x: 546,y: 277}, {x: 546,y: 245}, {x: 577,y:245 }, {x: 577,y: 220}, {x: 950,y: 220}, {x: 950,y: 244}, {x: 983,y: 244}, {x: 983,y: 277}, {x: 1014,y: 277}, {x: 1014,y: 303}, {x: 1080,y: 303}, {x: 1080,y: 341}, {x: 1144,y: 341}, {x: 1144,y: 374}, {x: 1176,y: 374}, {x: 1176,y: 404}],
						[{x: 0,y: 192}, {x: 0,y: 0}, {x: 1500,y: 0}, {x: 1500,y: 129}, {x: 950,y: 129}, {x: 950,y: 160}, {x: 823,y: 160}, {x: 823,y: 220}, {x: 705,y: 220}, {x: 705,y: 160}, {x: 578,y: 160}, {x: 578,y: 129}, {x: 29,y: 129}, {x: 29,y: 192}],
						[{x: 0,y: 416}, {x: 0,y: 192}, {x: 521,y: 192}, {x: 521,y: 224}, {x: 448,y: 223}, {x: 448,y: 256}, {x: 384,y: 256}, {x: 384,y: 288}, {x: 247,y: 288}, {x: 247,y: 615}],
						[{x: 1308,y: 353}, {x: 1308,y: 287}, {x: 1144,y: 287}, {x: 1144,y: 257}, {x: 1080,y: 257}, {x: 1080,y: 224}, {x: 1007,y: 224}, {x: 1007,y: 192}, {x: 1500,y: 192}, {x: 1500,y: 353}]
						];
		this.render = this.render.bind(this);
		this.objectController = new ObjectController();
		this.objectController.newObject('potion', 300, 300);
	}//end constructor

	render(ctx){
		this.borders.forEach((boundry)=>{
			ctx.save();
			ctx.fillStyle = 'lime';
			ctx.beginPath();
			ctx.moveTo(boundry[0].x, boundry[0].y);
			for(var i = 1; i<boundry.length; i++){
				ctx.lineTo(boundry[i].x, boundry[i].y);
			}
			ctx.closePath();
			ctx.fill();
			ctx.restore();
			this.objectController.render(ctx);
		});
	}

}//end environment
