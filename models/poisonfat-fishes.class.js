class PoisonFatFishes extends MovableObject {

    width = 80;
    height = 80;
  

    IMAGES_SWIMMING = [
      'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png',
      'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition2.png',
      'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition3.png',
      'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition4.png',
      'img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition5.png'
    ];
  
  
    IMAGES_DEAD = [
      'img/2.Enemy/1.Puffer fish (3 color options)/4.DIE/2.png'
    ];
  
    isDead = false;
  
    /**
     * Creates a new PoisonFatFishes instance.
     * Loads initial image and all animation images, sets a random starting position and speed, and starts the animation.
     */
    constructor() {
      super().loadImage('img/2.Enemy/1.Puffer fish (3 color options)/2.transition/2.transition1.png');
      this.loadImages(this.IMAGES_SWIMMING);
      this.loadImages(this.IMAGES_DEAD);
      this.x = 500 + Math.random() * 500;
      this.y = 50 + Math.random() * 350;
      this.speed = 0.15 + Math.random() * 0.25;
      this.animate();
    }
  
    /**
     * Starts the animation for the poison fat fish.
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
     * Initiates the death sequence of the poison fat fish.
     * The fish falls down and, once off-screen, is removed from the game world.
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
     * Removes the poison fat fish from the game world by splicing it out of the enemies array.
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
  