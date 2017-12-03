//collision.js

export default class CollisionController{
	constructor(){
		this.environment = [];
	}

  //set at beginning of each level
	//env should be an array of polygons where a polygon is an array of points
	addEnvironment(env){
		this.environment = env;
	}

	playerEnvironmentCollides(point){
		//console.log(this.environment);
		//console.log(point);
		var collision = false;
		//test
		point = {x: 50, y: 5};
		this.environment = [[{x: 0, y: 0}, {x: 0, y: 10}, {x: 10, y: 10}, {x: 10, y: 0}]];
		//endtest
		this.environment.forEach((polygon)=>{
			if(this.pointInside(point, polygon)) {
				collision = true;
			}
		});
		//console.log(collision);
		return collision;
	}

  //0 -> colinear, 1 -> clockwise, 2 -> counterclockwise
	getOrientation(a, b, c){
		var val = (b.y-a.y) * (c.x-b.x) - (b.x-a.x) * (c.y-b.y);
		if(val == 0) return 0;
		if(val > 0) return 1;
		return 2;
	}

  //does testPoint lie on ab (must be colinear)
	onSegment(testPoint, a, b){
		if(testPoint.x <= Math.max(a.x, b.x) && testPoint.x >= Math.min(a.x, b.x) &&
			testPoint.y <= Math.max(a.y, b.y) && testPoint.y >= Math.min(a.y, b.y)){
			return true;
		}
		else {
			false
		}
	}

	//do point a1b1 and a2b2 intersect?
	doIntersect(a1, a2, b1, b2){
		var oren1 = this.getOrientation(a1, b1, a2);
		var oren2 = this.getOrientation(a1, b1, b2);
		var oren3 = this.getOrientation(a2, b2, a1);
		var oren4 = this.getOrientation(a2, b2, b1);


		//console.log(oren1 != oren2 && oren3 != oren4);
		if (oren1 != oren2 && oren3 != oren4) return true;
		return false;

		//to check for special cases if needed:
		//http://www.geeksforgeeks.org/how-to-check-if-a-given-point-lies-inside-a-polygon/
	}

  //checks if a point is in a given polygon (an array of points)
	pointInside(point, polygonPoints){
		var numPoints = polygonPoints.length;
		if(numPoints < 3) {
			console.log('pointInside must receive a polygon (at least 3 points)!');
			return false;
		}
		var pointExtended = {x: point.x + 1000, y: point.y};
		var numIntersections = 0;

		for(var i = 0; i < numPoints; i++){
			var next = (i+1)%numPoints;
			if(this.doIntersect(polygonPoints[i], polygonPoints[next], point, pointExtended)){
				if(this.getOrientation(polygonPoints[i], point, polygonPoints[next]) == 0){
					//console.log("oriented");
					return this.onSegment(point, polygonPoints[i], polygonPoints[next]);
				}
				console.log('intersection');
				numIntersections++;
			}
		}
		//console.log(numIntersections%2 == 1);
		return (numIntersections%2 == 1);
	}

}
