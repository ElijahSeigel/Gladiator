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
      'idle': new Animation('sprites/' + name, `1_IDLE`, 4, true),
      'walk': new Animation('sprites/' + name, `2_WALK`, 2, true),
      'run': new Animation('sprites/' + name, `3_RUN`, 1, true),
      'jump': new Animation('sprites/' + name, `4_JUMP`, 1, false),
      'attack': new Animation('sprites/' + name, `5_ATTACK`, 1, false),
      'hurt': new Animation('sprites/' + name, `6_HURT`, 1, false),
      'die': new Animation('sprites/' + name, `7_DIE`, 1, false)
    }
    this.state = 'idle';
  }
  /** @method setState
    * Sets the animation state for this sprite.
    * @param {string} state - options are 'idle', 'walk', 'run', 'jump',
    * 'attack', 'hurt', and 'die'.
    */
  setState(newState) {
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
    this.animations[this.state].render(ctx, x, y);
  }
}