// enemy.js

export class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    update() {

    }
    render(ctx) {
        // render a square in place of the enemy for now
        ctx.save();
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x-10, this.y-10, 20, 20);
        ctx.restore();
    }
}
