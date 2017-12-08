import ObjectController from './object-controller';
//ENV.js
//this is just filler to work on the charachter.

export default class ENV{
	constructor(hght, wdth,level){
		this.height = hght;
		this.width = wdth;
		this.level = 4;
		this.level1 = [[{x: 0, y: hght-50}, {x: 0, y: hght}, {x: wdth, y: hght}, {x: wdth, y: hght-50}],
							[{x: 0, y: 450},{x: 0, y: 500},{x: 1300, y: 500},{x: 1300, y: 450}],
							[{x: 200, y: 300},{x: 200, y: 350},{x: 1500, y: 350},{x: 1500, y: 300}]];
		this.level2 = [[{x: 0, y: hght-50}, {x: 0, y: hght}, {x: wdth, y: hght}, {x: wdth, y: hght-50}],
						[{x: 0, y: 450}, {x: 0, y: 500}, {x: 300, y: 500}, {x: 300, y: 450}],
						[{x: 0, y: 150}, {x: 0, y: 200}, {x: 300, y: 200}, {x: 300, y: 150}],
						[{x: 700, y: 450}, {x: 700, y: 500}, {x: 1000, y: 500}, {x: 1000, y: 450}],
						[{x: 1100, y: 300}, {x: 1100, y: 350}, {x: 1500, y: 350}, {x: 1500, y: 300}],
						[{x: 500, y: 150}, {x: 500, y: 200}, {x: 950, y: 200}, {x: 950, y: 150}]];
		this.level3 = [[{x: 250, y: hght-50}, {x: 250, y: hght}, {x: wdth-250, y: hght}, {x: wdth-250, y: hght-50}],
						[{x: 0, y: 450}, {x: 0, y: 500}, {x: 400, y: 500}, {x: 400, y: 450}],
						[{x: 1100, y: 450}, {x: 1100, y: 500}, {x: 1500, y: 500}, {x: 1500, y: 450}],
						[{x: 600, y: 100}, {x: 600, y: 150}, {x: 900, y: 150}, {x: 900, y: 100}],
						[{x: 300, y: 300}, {x: 300, y: 350}, {x: 600, y: 350}, {x: 600, y: 300}],
						[{x: 900, y: 275}, {x: 900, y: 325}, {x: 1200, y: 325}, {x: 1200, y: 275}]];
		this.level4 = [[{x: 0, y: hght-150},{x: 0, y: hght},{x: 50, y: hght},{x: 50, y: hght-150}],
						[{x: 250, y: hght-150},{x: 250, y: hght},{x: 300, y: hght},{x: 300, y: hght-150}],
						[{x: 500, y: hght-150},{x: 500, y: hght},{x: 550, y: hght},{x: 550, y: hght-150}],
						[{x: 750, y: hght-150},{x: 750, y: hght},{x: 800, y: hght},{x: 800, y: hght-150}],
						[{x: 1000, y: hght-150},{x: 1000, y: hght},{x: 1050, y: hght},{x: 1050, y: hght-150}],
						[{x: 1250, y: hght-150},{x: 1250, y: hght},{x: 1300, y: hght},{x: 1300, y: hght-150}],
						[{x: 1450, y: hght-150},{x: 1450, y: hght},{x: 1500, y: hght},{x: 1500, y: hght-150}]];
		this.render = this.render.bind(this);
		this.nextLevel = this.nextLevel.bind(this);
		this.objectController = new ObjectController();
		this.objectController.newObject('potion', 100, 100);
	}//end constructor

	/** @method nextLevel
	*	Called when a level is finished.
	*	Advances teh level counter and renders the platforms for the new level.
	*/
	nextLevel(){
		this.level++;
		if(this.level === 2)return this.level2;
		else if(this.level === 3)return this.level3;
		else return this.level4;
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
		ctx.restore();
	}

}//end environment
