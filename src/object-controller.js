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
        'lightningAbility': {
          'id': 'lightning',
          'img': 'electric.png'
        },
        'ghost': {
          'id': 'ghost',
          'duration': 100,
          'multiplier': 0.2,
          'img': 'imageHere'
        },
        'speedBoost': {
          'id': 'speedBoost',
          'duration': 100,
          'multiplier': 2.0,
          'img': 'imageHere'
        },
        'potion': {
          'id': 'potion',
          'value': 10,
          'healthIncrease': 100,
          'img': 'health.png'
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
    console.log(this.exists);
  }

  removeObject(id){
    var index;
    for(var i = 0; i < this.exists.length; i++){
      if(this.exists[i]['properties']['id'] == id){
        index = i;
      }
    }
    this.exists.splice(index, 1);
  }

  render(ctx) {
<<<<<<< HEAD
    //console.log('runnig');
    this.exists.forEach((object)=>{
     // console.log('draw potion');
=======
    this.exists.forEach((object)=>{
>>>>>>> 15917c5218a61908544d9b29f13dec444744993b
      var img = new Image();
      img.src = '/tiles/' + object['properties']['img'];
      ctx.save();
      ctx.drawImage(img, object['x'], object['y'], 20, 25);
			ctx.restore();
    });
  }
}
