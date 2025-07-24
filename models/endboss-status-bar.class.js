
class EndbossStatusBar extends StatusBar {
    /**
     * Array of image paths for the boss status bar.
     * @type {string[]}
     */
    IMAGES_BOSS = [
      'img/4. Marcadores/orange/0_  copia.png',
      'img/4. Marcadores/orange/20_ copia 2.png',
      'img/4. Marcadores/orange/40_  copia.png',
      'img/4. Marcadores/orange/60_  copia.png',
      'img/4. Marcadores/orange/80_  copia.png',
      'img/4. Marcadores/orange/100_  copia.png'
    ];
  
    x = 480;
    y = 0;
    percentageBoss = 100;
    visible = false;
  
    /**
     * Creates a new EndbossStatusBar instance.
     */
    constructor() {
      super();
      this.loadImages(this.IMAGES_BOSS);
      this.x = 480;
      this.y = 0;
      this.width = 200;
      this.height = 60;
      this.setPercentageBoss(100);
    }
  
    /**
     * Sets the boss percentage and updates the displayed image accordingly.
     * @param {number} percentage - The new percentage (0-100).
     */
    setPercentageBoss(percentage) {
      this.percentageBoss = percentage;
      let imagePath = this.IMAGES_BOSS[this.resolveImageIndex()];
      this.img = this.imageCache[imagePath];
    }
  
    /**
     * Determines the image index based on the current boss percentage.
     * @returns {number} The index of the image to display.
     */
    resolveImageIndex() {
      if (this.percentageBoss === 100) {
        return 5;
      } else if (this.percentageBoss > 80) {
        return 4;
      } else if (this.percentageBoss > 60) {
        return 3;
      } else if (this.percentageBoss > 40) {
        return 2;
      } else if (this.percentageBoss > 20) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  