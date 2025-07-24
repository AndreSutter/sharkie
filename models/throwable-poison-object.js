class PoisonBubble extends ThrowableObject {
    /**
     * Creates a new PoisonBubble instance by loading its poison bubble image,
     * setting its position and dimensions, and starting its throw animation.
     * @param {number} x - The starting x-coordinate.
     * @param {number} y - The starting y-coordinate.
     */
    constructor(x, y) {
      super().loadImage('img/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png'); 
      this.x = x;
      this.y = y;
      this.height = 60;
      this.width = 50;
      this.throw();
    }
  
    /**
     * Initiates the throw animation for the poison bubble.
     * Moves the bubble horizontally based on its direction.
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
  