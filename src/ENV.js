//ENV.js
//this is just filler to work on the charachter.

export default class ENV{
	constructor(hght, wdth,level, objectController){
		this.height = hght;
		this.width = wdth;
		this.objectController = objectController;
		this.level = 1;
		this.end = {x: 1275, y: 450};
		this.objectController.newObject('dashAbility', 400, 453);
		this.objects = this.objectController.exists;
		this.level1 = [
						[{x: 0,y: 650}, {x: 0,y: 416}, {x: 287,y: 416}, {x: 287,y: 449}, {x: 319,y: 449}, {x: 319,y: 480}, {x: 1217,y: 480}, {x: 1217,y: 449}, {x: 1247,y: 449}, {x: 1247,y: 416}, {x: 1279,y: 416}, {x: 1279,y: 449}, {x: 1311,y: 449}, {x: 1311,y: 480}, {x: 1500,y: 480}, {x: 1500,y: 650}],
						[{x: 352,y: 404}, {x: 352,y: 375}, {x: 384,y: 374}, {x: 384,y: 342}, {x: 448,y: 342}, {x: 448,y: 303}, {x: 514,y: 303}, {x: 514,y: 277}, {x: 546,y: 277}, {x: 546,y: 245}, {x: 577,y:245 }, {x: 577,y: 220}, {x: 950,y: 220}, {x: 950,y: 244}, {x: 983,y: 244}, {x: 983,y: 277}, {x: 1014,y: 277}, {x: 1014,y: 303}, {x: 1080,y: 303}, {x: 1080,y: 341}, {x: 1144,y: 341}, {x: 1144,y: 374}, {x: 1176,y: 374}, {x: 1176,y: 404}],
						[{x: 0,y: 192}, {x: 0,y: 0}, {x: 1500,y: 0}, {x: 1500,y: 129}, {x: 950,y: 129}, {x: 950,y: 160}, {x: 823,y: 160}, {x: 823,y: 220}, {x: 705,y: 220}, {x: 705,y: 160}, {x: 578,y: 160}, {x: 578,y: 129}, {x: 29,y: 129}, {x: 29,y: 192}],
						[{x: 0,y: 416}, {x: 0,y: 192}, {x: 521,y: 192}, {x: 521,y: 224}, {x: 448,y: 223}, {x: 448,y: 256}, {x: 384,y: 256}, {x: 384,y: 288}, {x: 247,y: 288}, {x: 247,y: 615}],
						[{x: 1308,y: 353}, {x: 1308,y: 287}, {x: 1144,y: 287}, {x: 1144,y: 257}, {x: 1080,y: 257}, {x: 1080,y: 224}, {x: 1007,y: 224}, {x: 1007,y: 192}, {x: 1500,y: 192}, {x: 1500,y: 353}]
						];
		this.level2 = [[{x: 0, y: hght-50}, {x: 0, y: hght}, {x: wdth, y: hght}, {x: wdth, y: hght-50}],
							[{x: 0, y: 450},{x: 0, y: 500},{x: 1300, y: 500},{x: 1300, y: 450}],
							[{x: 200, y: 300},{x: 200, y: 350},{x: 1500, y: 350},{x: 1500, y: 300}]];
		this.level3 = [[{x: 0, y: hght-50}, {x: 0, y: hght}, {x: wdth, y: hght}, {x: wdth, y: hght-50}],
						[{x: 0, y: 450}, {x: 0, y: 500}, {x: 300, y: 500}, {x: 300, y: 450}],
						[{x: 0, y: 150}, {x: 0, y: 200}, {x: 300, y: 200}, {x: 300, y: 150}],
						[{x: 700, y: 450}, {x: 700, y: 500}, {x: 1000, y: 500}, {x: 1000, y: 450}],
						[{x: 1100, y: 300}, {x: 1100, y: 350}, {x: 1500, y: 350}, {x: 1500, y: 300}],
						[{x: 500, y: 150}, {x: 500, y: 200}, {x: 950, y: 200}, {x: 950, y: 150}]];
		this.level4 = [[{x: 250, y: hght-50}, {x: 250, y: hght}, {x: wdth-250, y: hght}, {x: wdth-250, y: hght-50}],
						[{x: 0, y: 450}, {x: 0, y: 500}, {x: 400, y: 500}, {x: 400, y: 450}],
						[{x: 1100, y: 450}, {x: 1100, y: 500}, {x: 1500, y: 500}, {x: 1500, y: 450}],
						[{x: 600, y: 100}, {x: 600, y: 150}, {x: 900, y: 150}, {x: 900, y: 100}],
						[{x: 300, y: 300}, {x: 300, y: 350}, {x: 600, y: 350}, {x: 600, y: 300}],
						[{x: 900, y: 275}, {x: 900, y: 325}, {x: 1200, y: 325}, {x: 1200, y: 275}]];
		this.level5 = [[{x: 250, y: hght-150},{x: 250, y: hght},{x: 300, y: hght},{x: 300, y: hght-150}],
						[{x: 500, y: hght-150},{x: 500, y: hght},{x: 550, y: hght},{x: 550, y: hght-150}],
						[{x: 750, y: hght-150},{x: 750, y: hght},{x: 800, y: hght},{x: 800, y: hght-150}],
						[{x: 1000, y: hght-150},{x: 1000, y: hght},{x: 1050, y: hght},{x: 1050, y: hght-150}],
						[{x: 1250, y: hght-150},{x: 1250, y: hght},{x: 1300, y: hght},{x: 1300, y: hght-150}]];
		this.render = this.render.bind(this);
		this.nextLevel = this.nextLevel.bind(this);
	}//end constructor

	/** @method nextLevel
	*	Called when a level is finished.
	*	Advances teh level counter and renders the platforms for the new level.
	*/
	nextLevel(){
		this.level++;
		if(this.level === 2){
			this.end = {x: 750, y:300};
			return this.level2;
		}
		if(this.level === 3){
			this.end = {x: 75, y: 100};
			return this.level3;
		}
		else if(this.level === 4){
			this.end = {x: 750, y: 50};
			return this.level4;
		}
		else{
			this.end = {x: 1275, y: 450};
			return this.level5;
		}
	}

	render(ctx){
		ctx.save();
		ctx.fillStyle = 'lime';
		var currlevel;
		if(this.level === 1)currlevel = this.level1;
		else if(this.level === 2)currlevel = this.level2;
		else if(this.level === 3)currlevel = this.level3;
		else currlevel = this.level4;
		currlevel.forEach((boundry)=>{
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
		ctx.fillRect(this.end.x,this.end.y,10,10);
		ctx.restore();
	}
}//end environment
