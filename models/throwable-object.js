class ThrowableObject extends MovableObject {
    
 /**
 * Creates a new ThrowableObject by loading its bubble image, setting its position and dimensions, and starting its throw animation.
 * @param {number} x - The starting x-coordinate.
 * @param {number} y - The starting y-coordinate.
 */
    constructor(x, y) {
      super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Bubble.png');
      this.x = x;
      this.y = y;
      this.height = 60;
      this.width = 50;
      this.throw();
    }
  
    /**
     * Initiates the throwing animation.
     * Moves the object left or right based on its direction.
     */
    throw() {
      setInterval(() => {
        if (this.otherDirection) {
          this.x -= this.speed * 2;
        } else {
          this.x += this.speed * 2;
        }
      }, 20);
    }
  }
  