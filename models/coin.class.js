class Coin extends MovableObject {
  height = 45;
  width = 45;

  /**
   * Array of image paths for the coin's swimming animation.
   * @type {string[]}
   */
  IMAGES_SWIMM = [
    'img/4. Marcadores/1. Coins/1.png',
    'img/4. Marcadores/1. Coins/2.png',
    'img/4. Marcadores/1. Coins/3.png',
    'img/4. Marcadores/1. Coins/4.png'
  ];

  /**
   * Creates a new Coin instance.
   * @param {number} x - The x-coordinate where the coin is placed.
   * @param {number} y - The y-coordinate where the coin is placed.
   */
  constructor(x, y) {
    super().loadImage('img/4. Marcadores/1. Coins/1.png');
    this.loadImages(this.IMAGES_SWIMM);
    this.x = x;
    this.y = y;
    this.animate();
  }

  /**
   * Animates the coin by moving it left and cycling through its swimming images.
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
   * Handles the coin collection.
   * Once collected, the coin flies upward until it is removed from view.
   */
  collect() {
    this.isCollected = true;
    let flyUpInterval = setInterval(() => {
      this.y -= 5;
      if (this.y < -100) {
        clearInterval(flyUpInterval);
      }
    }, 1000 / 60);
  }
}
