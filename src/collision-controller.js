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
	
	/*pointInRectangle(){
		
	}*/

	playerEnvironmentCollides(point){		
		var collision = false;
		this.environment.forEach((polygon)=>{
			/*if(this.pointInside(point, polygon)) {
				collision = true;
			}*/
			//console.log(point);
			//console.log(polygon);
			//taken from https://math.stackexchange.com/questions/190111/how-to-check-if-a-point-is-inside-a-rectangle	
			collision = !(this.areaRectangle(polygon[0], polygon[1], polygon[3]) < this.areaTriangle(point, polygon[0], polygon[1]) + this.areaTriangle(point, polygon[1], polygon[2]) + this.areaTriangle(point, polygon[2], polygon[3]) + this.areaTriangle(point, polygon[3], polygon[0]));
			
		});
		//console.log(collision);
		return collision;
		
	}
	
	areaTriangle(pointA, pointB, pointC){
		//taken from https://www.mathopenref.com/coordtrianglearea.html
		return Math.abs((pointA.x*(pointB.y-pointC.y)+pointB.x*(pointC.y-pointA.y)+pointC.x*(pointA.y-pointB.y))/2);
	}
	
	areaRectangle(pointA, pointB, pointC){
		return Math.abs(Math.sqrt(Math.pow((pointB.x-pointA.x),2)+Math.pow((pointB.y-pointA.y),2))*Math.sqrt(Math.pow((pointC.x-pointA.x),2)+Math.pow((pointC.y-pointA.y),2)));
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
			if(this.doIntersect(polygonPoints[i], polygonPoints[i+1], point, pointExtended)){
				if(this.getOrientation(polygonPoints[i], point, polygonPoints[i+1])){
					if(this.onSegment(point, polygonPoints[i], polygonPoints[i+1])) return true;
				}
				numIntersections++;
			}
		}
		return (numIntersections%2 == 1);
	}

}
