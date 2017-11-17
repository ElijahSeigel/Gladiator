/** @class Animation
  * A class representing an animation track for a sprite.
  */
  export default class Animation {
    /** @constructor
      * @param {string} path - the path where the sprite images are located.
      * @param {name} name - the name of the animation
      * @param {int} rate - the number of game frames between each animation frame
      * @param {boolean} looping - if the animation should loop.
      */
    constructor(path, name, rate, looping) {
      // Load the sprite images
      this.images = [];
      for(var i = 0; i < 5; i++) {
        let image = new Image();
        // Dynamically calculate the size of the final sprite
        // using a height of 120px and the aspect ratio of the
        // source images.
        this.height = 120;
        image.onload = () => {
          this.width = 120 * image.width/image.height;
        }
        image.src = `${path}/${name}_00${i}.png`;
        this.images.push(image);
      }
      this.frame = 0;
      this.rate = rate;
      this.counter = 0;
      this.looping = looping;
    }
    /** @method advance
      * Advances the animation by one game frame.
      */
    advance() {
      if(this.counter > this.rate) {
        this.frame++;
        if(this.frame >= this.images.length) {
          if(this.looping) this.frame = 0;
          else this.frame = this.images.length - 1;
        }
        this.counter = 0;
      }
      this.counter++;
    }
    /** @method reset
      * Resets the animaiton to the beginning.
      */
    reset() {
      this.counter = 0;
      this.frame = 0;
    }
    /** @method render
      * Renders the current animaiton frame.
      * @param {Context2D} ctx - the rendering context
      * @param {float} x - the x position of the sprite
      * @param {float} y - the y position of the sprite
      */
    render(ctx, x, y) {
      if(this.images[this.frame])
        ctx.drawImage(this.images[this.frame], x, y, this.width, this.height);
    }
  }