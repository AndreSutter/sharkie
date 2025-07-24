class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 100;
    lastHit = 0;
  
    offset = {
      top: 30,
      bottom: 20,
      left: 50,
      right: 50
    };
  
    /**
     * Determines if the object is above ground.
     * @returns {boolean} True if the object is above ground.
     */
    isAboveGround() {
      return this instanceof ThrowableObject || this.y < 180;
    }
  
    /**
     * Checks collision with another movable object based on its type.
     * @param {MovableObject} mo - The object to check collision against.
     * @returns {boolean} True if a collision is detected.
     */
    isColliding(mo) {
      if (mo instanceof Endboss) {
        return this.isEndbossColliding(mo);
      } else if (this instanceof Character) {
        return this.isCharacterColliding(mo);
      } else if (this instanceof PoisonFishes || this instanceof PoisonFatFishes) {
        return this.isPoisonColliding(mo);
      } else {
        return this.isDefaultColliding(mo);
      }
    }
  
    /**
     * Checks collision with an endboss object using specific offsets.
     * @param {MovableObject} mo - The endboss object.
     * @returns {boolean} True if a collision is detected.
     */
    isEndbossColliding(mo) {
      const endbossOffset = { top: 160, bottom: 60, left: 70, right: 50 };
      return (
        this.x + this.offset.left + this.width - this.offset.right > mo.x + endbossOffset.left &&
        this.y + this.offset.top + this.height - this.offset.bottom > mo.y + endbossOffset.top &&
        this.x + this.offset.left < mo.x + mo.width - endbossOffset.right &&
        this.y + this.offset.top < mo.y + mo.height - endbossOffset.bottom
      );
    }
  
    /**
     * Checks collision with a character using specific offsets.
     * @param {MovableObject} mo - The character object.
     * @returns {boolean} True if a collision is detected.
     */
    isCharacterColliding(mo) {
      const offsetX = 50;
      const offsetY = 130;
      return (
        this.x + offsetX + this.width - 2 * offsetX > mo.x &&
        this.y + offsetY + this.height - 1.4 * offsetY > mo.y &&
        this.x + offsetX < mo.x + mo.width &&
        this.y + offsetY < mo.y + mo.height
      );
    }
  
    /**
     * Checks collision with poison enemy objects using specific offsets.
     * @param {MovableObject} mo - The poison enemy object.
     * @returns {boolean} True if a collision is detected.
     */
    isPoisonColliding(mo) {
      const offsetX = 60;
      const offsetY = 10;
      return (
        this.x + offsetX + this.width - 2.1 * offsetX > mo.x &&
        this.y + offsetY + this.height - 3.2 * offsetY > mo.y &&
        this.x + offsetX < mo.x + mo.width &&
        this.y + offsetY < mo.y + mo.height
      );
    }
  
    /**
     * Checks collision with a generic object using default bounds.
     * @param {MovableObject} mo - The object to check against.
     * @returns {boolean} True if a collision is detected.
     */
    isDefaultColliding(mo) {
      return (
        this.x + this.width > mo.x &&
        this.y + this.height > mo.y &&
        this.x < mo.x + mo.width &&
        this.y < mo.y + mo.height
      );
    }
  
    /**
     * Applies a hit to the object, reducing energy and playing the death sound if energy drops below zero.
     */
    hit() {
      this.energy -= 5;
      if (this.energy < 0) {
        this.energy = 0;
        this.playDeathSound();
      } else {
        this.lastHit = new Date().getTime();
      }
    }
  
    /**
     * Checks if the object is in a poison-hit state.
     * @returns {boolean} True if the object is affected by poison.
     */
    isPoison() {
      let timepassed = new Date().getTime() - this.lastHit;
      return this.lastHitType === 'poison' && timepassed / 1000 < 0.2;
    }
  
    /**
     * Checks if the object is in a shock-hit state.
     * @returns {boolean} True if the object is affected by shock.
     */
    isShock() {
      let timepassed = new Date().getTime() - this.lastHit;
      return this.lastHitType === 'shock' && timepassed / 1000 < 0.2;
    }
  
    /**
     * Determines if the object is dead.
     * @returns {boolean} True if energy is zero.
     */
    isDead() {
      return this.energy == 0;
    }
  
    /**
     * Plays a looping animation using the provided image array.
     * @param {string[]} images - Array of image paths.
     */
    playAnimation(images) {
      let i = this.currentImage % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  
    /**
     * Plays an animation once using the provided image array.
     * @param {string[]} images - Array of image paths.
     */
    playAnimationOnce(images) {
      let i = 0;
      let animationInterval = setInterval(() => {
        if (i < images.length) {
          this.img = this.imageCache[images[i]];
          i++;
        } else {
          clearInterval(animationInterval);
        }
      }, 15);
    }
  
    /**
     * Moves the object to the right.
     */
    moveRight() {
      this.x += this.speed;
    }
  
    /**
     * Moves the object to the left.
     */
    moveLeft() {
      this.x -= this.speed;
    }
  
    /**
     * Moves the object upward.
     */
    moveUp() {
      this.y -= this.speed;
    }
  
    /**
     * Moves the object downward.
     */
    moveDown() {
      this.y += this.speed;
    }
  }
  