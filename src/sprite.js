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
      'idle': new Animation('sprites/' + name, `_IDLE`, 4, true),
      'walk': new Animation('sprites/' + name, `_WALK`, 2, true),
      'run': new Animation('sprites/' + name, `_RUN`, 1, true),
      'jump': new Animation('sprites/' + name, `_JUMP`, 1, false),
      'attack': new Animation('sprites/' + name, `_ATTACK`, 1, false),
      'hurt': new Animation('sprites/' + name, `_HURT`, 1, false),
      'die': new Animation('sprites/' + name, `_DIE`, 1, false)
    }
    this.state = 'idle';
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
  }
  /** @method update
    * Updates the sprite
    */
  update() {
    this.animations[this.state].advance();
  }
  /** @method render
    * Renders the sprite
    * @param {Context2D} ctx - the rendering context
    * @param {float} x - the x position of the sprite
    * @param {float} y - the y position of the sprite
    */
  render(ctx, x, y) {
    console.log('hello');
    this.animations[this.state].render(ctx, x, y);
  }
}