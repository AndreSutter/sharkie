class LilaJellyFishes extends MovableObject {
 
    width = 80;
    height = 80;
  
    /**
     * Array of image paths for the swimming animation.
     * @type {string[]}
     */
    IMAGES_SWIMMING = [
      'img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
      'img/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
      'img/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
      'img/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];
  

    IMAGES_DEAD = [
      'img/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
      'img/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
      'img/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
      'img/2.Enemy/2 Jelly fish/Dead/Lila/L4.png'
    ];
  
    /**
     * Indicates whether the jellyfish is dead.
     * @type {boolean}
     */
    isDead = false;
  
    /**
     * Creates a new LilaJellyFishes instance.
     * Loads the swimming and dead images and sets a random initial position and speed.
     * Then starts the animation.
     */
    constructor() {
      super().loadImage('img/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png');
      this.loadImages(this.IMAGES_SWIMMING);
      this.loadImages(this.IMAGES_DEAD);
  
      this.x = 1200 + Math.random() * 500;
      this.y = 50 + Math.random() * 350;
      this.speed = 0.15 + Math.random() * 0.02;
  
      this.animate();
    }
  
    /**
     * Starts the jellyfish animations.
     * Moves the jellyfish to the left continuously and cycles through the appropriate animation frames.
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
     * Initiates the death sequence of the jellyfish.
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
     * Removes the jellyfish from the world by splicing it from the enemy array.
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
  