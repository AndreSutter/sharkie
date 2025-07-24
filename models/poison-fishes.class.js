class PoisonFishes extends MovableObject {
 
    width = 80;
    height = 80;
  

    IMAGES_SWIMMING = [
      'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png',
      'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim2.png',
      'img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim3.png'
    ];
  
    IMAGES_DEAD = [
      'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/1.Dead 2 (can animate by going down to the floor after the Fin Slap attack).png'
    ];
  
    /**
     * Indicates whether the poison fish is dead.
     * @type {boolean}
     */
    isDead = false;
  
    /**
     * Creates a new PoisonFishes instance.
     * Loads initial and animation images, randomizes the starting position and speed,
     * and starts the animation.
     */
    constructor() {
      super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/1.Swim/1.swim1.png');
      this.loadImages(this.IMAGES_SWIMMING);
      this.loadImages(this.IMAGES_DEAD);
      this.x = 600 + Math.random() * 600;
      this.y = 50 + Math.random() * 350;
      this.speed = 0.15 + Math.random() * 0.25;
      this.animate();
    }
  
    /**
     * Starts the poison fish's animation.
     * Continuously moves the fish left and cycles through the appropriate animation frames.
     */
    animate() {
      setInterval(() => {
        if (!this.isDead) {
          this.moveLeft();
        }
      }, 1000 / 60);
  
      setInterval(() => {
        if (this.isDead) {
          this.playAnimation(this.IMAGES_DEAD);
        } else {
          this.playAnimation(this.IMAGES_SWIMMING);
        }
      }, 200);
    }
  
    /**
     * Initiates the death sequence of the poison fish.
     * The fish falls down and, once it is off-screen, is removed from the game world.
     */
    die() {
      this.isDead = true;
      this.speed = 0;
      let fallDown = setInterval(() => {
        this.y += 5;
        if (this.y > 800) {
          clearInterval(fallDown);
          this.removeFromWorld();
        }
      }, 50);
    }
  
    /**
     * Removes the poison fish from the game world.
     * Splices this instance from the enemies array of the current level.
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
  