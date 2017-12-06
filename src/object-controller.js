export default class ObjectController {

  constructor() {
    this.exists = [];

    this.objects =
      {
        'dashAbility': {
          'id': 'dash',
          'distance': 10,
          'img': 'health.png'
        },
        'ghost': {
          'duration': 100,
          'multiplier': 0.2,
          'img': 'imageHere'
        },
        'speedBoost': {
          'duration': 100,
          'multiplier': 2.0,
          'img': 'imageHere'
        },
        'potion': {
          'value': 10,
          'healthIncrease': 100,
          'img': 'health.png'
        },
        'sword': {
          'value': 100,
          'damage': 30,
          'range': 5,
          'condition': 100,
          'img': 'imageHere'
        },
        'spear': {
          'value': 100,
          'damage': 15,
          'range': 10,
          'condition': 100,
          'img': 'imageHere'
        },
        'goldenGun': {
          'value': 1000,
          'damage': 1000,
          'range': 1000,
          'ammo': 3,
          'img': 'imageHere'
        }
      }
  }

  newObject(id, x, y){
    this.exists.push({
      'properties': this.objects[id],
      'x': x,
      'y': y,
    });
  }

  removeObject(id){
    var index;
    for(var i = 0; i < this.exists.length; i++){
      if(this.exists[0]['properties']['id'] == id){
        index = i;
      }
    }
    this.exists.splice(index, 1);
  }

  render(ctx) {
    this.exists.forEach((object)=>{
      var img = new Image();
      img.src = '/tiles/' + object['properties']['img'];
      ctx.save();
      ctx.drawImage(img, object['x'], object['y'], 15, 25);
			ctx.restore();
    });
  }
}
