class PoisonBottle extends MovableObject {
    
    height = 65;
    width = 65;
  

    IMAGES_SWIMM = [
      'img/4. Marcadores/Posión/Animada/1.png',
      'img/4. Marcadores/Posión/Animada/2.png',
      'img/4. Marcadores/Posión/Animada/3.png',
      'img/4. Marcadores/Posión/Animada/4.png',
      'img/4. Marcadores/Posión/Animada/5.png',
      'img/4. Marcadores/Posión/Animada/6.png',
      'img/4. Marcadores/Posión/Animada/7.png',
      'img/4. Marcadores/Posión/Animada/8.png'
    ];
  
    /**
     * Creates a new PoisonBottle instance.
     * Loads the initial image and all swimming animation images, then starts the animation.
     * @param {number} x - The x-coordinate where the poison bottle is placed.
     * @param {number} y - The y-coordinate where the poison bottle is placed.
     */
    constructor(x, y) {
      super().loadImage('img/4. Marcadores/Posión/Animada/1.png');
      this.loadImages(this.IMAGES_SWIMM);
      this.x = x;
      this.y = y;
      this.animate();
    }
  
    /**
     * Starts the animation for the poison bottle.
     * The bottle continuously moves left and cycles through its swimming animation.
     */
    animate() {
      this.moveLeft();
      setInterval(() => {
        if (!this.isCollected) {
          this.playAnimation(this.IMAGES_SWIMM);
        }
      }, 200);
    }
  
    /**
     * Handles the collection of the poison bottle.
     * Once collected, the bottle moves upward until it is no longer visible.
     */
    collect() {
      this.isCollected = true;
      let flyUpInterval = setInterval(() => {
        this.y -= 3;
        if (this.y < -100) {
          clearInterval(flyUpInterval);
        }
      }, 1000 / 60);
    }
  }
  