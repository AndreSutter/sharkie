class Character extends MovableObject {
    width = 250;
    height = 220;
    y = 90;
    speed = 6;
  
    /**
     * Array of image paths for idle animation.
     * @type {string[]}
     */
    IMAGES_IDLE = [
      'img/1.Sharkie/1.IDLE/1.png',
      'img/1.Sharkie/1.IDLE/2.png',
      'img/1.Sharkie/1.IDLE/3.png',
      'img/1.Sharkie/1.IDLE/4.png',
      'img/1.Sharkie/1.IDLE/5.png',
      'img/1.Sharkie/1.IDLE/6.png',
      'img/1.Sharkie/1.IDLE/7.png',
      'img/1.Sharkie/1.IDLE/8.png',
      'img/1.Sharkie/1.IDLE/9.png',
      'img/1.Sharkie/1.IDLE/10.png',
      'img/1.Sharkie/1.IDLE/11.png',
      'img/1.Sharkie/1.IDLE/12.png',
      'img/1.Sharkie/1.IDLE/13.png',
      'img/1.Sharkie/1.IDLE/14.png',
      'img/1.Sharkie/1.IDLE/15.png',
      'img/1.Sharkie/1.IDLE/16.png',
      'img/1.Sharkie/1.IDLE/17.png',
      'img/1.Sharkie/1.IDLE/18.png'
    ];
  

    IMAGES_LONG_IDLE = [
      'img/1.Sharkie/2.Long_IDLE/i1.png',
      'img/1.Sharkie/2.Long_IDLE/I2.png',
      'img/1.Sharkie/2.Long_IDLE/I3.png',
      'img/1.Sharkie/2.Long_IDLE/I4.png',
      'img/1.Sharkie/2.Long_IDLE/I5.png',
      'img/1.Sharkie/2.Long_IDLE/I6.png',
      'img/1.Sharkie/2.Long_IDLE/I7.png',
      'img/1.Sharkie/2.Long_IDLE/I8.png',
      'img/1.Sharkie/2.Long_IDLE/I9.png',
      'img/1.Sharkie/2.Long_IDLE/I10.png',
      'img/1.Sharkie/2.Long_IDLE/I11.png',
      'img/1.Sharkie/2.Long_IDLE/I12.png',
      'img/1.Sharkie/2.Long_IDLE/I13.png',
      'img/1.Sharkie/2.Long_IDLE/I14.png'
    ];
  

    IMAGES_LONG_IDLE_SLEEP = [
      'img/1.Sharkie/2.Long_IDLE/I11.png',
      'img/1.Sharkie/2.Long_IDLE/I12.png',
      'img/1.Sharkie/2.Long_IDLE/I13.png',
      'img/1.Sharkie/2.Long_IDLE/I14.png'
    ];
  
   
    IMAGES_SWIMMING = [
      'img/1.Sharkie/3.Swim/1.png',
      'img/1.Sharkie/3.Swim/2.png',
      'img/1.Sharkie/3.Swim/3.png',
      'img/1.Sharkie/3.Swim/4.png',
      'img/1.Sharkie/3.Swim/5.png',
      'img/1.Sharkie/3.Swim/6.png'
    ];
  
   
    IMAGES_DEAD = [
      'img/1.Sharkie/6.dead/1.Poisoned/1.png',
      'img/1.Sharkie/6.dead/1.Poisoned/2.png',
      'img/1.Sharkie/6.dead/1.Poisoned/3.png',
      'img/1.Sharkie/6.dead/1.Poisoned/4.png',
      'img/1.Sharkie/6.dead/1.Poisoned/5.png',
      'img/1.Sharkie/6.dead/1.Poisoned/6.png',
      'img/1.Sharkie/6.dead/1.Poisoned/7.png',
      'img/1.Sharkie/6.dead/1.Poisoned/8.png',
      'img/1.Sharkie/6.dead/1.Poisoned/9.png',
      'img/1.Sharkie/6.dead/1.Poisoned/10.png',
      'img/1.Sharkie/6.dead/1.Poisoned/11.png',
      'img/1.Sharkie/6.dead/1.Poisoned/12.png'
    ];
  
    
    IMAGES_POISON = [
      'img/1.Sharkie/5.Hurt/1.Poisoned/1.png',
      'img/1.Sharkie/5.Hurt/1.Poisoned/2.png',
      'img/1.Sharkie/5.Hurt/1.Poisoned/3.png',
      'img/1.Sharkie/5.Hurt/1.Poisoned/4.png',
      'img/1.Sharkie/5.Hurt/1.Poisoned/5.png'
    ];
  
   
    IMAGES_SHOCK = [
      'img/1.Sharkie/5.Hurt/2.Electric shock/1.png',
      'img/1.Sharkie/5.Hurt/2.Electric shock/2.png',
      'img/1.Sharkie/5.Hurt/2.Electric shock/3.png'
    ];
  
  
    IMAGES_SLAP = [
      'img/1.Sharkie/4.Attack/Fin slap/1.png',
      'img/1.Sharkie/4.Attack/Fin slap/2.png',
      'img/1.Sharkie/4.Attack/Fin slap/3.png',
      'img/1.Sharkie/4.Attack/Fin slap/4.png',
      'img/1.Sharkie/4.Attack/Fin slap/5.png',
      'img/1.Sharkie/4.Attack/Fin slap/6.png',
      'img/1.Sharkie/4.Attack/Fin slap/7.png',
      'img/1.Sharkie/4.Attack/Fin slap/8.png'
    ];
  
   
    IMAGES_BUBBLE = [
      'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/1.png',
      'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/2.png',
      'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/3.png',
      'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/4.png',
      'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/5.png',
      'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/6.png',
      'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/7.png',
      'img/1.Sharkie/4.Attack/Bubble trap/op1 (with bubble formation)/8.png'
    ];
  
  
    IMAGES_POISON_BUBBLE = [
      'img/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
      'img/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
      'img/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
      'img/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
      'img/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
      'img/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
      'img/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
      'img/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png'
    ];
  
    world;
    isSlapping = false;
    isSleeping = false;
    slapCooldown = 1000;
    lastSlapTime = 0;
    longIdleIndex = 0;
    poisonBottles = 0;
    lastActionTime = Date.now();
  
   
    swimming_sound = new Audio('audio/swim.mp3');
    coin_collect_sound = new Audio('audio/coin.mp3');
    poison_sound = new Audio('audio/poison.mp3');
    shock_sound = new Audio('audio/shock.mp3');
    death_sound = new Audio('audio/death.mp3');
    bubble_sound = new Audio('audio/bubble.mp3');
    bottle_collect_sound = new Audio('audio/bottle.mp3');
    winning_sound = new Audio('audio/winning.mp3');
  
    /**
     * Creates a new Character instance.
     * Loads initial image and all animation images, then starts the animation.
     */
    constructor() {
      super().loadImage('img/1.Sharkie/1.IDLE/1.png');
      this.loadImages(this.IMAGES_IDLE);
      this.loadImages(this.IMAGES_LONG_IDLE);
      this.loadImages(this.IMAGES_LONG_IDLE_SLEEP);
      this.loadImages(this.IMAGES_SWIMMING);
      this.loadImages(this.IMAGES_DEAD);
      this.loadImages(this.IMAGES_POISON);
      this.loadImages(this.IMAGES_SHOCK);
      this.loadImages(this.IMAGES_SLAP);
      this.loadImages(this.IMAGES_BUBBLE);
      this.loadImages(this.IMAGES_POISON_BUBBLE);
      this.animate();
    }
  
    /**
     * Starts the animation by initiating movement and animation intervals.
     */
    animate() {
      this.startMovementInterval();
      this.startAnimationInterval();
    }
  
    /**
     * Processes keyboard input for movement and returns whether the character moved.
     * @returns {boolean} True if movement occurred, otherwise false.
     */
    processMovement() {
      let moving = false;
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
        this.resetSleepingState();
        moving = true;
      }
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
        this.resetSleepingState();
        moving = true;
      }
      if (this.world.keyboard.UP && this.y > this.world.level.level_end_Y) {
        this.moveUp();
        this.resetSleepingState();
        moving = true;
      }
      if (this.world.keyboard.DOWN && this.y < this.world.level.level_start_Y) {
        this.moveDown();
        this.resetSleepingState();
        moving = true;
      }
      return moving;
    }
  
    /**
     * Starts the movement interval which updates character movement and camera position.
     */
    startMovementInterval() {
      setInterval(() => {
        if (this.afterDeathNone()) return;
        const moving = this.processMovement();
        if (moving && this.swimming_sound.paused) this.swimming_sound.play();
        else this.swimming_sound.pause();
        this.world.camera_x = -this.x + 100;
      }, 1000 / 60);
    }
  
    /**
     * Starts the animation interval that selects the appropriate animation based on the character's state.
     */
    startAnimationInterval() {
      setInterval(() => {
        const elapsed = Date.now() - this.lastActionTime;
        if (this.isDead()) { this.die(); return; }
        if (this.isPoison()) this.playAnimation(this.IMAGES_POISON);
        else if (this.isShock()) this.playAnimation(this.IMAGES_SHOCK);
        else if (this.isSlapping) { }
        else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT ||
                 this.world.keyboard.UP || this.world.keyboard.DOWN)
          this.playAnimation(this.IMAGES_SWIMMING);
        else if (elapsed > 10000 && !this.isSleeping) this.playLongIdleAnimation();
        else if (this.isSleeping) this.playAnimation(this.IMAGES_LONG_IDLE_SLEEP);
        else this.playAnimation(this.IMAGES_IDLE);
      }, 80);
    }
  
    /**
     * Plays the long idle animation. If the animation sequence finishes,
     * sets the character to sleeping mode.
     */
    playLongIdleAnimation() {
      if (this.longIdleIndex < this.IMAGES_LONG_IDLE.length) {
        this.playAnimationFrame(this.IMAGES_LONG_IDLE, this.longIdleIndex);
        this.longIdleIndex++;
      } else {
        this.isSleeping = true;
        this.longIdleIndex = 0;
      }
    }
  
    /**
     * Plays a single frame from the given animation sequence.
     * @param {string[]} images - Array of image paths.
     * @param {number} index - Index of the frame to display.
     */
    playAnimationFrame(images, index) {
      this.img = this.imageCache[images[index]];
    }
  
    /**
     * Resets the sleeping state of the character.
     */
    resetSleepingState() {
      this.lastActionTime = Date.now();
      this.isSleeping = false;
      this.longIdleIndex = 0;
    }
  
    /**
     * Executes the slap (attack) animation if possible.
     */
    slap() {
      let now = Date.now();
      if (now - this.lastSlapTime > this.slapCooldown && !this.isSlapping) {
        this.isSlapping = true;
        this.lastSlapTime = now;
        let slapIndex = 0;
        let slapInterval = setInterval(() => {
          if (slapIndex < this.IMAGES_SLAP.length) {
            this.img = this.imageCache[this.IMAGES_SLAP[slapIndex]];
            slapIndex++;
          } else {
            clearInterval(slapInterval);
            this.isSlapping = false;
          }
        }, 30);
      }
    }
  
    /**
     * Records the last hit type and timestamp.
     * @param {string} type - The type of hit ('poison', 'shock', etc.).
     */
    setLastHitType(type) {
      this.lastHit = Date.now();
      this.lastHitType = type;
    }
  
    /**
     * Plays the death sound.
     */
    playDeathSound() {
      this.death_sound.play();
    }
  
    /**
     * Plays the bubble animation.
     */
    playBubbleAnimation() {
      this.playAnimationOnce(this.IMAGES_BUBBLE);
    }
  
    /**
     * Plays the poison bubble animation.
     */
    playPoisonBubbleAnimation() {
      this.playAnimationOnce(this.IMAGES_POISON_BUBBLE);
    }
  
    /**
     * Checks if the character is dead.
     * @returns {boolean} True if dead, false otherwise.
     */
    afterDeathNone() {
      return this.isDead();
    }
  
    /**
     * Plays the winning sound.
     */
    playWinningSound() {
      this.winning_sound.volume = 0.7;
      this.winning_sound.play();
    }
  
    /**
     * Initiates the death animation and ends the game.
     */
    die() {
      if (!this.hasPlayedDeathAnimation) {
        this.hasPlayedDeathAnimation = true;
        let i = 0;
        const deathAnimationInterval = setInterval(() => {
          if (i < this.IMAGES_DEAD.length) {
            this.img = this.imageCache[this.IMAGES_DEAD[i]];
            i++;
          } else {
            clearInterval(deathAnimationInterval);
            this.world.showGameOverScreen();
            this.world.stopGame();
          }
        }, 80);
      }
    }
  }