//ENV.js
//this is just filler to work on the charachter.

export default class ENV{
	constructor(hght, wdth,level, objectController){
		this.height = hght;
		this.width = wdth;
		this.objectController = objectController;
		this.level = 1;
		this.end = {x: 1370, y: 160};
		this.level1 = [
						[{x: 0,y: 650}, {x: 0,y: 416}, {x: 287,y: 416}, {x: 287,y: 449}, {x: 319,y: 449}, {x: 319,y: 480}, {x: 1217,y: 480}, {x: 1217,y: 449}, {x: 1247,y: 449}, {x: 1247,y: 416}, {x: 1279,y: 416}, {x: 1279,y: 449}, {x: 1311,y: 449}, {x: 1311,y: 480}, {x: 1500,y: 480}, {x: 1500,y: 650}],
						[{x: 352,y: 404}, {x: 352,y: 375}, {x: 384,y: 374}, {x: 384,y: 342}, {x: 448,y: 342}, {x: 448,y: 303}, {x: 514,y: 303}, {x: 514,y: 277}, {x: 546,y: 277}, {x: 546,y: 245}, {x: 577,y:245 }, {x: 577,y: 220}, {x: 950,y: 220}, {x: 950,y: 244}, {x: 983,y: 244}, {x: 983,y: 277}, {x: 1014,y: 277}, {x: 1014,y: 303}, {x: 1080,y: 303}, {x: 1080,y: 341}, {x: 1144,y: 341}, {x: 1144,y: 374}, {x: 1176,y: 374}, {x: 1176,y: 404}],
						[{x: 0,y: 192}, {x: 0,y: 0}, {x: 1500,y: 0}, {x: 1500,y: 129}, {x: 950,y: 129}, {x: 950,y: 160}, {x: 823,y: 160}, {x: 823,y: 220}, {x: 705,y: 220}, {x: 705,y: 160}, {x: 578,y: 160}, {x: 578,y: 129}, {x: 29,y: 129}, {x: 29,y: 192}],
						[{x: 0,y: 416}, {x: 0,y: 192}, {x: 521,y: 192}, {x: 521,y: 224}, {x: 448,y: 223}, {x: 448,y: 256}, {x: 384,y: 256}, {x: 384,y: 288}, {x: 247,y: 288}, {x: 247,y: 615}],
						[{x: 1308,y: 353}, {x: 1308,y: 287}, {x: 1144,y: 287}, {x: 1144,y: 257}, {x: 1080,y: 257}, {x: 1080,y: 224}, {x: 1007,y: 224}, {x: 1007,y: 192}, {x: 1500,y: 192}, {x: 1500,y: 353}]
						];
		this.objectController.newObject('dashAbility', 400, 453);
		this.objectController.newObject('lightningAbility',700,453);
		this.objects = this.objectController.exists;
		this.level2 = [[{x: 0, y: 610}, {x: 0, y: 650}, {x: wdth, y: 650}, {x: wdth, y: 610}],
							[{x: 0, y: 380},{x: 0, y: 445},{x: 950, y: 445},{x: 950, y: 380}],
							[{x: 475, y: 168},{x: 475, y: 225},{x: 1500, y: 225},{x: 1500, y: 168}],
							[{x: 1240, y: 550}, {x: 1240, y: 585}, {x: 1304, y: 585}, {x: 1304, y: 550}],
							[{x: 1064, y: 488}, {x: 1064, y: 526}, {x: 1128, y: 526}, {x: 1128, y: 488}],
							[{x: 960, y: 442}, {x: 960, y: 480}, {x: 1020, y: 480}, {x: 1020, y: 442}],
							[{x: 174, y: 322}, {x: 174, y: 386}, {x: 224, y: 386}, {x: 224, y: 322}],
							[{x: 284, y: 260}, {x: 284, y: 280}, {x: 328, y: 280}, {x: 328, y: 260}],
							[{x: 382, y: 216}, {x: 382, y: 236}, {x: 442, y: 236}, {x: 442, y: 216}]];
		this.level3 = [[{x: 520, y: 584}, {x: 520, y: 650}, {x: 975, y: 650}, {x: 975, y: 584}],
						[{x: 0, y: 450}, {x: 0, y: 514}, {x: 450, y: 514}, {x: 450, y: 450}],
						[{x: 1040, y: 450}, {x: 1040, y: 514}, {x: 1500, y: 514}, {x: 1500, y: 450}],
						[{x: 650, y: 200}, {x: 650, y: 264}, {x: 845, y: 264}, {x: 845, y: 200}],
						[{x: 355, y: 300}, {x: 355, y: 364}, {x: 675, y: 364}, {x: 675, y: 300}],
						[{x: 820, y: 305}, {x: 820, y: 369}, {x: 1145, y: 369}, {x: 1145, y: 305}]];
		this.level4 = [[{x: 200, y: hght-256},{x: 200, y: hght},{x: 264, y: hght},{x: 264, y: hght-256}],
						[{x: 425, y: hght-256},{x: 425, y: hght},{x: 489, y: hght},{x: 489, y: hght-256}],
						[{x: 700, y: hght-256},{x: 700, y: hght},{x: 764, y: hght},{x: 764, y: hght-256}],
						[{x: 1025, y: hght-256},{x: 1025, y: hght},{x: 1089, y: hght},{x: 1089, y: hght-256}],
						[{x: 1345, y: hght-256},{x: 1345, y: hght},{x: 1409, y: hght},{x: 1409, y: hght-256}]];
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
			this.end = {x: 1350, y:140};
			return this.level2;
		}
		if(this.level === 3){
			this.end = {x: 750, y: 175};
			return this.level3;
		}
		else if(this.level === 4){
			this.end = {x: 1365, y: 370};
			return this.level4;
		}
		else{
			return [];
		}
	}

	clearObjects() {
		this.objectController.exists = [];
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
		ctx.fillRect(this.end.x,this.end.y,20,20);
		ctx.restore();
	}
}//end environment
