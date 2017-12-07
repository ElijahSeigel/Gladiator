import Animation from './animation';

/** @class Sprite
  * An animated game character sprite
  */
export default class Sprite {
  /** @constructor
    * @param {string} name - the name of the sprite, which
    * is also the folder holding its images.
    */
  constructor(name) {
    // Create the animation for the sprite
    this.animations = {
      'idle': new Animation('sprites/' + name, `IDLE`, 4, true, false),
      'walk': new Animation('sprites/' + name, `WALK`, 2, true, false),
      'run': new Animation('sprites/' + name, `RUN`, 1, true, false),
      'jump': new Animation('sprites/' + name, `JUMP`, 1, false, false),
      'attack': new Animation('sprites/' + name, `ATTACK`, 1, false, false),
      'hurt': new Animation('sprites/' + name, `HURT`, 1, false, false),
      'die': new Animation('sprites/' + name, `DIE`, 1, false, false)
    }
    this.reversedAnimations = {
      'idle': new Animation('sprites/' + name, `IDLE`, 4, true, true),
      'walk': new Animation('sprites/' + name, `WALK`, 2, true, true),
      'run': new Animation('sprites/' + name, `RUN`, 1, true, true),
      'jump': new Animation('sprites/' + name, `JUMP`, 1, false, true),
      'attack': new Animation('sprites/' + name, `ATTACK`, 1, false, true),
      'hurt': new Animation('sprites/' + name, `HURT`, 1, false, true),
      'die': new Animation('sprites/' + name, `DIE`, 1, false, true)
    }
    this.reversed = false;
    this.state = 'idle';

    this.reverse = this.reverse.bind(this);
  }
  /** @method setState
    * Sets the animation state for this sprite.
    * @param {string} state - options are 'idle', 'walk', 'run', 'jump',
    * 'attack', 'hurt', and 'die'.
    */
  setState(newState) {
    if (newState === this.state) return;
    this.state = newState;
    this.animations[newState].reset();
    this.reversedAnimations[newState].reset();
  }
  reverse(value) {
    //console.log(value)
    if (value === undefined) {
      this.reversed = !this.reversed
    } else {
      this.reversed = value
    }
  }
  /** @method update
    * Updates the sprite
    */
  update() {
    this.animations[this.state].advance();
    this.reversedAnimations[this.state].advance();
  }
  /** @method render
    * Renders the sprite
    * @param {Context2D} ctx - the rendering context
    * @param {float} x - the x position of the sprite
    * @param {float} y - the y position of the sprite
    */
  render(ctx, x, y) {
    if (this.reversed) this.reversedAnimations[this.state].render(ctx, x-20, y-22);
    else this.animations[this.state].render(ctx, x-5, y-22);
  }
}