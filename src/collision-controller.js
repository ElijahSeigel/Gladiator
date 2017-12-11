//collision.js

export default class CollisionController{
	constructor(){
		this.environment = [];
		this.enemies = [];
		this.player;
	}

  //set at beginning of each level
	//env should be an array of polygons where a polygon is an array of points
	addEnvironment(env){
		this.environment = env;
	}

	addEnemies(enm){
		this.enemies = enm;
	}

	addPlayer(plyr){
		this.player = plyr;
	}

	addObjects(objects){
		this.objects = objects;
	}

	playerObjectCollides(point){
		var id = false;
		console.log(this.objects);
		this.objects.forEach((object) => {
			//console.log(object);
			var x = object.x;
			var y = object.y;
			if(Math.abs(point.x - object.x) < 40 && Math.abs(point.y - object.y) < 40){
				//console.log('grab object;');
				id = object.properties.id;
			}
		});
		return id;
	}

	playerEnvironmentCollides(point){
		var collision = false;
		//test
		//point = {x: 10, y: 10};
		//this.environment = [[{x: 5, y: 5}, {x: 5, y: 15}, {x: 15, y: 15}, {x: 15, y: 5}]];
		//endtest
		this.environment.forEach((polygon)=>{
			if(this.pointInside(point, polygon)) {
				collision = true;
			}
		});
		return collision;
	}

	playerHitsEnemy(point, dmg){
		this.enemies.forEach((enemy)=>{
			if(this.pointInside(point, [ enemy.position, {x:enemy.position.x + enemy.width,y: enemy.position.y},
					{x:enemy.position.x + enemy.width,y: enemy.position.y + enemy.height},
					{x:enemy.position.x,y: enemy.position.y + enemy.height} ])) {
				enemy.health -= dmg;
				//console.log(enemy.health);
				return true;
			}
		});
		return false;
	}

	enemyHitsPlayer(point, dmg){
		if(this.pointInside(point, [this.player.positionVector, {x:this.player.positionVector.x + this.player.width,y: this.player.positionVector.y},
					{x:this.player.positionVector.x + this.player.width,y: this.player.positionVector.y + this.player.height},
					{x:this.player.positionVector.x,y: this.player.positionVector.y + this.player.height}])) {
				this.player.health -= dmg;
				//console.log(this.player.health);
				return true;
			}
			return false;
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
		var oren1 = this.getOrientation(a1, a2, b1);
		var oren2 = this.getOrientation(a1, a2, b2);
		var oren3 = this.getOrientation(b1, b2, a1);
		var oren4 = this.getOrientation(b1, b2, a2);


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
		var pointExtended = {x: point.x + 10000, y: point.y};
		var numIntersections = 0;

		for(var i = 0; i < numPoints; i++){
			var next = (i+1)%numPoints;
			if(this.doIntersect(polygonPoints[i], polygonPoints[next], point, pointExtended)){
				if(this.getOrientation(polygonPoints[i], point, polygonPoints[next]) == 0){
					return this.onSegment(point, polygonPoints[i], polygonPoints[next]);
				}
				numIntersections++;
			}
		}
		return (numIntersections%2 == 1);
	}
}
