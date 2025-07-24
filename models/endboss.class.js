class Endboss extends MovableObject {
    height = 350;
    width = 350;
    y = 0;
    energy = 100;
    isHurt = false;
    isDead = false;
    isAttacking = false;
    hadFirstContact = false;
    world;
  
    /**
     * Array of image paths for the introduction animation.
     * @type {string[]}
     */
    IMAGES_INTRODUCTION = [
      'img/2.Enemy/3 Final Enemy/1.Introduce/1.png',
      'img/2.Enemy/3 Final Enemy/1.Introduce/2.png',
      'img/2.Enemy/3 Final Enemy/1.Introduce/3.png',
      'img/2.Enemy/3 Final Enemy/1.Introduce/4.png',
      'img/2.Enemy/3 Final Enemy/1.Introduce/5.png',
      'img/2.Enemy/3 Final Enemy/1.Introduce/6.png',
      'img/2.Enemy/3 Final Enemy/1.Introduce/7.png',
      'img/2.Enemy/3 Final Enemy/1.Introduce/8.png',
      'img/2.Enemy/3 Final Enemy/1.Introduce/9.png',
      'img/2.Enemy/3 Final Enemy/1.Introduce/10.png'
    ];
  
   
    IMAGES_FLOATING = [
      'img/2.Enemy/3 Final Enemy/2.floating/1.png',
      'img/2.Enemy/3 Final Enemy/2.floating/2.png',
      'img/2.Enemy/3 Final Enemy/2.floating/3.png',
      'img/2.Enemy/3 Final Enemy/2.floating/4.png',
      'img/2.Enemy/3 Final Enemy/2.floating/5.png',
      'img/2.Enemy/3 Final Enemy/2.floating/6.png',
      'img/2.Enemy/3 Final Enemy/2.floating/7.png',
      'img/2.Enemy/3 Final Enemy/2.floating/8.png',
      'img/2.Enemy/3 Final Enemy/2.floating/9.png',
      'img/2.Enemy/3 Final Enemy/2.floating/10.png',
      'img/2.Enemy/3 Final Enemy/2.floating/11.png',
      'img/2.Enemy/3 Final Enemy/2.floating/12.png',
      'img/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];
  
   
    IMAGES_ATTACKING = [
      'img/2.Enemy/3 Final Enemy/Attack/1.png',
      'img/2.Enemy/3 Final Enemy/Attack/2.png',
      'img/2.Enemy/3 Final Enemy/Attack/3.png',
      'img/2.Enemy/3 Final Enemy/Attack/4.png',
      'img/2.Enemy/3 Final Enemy/Attack/5.png',
      'img/2.Enemy/3 Final Enemy/Attack/6.png'
    ];
  
   
    IMAGES_DEAD = [
      'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
      'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
      'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
      'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
      'img/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png'
    ];
  
   
    IMAGES_HURT = [
      'img/2.Enemy/3 Final Enemy/Hurt/1.png',
      'img/2.Enemy/3 Final Enemy/Hurt/2.png',
      'img/2.Enemy/3 Final Enemy/Hurt/3.png',
      'img/2.Enemy/3 Final Enemy/Hurt/4.png'
    ];
  
   
    constructor(world) {
      super().loadImage(this.IMAGES_INTRODUCTION[0]);
      this.world = world;
      this.loadImages(this.IMAGES_INTRODUCTION);
      this.loadImages(this.IMAGES_FLOATING);
      this.loadImages(this.IMAGES_ATTACKING);
      this.loadImages(this.IMAGES_DEAD);
      this.loadImages(this.IMAGES_HURT);
      this.x = 2500;
      this.speedY = 3;
      this.bossMusic = new Audio('audio/boss.mp3');
      this.bossMusic.volume = 0.7;
      this.bossMusicPlayed = false;
      this.animate();
    }
  
    /**
     * Applies damage to the endboss. If energy falls to 0 or below, triggers death.
     * @param {number} amount - The amount of damage to apply.
     */
    takeDamage(amount) {
      if (this.isDead) return;
      this.energy -= amount;
      this.isHurt = true;
      setTimeout(() => {
        this.isHurt = false;
      }, 500);
      if (this.energy <= 0) {
        this.energy = 0;
        this.die();
      }
    }
  
    /**
     * Initiates the death sequence of the endboss, plays death animation, and triggers win screen.
     */
    die() {
      this.isDead = true;
      this.speedY = 0;
      this.world.character.playWinningSound();
      let frameIndex = 0;
      const interval = setInterval(() => {
        if (frameIndex < this.IMAGES_DEAD.length) {
          this.img = this.imageCache[this.IMAGES_DEAD[frameIndex]];
          frameIndex++;
        } else {
          clearInterval(interval);
          this.world.showWinScreen();
        }
      }, 250);
    }
  
    /**
     * Starts the animation loop for the endboss.
     */
    animate() {
      setInterval(() => this.updateAnimation(), 200);
    }
  
    /**
     * Updates the current animation based on the endboss's state.
     */
    updateAnimation() {
      if (this.isDead) return;
      if (this.isHurt) this.updateAnimationHurt();
      else if (this.isCharacterInRange()) this.updateAnimationAttack();
      else if (!this.hadFirstContact) this.updateAnimationIntro();
      else this.updateAnimationFloating();
    }
  
    /**
     * Plays the hurt animation.
     */
    updateAnimationHurt() {
      this.playAnimation(this.IMAGES_HURT);
    }
  
    /**
     * Plays the attack animation and moves the endboss towards the character.
     */
    updateAnimationAttack() {
      this.isAttacking = true;
      this.playAnimation(this.IMAGES_ATTACKING);
      this.moveTowardsCharacter();
    }
  
    /**
     * Plays the introduction animation. When the character's x position exceeds a threshold,
     * marks first contact, displays the endboss status bar, and plays boss music.
     */
    updateAnimationIntro() {
      this.playAnimation(this.IMAGES_INTRODUCTION);
      if (this.world && this.world.character && this.world.character.x > 2050) {
        this.hadFirstContact = true;
        this.world.endbossStatusBar.visible = true;
        this.playBossMusic();
      }
    }
  
    /**
     * Plays the floating animation and moves the endboss towards the character.
     */
    updateAnimationFloating() {
      this.isAttacking = false;
      this.playAnimation(this.IMAGES_FLOATING);
      this.moveTowardsCharacter();
    }
  
    /**
     * Plays the boss music once, pausing the background music during its playback.
     */
    playBossMusic() {
      if (!this.bossMusicPlayed) {
        this.bossMusicPlayed = true;
        this.world.backgroundMusic.pause();
        this.bossMusic.play();
        this.bossMusic.onended = () => {
          this.world.backgroundMusic.play();
        };
      }
    }
  
    /**
     * Checks if the character is within attack range of the endboss.
     * @returns {boolean} True if the character is in range, false otherwise.
     */
    isCharacterInRange() {
      if (!this.world || !this.world.character) return false;
      const distanceX = Math.abs(this.x - this.world.character.x);
      const distanceY = Math.abs(this.y - this.world.character.y);
      return distanceX < 300 && distanceY < 100;
    }
  
    /**
     * Moves the endboss towards the character by updating both horizontal and vertical positions.
     */
    moveTowardsCharacter() {
      this.moveHorizontally();
      this.moveVertically();
    }
  
    /**
     * Moves the endboss horizontally towards the character.
     */
    moveHorizontally() {
      const character = this.world.character;
      const attackSpeed = 45;
      const normalSpeed = 42;
      let speed = this.isAttacking ? attackSpeed : normalSpeed;
      if (this.x > character.x) {
        this.x -= speed;
        this.otherDirection = false;
      } else if (this.x < character.x) {
        this.x += speed;
        this.otherDirection = true;
      }
    }
  
    /**
     * Moves the endboss vertically towards the character.
     */
    moveVertically() {
      const character = this.world.character;
      const verticalSpeed = 24;
      if (this.y < character.y && this.y < 170) {
        this.y += verticalSpeed;
      } else if (this.y > character.y && this.y > -170) {
        this.y -= verticalSpeed;
      }
    }
  }
  