//collision.js

export default class collision{
	constructor(){
		this.environment;
	}

  //set at beginning of each level
	//env should be an array of polygons where a polygon is an array of points
	addEnvironment(env){
		this.environment = env;
	}

	playerEnvironmentCollides(point){
		this.environment.forEach((polygon)=>{
			if(pointInside(point, polygon)) return true;
		});
		return false;
	}

  //0 -> colinear, 1 -> clockwise, 2 -> counterclockwise
	getOrientation(a, b, c){
		var val = (b.y-a.y) * (c.x-b.x) - (b.x-a.x) * (c.y-b.y);
		if(val == 0) return 0;
		return (val > 0) ? 1 : 2;
	}

  //does testPoint lie on ab (must be colinear)
	onSegment(testPoint, a, b){
		if(testPoint.x <= Math.max(a.x, b.x) && testPoint.x >= Math.min(a.x, b.x) &&
			testPoint.y <= max(a.y, b.y) && testPoint.y >= min(a.y, b.y)){
			return true;
		}
		else {
			false
		}
	}

	//do point a1b1 and a2b2 intersect?
	doIntersect(a1, a2, b1, b2){
		var oren1 = getOrientation(a1, b1, a2);
		var oren2 = getOrientation(a1, b1, b2);
		var oren3 = getOrientation(a2, b2, a1);
		var oren4 = getOrientation(a2, b2, b1);

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

		for(var i = 0; i < numPoints-1; i++){
			if(doIntersect(polygonPoints[i], polygonPoints[i+1], p, pointExtended)){
				if(getOrientation(polygonPoints[i], p, polygonPoints[i+1])){
					return onSegment(point, polygon[i], polygon[i+1]);
				}
				numIntersections++;
			}
		}
		return (numIntersections%2 == 1);
	}

}
