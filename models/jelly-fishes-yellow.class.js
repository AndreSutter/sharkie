class YellowJellyFishes extends MovableObject {
 
    width = 80;
    height = 80;
  

    IMAGES_SWIMMING = [
      'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png',
      'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 2.png',
      'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 3.png',
      'img/2.Enemy/2 Jelly fish/Regular damage/Yellow 4.png'
    ];
  

    IMAGES_DEAD = [
      'img/2.Enemy/2 Jelly fish/Dead/Yellow/y1.png',
      'img/2.Enemy/2 Jelly fish/Dead/Yellow/y2.png',
      'img/2.Enemy/2 Jelly fish/Dead/Yellow/y3.png',
      'img/2.Enemy/2 Jelly fish/Dead/Yellow/y4.png'
    ];
  
    /**
     * Indicates whether the jellyfish is dead.
     * @type {boolean}
     */
    isDead = false;
  
    /**
     * Creates a new YellowJellyFishes instance.
     * Loads the swimming and death images, randomizes the starting position and speed, and starts animation.
     * @param {number} [x] - (Optional) The starting x-coordinate. If not provided, calculated randomly.
     * @param {number} [y] - (Optional) The starting y-coordinate. If not provided, calculated randomly.
     */
    constructor() {
      super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Yellow 1.png');
      this.loadImages(this.IMAGES_SWIMMING);
      this.loadImages(this.IMAGES_DEAD);
  
      this.x = 1700 + Math.random() * 500;
      this.y = 50 + Math.random() * 350;
      this.speed = 0.15 + Math.random() * 0.02;
  
      this.animate();
    }
  
    /**
     * Starts the jellyfish animations.
     * Moves the jellyfish left and cycles through animation frames based on its state.
     */
    animate() {
      setInterval(() => {
        if (!this.isDead) {
          this.moveLeft();
        }
      }, 1000 / 30);
  
      setInterval(() => {
        if (this.isDead) {
          this.playAnimation(this.IMAGES_DEAD);
        } else {
          this.playAnimation(this.IMAGES_SWIMMING);
        }
      }, 170);
    }
  
    /**
     * Initiates the death sequence.
     * The jellyfish floats upward until it is removed from the game world.
     */
    die() {
      this.isDead = true;
      let floatUp = setInterval(() => {
        this.y -= 10;
        if (this.y < -100) {
          clearInterval(floatUp);
          this.removeFromWorld();
        }
      }, 50);
    }
  
    /**
     * Removes the jellyfish from the game world.
     * Splices this instance out of the enemies array in the level.
     */
    removeFromWorld() {
      if (this.world && this.world.level) {
        const index = this.world.level.enemies.indexOf(this);
        if (index > -1) {
          this.world.level.enemies.splice(index, 1);
        }
      }
    }
  }
  