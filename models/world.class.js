class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    poisonBar = new PoisonBar();
    coinBar = new CoinBar();
    endbossStatusBar = new EndbossStatusBar();
    throwableObjects = [];
    coins = [];
    poisonBottles = [];
    backgroundMusic = new Audio('audio/sharkie.mp3');
    endboss;
    canShootBubble = true;
    lastBubbleTime = 0;
    bubbleCooldown = 300;
    lastPoisonBubbleTime = 0;
    poisonBubbleCooldown = 1000;
    animationFrame;
  
    /**
     * Initializes the world with the given canvas and keyboard.
     * @param {HTMLCanvasElement} canvas 
     * @param {Keyboard} keyboard 
     */
    constructor(canvas, keyboard) {
      this.ctx = canvas.getContext('2d');
      this.canvas = canvas;
      this.keyboard = keyboard;
      this.playBackgroundMusic();
      this.setWorld();
      this.draw();
      this.checkCollisions();
      this.run();
    }
  
    /** Plays background music. */
    playBackgroundMusic() {
      this.backgroundMusic.loop = true;
      this.backgroundMusic.volume = 0.5;
      document.addEventListener(
        'click',
        () => {
          if (isSoundOn && this.backgroundMusic.paused) {
            this.backgroundMusic.play().catch(error =>
              console.warn("Autoplay prevented:", error)
            );
          }
        },
        { once: true }
      );
    }
  
    /** Sets the world for game objects. */
    setWorld() {
      this.character.world = this;
      this.endboss = this.level.enemies.find(e => e instanceof Endboss);
      if (this.endboss) {
        this.endboss.world = this;
      }
    }
  
    /** Periodically checks collisions. */
    run() {
      setInterval(() => this.checkCollisions(), 200);
    }
  
    /** Shoots a bubble from the character. */
    shootBubble() {
      let offsetX = this.character.otherDirection ? 10 : 180;
      let bubble = new ThrowableObject(this.character.x + offsetX, this.character.y + 100);
      bubble.speed = 7;
      bubble.otherDirection = this.character.otherDirection;
      this.throwableObjects.push(bubble);
      this.character.bubble_sound.play();
      this.character.playBubbleAnimation();
    }
  
    /** Shoots a poison bubble if available. */
    shootPoisonBubble() {
      let now = Date.now();
      if (now - this.lastPoisonBubbleTime < this.poisonBubbleCooldown) return;
      let offsetX = this.character.otherDirection ? 10 : 180;
      let poisonBubble = new PoisonBubble(this.character.x + offsetX, this.character.y + 100);
      poisonBubble.speed = 5;
      poisonBubble.otherDirection = this.character.otherDirection;
      this.throwableObjects.push(poisonBubble);
      this.character.poisonBottles--;
      this.poisonBar.setPercentagePoison(this.character.poisonBottles * 20);
      this.character.bubble_sound.play();
      this.character.playPoisonBubbleAnimation();
      this.lastPoisonBubbleTime = now;
    }
  
    /** Checks collisions between all game objects. */
    checkCollisions() {
      this.checkEnemyCollisions();
      this.checkBubbleCollisions();
      this.checkCoinCollisions();
      this.checkPoisonBottleCollisions();
    }
  
    /** Checks collisions with enemies. */
    checkEnemyCollisions() {
      this.level.enemies.forEach(enemy => {
        if (!enemy.isDead) {
          if (enemy instanceof PoisonFishes || enemy instanceof PoisonFatFishes) {
            this.poisonEnemyCollision(enemy);
          } else if (enemy instanceof Endboss) {
            this.endbossCollision(enemy);
          } else if (enemy instanceof YellowJellyFishes || enemy instanceof LilaJellyFishes) {
            this.jellyfishCollision(enemy);
          }
        }
      });
    }
  
    /** Handles collision with poison enemies. */
    poisonEnemyCollision(enemy) {
      if (this.character.isSlapping && this.isInSlapRange(this.character, enemy)) {
        enemy.die();
      } else if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        this.character.setLastHitType('poison');
        this.character.poison_sound.play();
      }
    }
  
    /** Handles collision with the endboss. */
    endbossCollision(enemy) {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        this.character.setLastHitType('poison');
        this.character.poison_sound.play();
      }
    }
  
    /** Handles collision with jellyfish enemies. */
    jellyfishCollision(enemy) {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        this.character.setLastHitType('shock');
        this.character.shock_sound.play();
      }
    }
  
    /** Checks collisions with throwable objects (bubbles). */
    checkBubbleCollisions() {
      this.throwableObjects.forEach((bubble, bubbleIndex) => {
        this.level.enemies.forEach(enemy => {
          if ((enemy instanceof YellowJellyFishes || enemy instanceof LilaJellyFishes) &&
              bubble.isColliding(enemy)) {
            enemy.die();
            this.throwableObjects.splice(bubbleIndex, 1);
          }
        });
        if (this.endboss && bubble.isColliding(this.endboss)) {
          if (bubble instanceof PoisonBubble) {
            this.endboss.takeDamage(25);
            this.endbossStatusBar.setPercentageBoss(this.endboss.energy);
            this.throwableObjects.splice(bubbleIndex, 1);
          }
        }
      });
    }
  
    /** Checks collisions with coins. */
    checkCoinCollisions() {
      this.level.coins.forEach((coin, index) => {
        if (this.character.isColliding(coin) && !coin.isCollected) {
          coin.collect();
          this.coinBar.coinCollected();
          this.character.coin_collect_sound.play();
          this.level.coins.splice(index, 1);
        }
      });
    }
  
    /** Checks collisions with poison bottles. */
    checkPoisonBottleCollisions() {
      this.level.poisonBottles.forEach((bottle, index) => {
        if (this.character.isColliding(bottle) && !bottle.isCollected) {
          bottle.collect();
          this.character.poisonBottles++;
          this.poisonBar.setPercentagePoison(this.character.poisonBottles * 20);
          this.character.bottle_collect_sound.play();
          this.level.poisonBottles.splice(index, 1);
        }
      });
    }
  
    /** Returns the slap range of the character. */
    getSlapRange(character) {
      const slapRangeXRight = 120, slapRangeXLeft = 50, offsetX = 100, offsetY = 140;
      let slapStartX, slapEndX;
      if (character.otherDirection) {
        slapStartX = character.x - slapRangeXLeft;
        slapEndX = character.x + character.width - offsetX;
      } else {
        slapStartX = character.x + offsetX;
        slapEndX = slapStartX + (character.width - 2 * offsetX + slapRangeXRight);
      }
      const slapStartY = character.y + offsetY / 1.3;
      const slapEndY = slapStartY + (character.height - 1.1 * offsetY);
      return { slapStartX, slapEndX, slapStartY, slapEndY };
    }
  
    /** Checks if the enemy is within the character's slap range. */
    isInSlapRange(character, enemy) {
      const { slapStartX, slapEndX, slapStartY, slapEndY } = this.getSlapRange(character);
      const enemyCenterX = enemy.x + enemy.width / 2;
      const enemyCenterY = enemy.y + enemy.height / 2;
      return (
        enemyCenterX >= slapStartX &&
        enemyCenterX <= slapEndX &&
        enemyCenterY >= slapStartY &&
        enemyCenterY <= slapEndY
      );
    }
  
    /** Draws the entire world and schedules the next frame. */
    draw() {
      this.clearCanvas();
      this.drawBackground();
      this.drawHUD();
      this.drawForeground();
      this.animationFrame = requestAnimationFrame(() => this.draw());
    }
  
    /** Clears the canvas. */
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    /** Draws background objects. */
    drawBackground() {
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.backgroundObjects);
      this.ctx.translate(-this.camera_x, 0);
    }
  
    /** Draws HUD elements (status bar, coin bar, poison bar, etc.). */
    drawHUD() {
      this.addToMap(this.statusBar);
      this.addToMap(this.coinBar);
      this.addToMap(this.poisonBar);
      if (this.endbossStatusBar.visible) {
        this.addToMap(this.endbossStatusBar);
      }
    }
  
    /** Draws foreground elements (light, character, collectibles, enemies, and throwable objects). */
    drawForeground() {
      this.ctx.translate(this.camera_x, 0);
      this.addObjectsToMap(this.level.light);
      this.addToMap(this.character);
      this.addObjectsToMap(this.level.poisonBottles);
      this.addObjectsToMap(this.level.coins);
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.throwableObjects);
      this.drawBubbles();
      this.ctx.translate(-this.camera_x, 0);
    }
  
    /** Draws bubble frames for throwable objects. */
    drawBubbles() {
      this.throwableObjects.forEach(bubble => {
        if (bubble instanceof PoisonBubble) {
          bubble.drawPoisonBubbleFrame(this.ctx);
        } else {
          bubble.drawBubbleFrame(this.ctx);
        }
      });
    }
  
    /** Adds an array of objects to the map. */
    addObjectsToMap(objects) {
      objects.forEach(o => this.addToMap(o));
    }
  
    /** Draws a single object on the canvas. */
    addToMap(mo) {
      if (mo.otherDirection) this.flipImage(mo);
      mo.draw(this.ctx);
      mo.drawFrame(this.ctx);
      if (mo.otherDirection) this.flipImageBack(mo);
    }
  
    /** Flips an object's image horizontally. */
    flipImage(mo) {
      this.ctx.save();
      this.ctx.translate(mo.width, 0);
      this.ctx.scale(-1, 1);
      mo.x = mo.x * -1;
    }
  
    /** Restores an object's image orientation. */
    flipImageBack(mo) {
      mo.x = mo.x * -1;
      this.ctx.restore();
    }
  
    /** Shows the game over screen and displays the try-again button. */
    showGameOverScreen() {
      this.stopGame();
      let gameOverScreen = document.getElementById('game-over-screen');
      gameOverScreen.style.display = 'block';
      this.showTryAgainScreen();
    }
  
