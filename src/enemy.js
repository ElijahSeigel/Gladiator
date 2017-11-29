// enemy.js

export default class Enemy {
    constructor(xPos, yPos, width, height, type, awarenessRadius, movementPattern, mirrorMovement, framesPerStep, movementSpeed) {
        this.startPoint = { x: xPos, y: yPos };
        this.position = { x: xPos, y: yPos };
        this.width = width;
        this.height = height;
        this.type = type;
        this.awarenessRadius = awarenessRadius;
        this.movementPattern = movementPattern;
        this.mirrorMovement = mirrorMovement;
        this.framesPerStep = framesPerStep;
        this.movementSpeed = movementSpeed;

        this.frames = 0;
        this.mirrored = false;
    }
    update(characterPosition) {
        var characterDistanceSquared = Math.pow((characterPosition.x - this.position.x), 2) + Math.pow((characterPosition.y - this.position.y), 2)
        if (characterDistanceSquared < Math.pow(this.awarenessRadius, 2)) {
            // Enemy is aware
        } else {
            // Move
            var stepIndex = !this.mirrored ? Math.floor(this.frames / this.framesPerStep) : this.movementPattern.length - Math.floor(this.frames / this.framesPerStep) - 1;
            var step = this.movementPattern[stepIndex];
            switch(step) {
                case 'L':
                case 'l':
                    !this.mirrored ? this.position.x -= this.movementSpeed : this.position.x += this.movementSpeed;
                    break;
                case 'R':
                case 'r':
                    !this.mirrored ? this.position.x += this.movementSpeed : this.position.x -= this.movementSpeed;
                    break;
                case 'U':
                case 'u':
                    !this.mirrored ? this.position.y -= this.movementSpeed : this.position.y += this.movementSpeed;
                    break;
                case 'D':
                case 'd':
                    !this.mirrored ? this.position.y += this.movementSpeed : this.position.y -= this.movementSpeed;
                    break;
                default:
                    break;
            }

            // Increment frame counter
            this.frames++;
            if (this.frames >= this.movementPattern.length * this.framesPerStep) {
                this.frames = 0;
                this.mirrored = this.mirrorMovement ? !this.mirrored : false
            }
        }
    }
    render(ctx) {
        // render a square in place of the enemy for now
        ctx.save();
        ctx.fillStyle = this.type;
        ctx.fillRect(this.position.x - this.width/2, this.position.y - this.height/2, this.width, this.height);
        ctx.restore();
    }
}
