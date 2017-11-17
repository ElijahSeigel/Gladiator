// enemy.js

export default class Enemy {
    constructor(x, y, width, height, type, awarenessRadius, movementPattern) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.type = type;
        this.awarenessRadius = awarenessRadius;
        this.movementPattern = movementPattern;

        this.steps = 0;
    }
    update(characterPosition) {
        if (false) { // TODO: calculate if this enemy is aware
            // Enemy is aware
        } else {

        }
    }
    render(ctx) {
        // render a square in place of the enemy for now
        ctx.save();
        ctx.fillStyle = this.type;
        ctx.fillRect(this.x - this.width/2, this.y - this.height/2, this.width, this.height);
        ctx.restore();
    }
}