/**
 * Displays the try-again and menu buttons when the game ends.
 */
showTryAgainScreen() {
    let tryAgainButton = document.getElementById('try-again-button');
    let menuButton = document.getElementById('menu-button');
    tryAgainButton.style.display = 'block';
    menuButton.style.display = 'block';
  
    tryAgainButton.onclick = () => {
      let gameOverScreen = document.getElementById('game-over-screen');
      let youWinScreen = document.getElementById('you-win-screen');
      gameOverScreen.style.display = 'none';
      youWinScreen.style.display = 'none';
      tryAgainButton.style.display = 'none';
      menuButton.style.display = 'none';
      this.restartGame();
    };
  
    menuButton.onclick = () => {
      this.goToMenu();
    };
  }

/**
 * Displays the win screen when the player wins the game.
 * This function stops the game, displays the "You Win" screen,
 * and also shows the "Try Again" button to restart the game.
 */
showWinScreen() {
  this.stopGame(); // Stops the game logic and animations
  let youWinScreen = document.getElementById('you-win-screen');
  youWinScreen.style.display = 'block'; // Displays the "You Win" screen
  this.showTryAgainScreen(); // Shows the "Try Again" button for replaying
}

  
  /**
   * Returns to the start screen by stopping the game and showing the start screen.
   */
  goToMenu() {
    if (world) {
      world.backgroundMusic.pause(); world.backgroundMusic.currentTime = 0;
      if (world.endboss && world.endboss.bossMusic) { world.endboss.bossMusic.pause(); world.endboss.bossMusic.currentTime = 0; }
      let prevSoundState = isSoundOn; isSoundOn = false;
      world.restartGame();
      document.getElementById('game-over-screen').style.display = 'none';
      document.getElementById('you-win-screen').style.display = 'none';
      document.getElementById('try-again-button').style.display = 'none';
      document.getElementById('menu-button').style.display = 'none';
      document.getElementById('start-screen').style.display = 'block';
      isSoundOn = prevSoundState;
    }
  }
  
  
    /** Stops the game by cancelling animations, pausing sounds, and clearing intervals. */
    stopGame() {
      cancelAnimationFrame(this.animationFrame);
      this.backgroundMusic.pause();
      if (this.endboss && this.endboss.bossMusic) {
        this.endboss.bossMusic.pause();
      }
      if (this.character.swimming_sound) {
        this.character.swimming_sound.pause();
      }
      let highestIntervalId = setInterval(() => {}, 1000);
      for (let i = 0; i < highestIntervalId; i++) {
        clearInterval(i);
      }
      this.keyboard = new Keyboard();
    }
  
    /** Restarts the game by reinitializing the level and world. */
    restartGame() {
      level1 = initLevel1();
      world = new World(canvas, keyboard);
      applySoundSettings();
      updateAllScreens();
    }
  }
  