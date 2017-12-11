// enemy.js
import Sprite from './sprite'

export default class Enemy {
    constructor(xPos, yPos, width, height, type, awarenessRadius, movementPattern, mirrorMovement, framesPerStep, movementSpeed, collision) {
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
		this.health = 100;
		this.collisionController = collision;

        this.frames = 0;
        this.mirrored = false;
        this.sprite = new Sprite(type);
        movementSpeed > 2 ? this.sprite.setState('run') : this.sprite.setState('walk');
    }
    update(characterPosition) {
        if(this.health>0){
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
						if (this.mirrored) {
							this.position.x += this.movementSpeed;
							this.sprite.reverse(false);
						} else {
							this.position.x -= this.movementSpeed;
							this.sprite.reverse(true);
						}
						break;
					case 'R':
					case 'r':
						if (!this.mirrored) {
							this.position.x += this.movementSpeed;
							this.sprite.reverse(false);
						} else {
							this.position.x -= this.movementSpeed;
							this.sprite.reverse(true);
						}
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
		else{//health less than 0
			this.sprite.setState('die');
		}
        this.sprite.update();
    }
    render(ctx) {
		this.sprite.render(ctx, this.position.x, this.position.y);
		//ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
