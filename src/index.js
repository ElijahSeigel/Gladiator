import Tilemap from './tilemap';
import data from './example.json';

var tilemap = new Tilemap(data);

var canvas = document.createElement('canvas');
canvas.width = 1500;
canvas.height = 650;
var context = canvas.getContext('2d');
document.body.appendChild(canvas);

// After 3 seconds (to allow image load time), render
setTimeout(() => {
  tilemap.render(context);
}, 3000)