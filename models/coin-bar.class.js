class CoinBar extends StatusBar {
    /**
     * Array of image paths for coin statuses.
     * @type {string[]}
     */
    IMAGES_COIN = [
      'img/4. Marcadores/Purple/0_ _1.png',
      'img/4. Marcadores/Purple/20_ .png',
      'img/4. Marcadores/Purple/40_ _1.png',
      'img/4. Marcadores/Purple/60_ _1.png',
      'img/4. Marcadores/Purple/80_ _1.png',
      'img/4. Marcadores/Purple/100__1.png'
    ];
  
    x = 20;
    y = 40;
    totalCoins = 10;
    collectedCoins = 0;
  
    /**
     * Creates a new CoinBar instance.
     * Loads the coin images and initializes the coin bar to 0%.
     */
    constructor() {
      super();
      this.loadImages(this.IMAGES_COIN);
      this.x = 20;
      this.y = 40;
      this.percentageCoin = 0;
      this.setPercentageCoin(0);
    }
  
    /**
     * Increments the collected coin count and updates the coin bar percentage.
     */
    coinCollected() {
      this.collectedCoins++;
      let percentage = (this.collectedCoins / this.totalCoins) * 100;
      if (percentage > 100) {
        percentage = 100;
      }
      this.setPercentageCoin(percentage);
    }
  
    /**
     * Sets the coin bar percentage and updates the displayed image accordingly.
     * @param {number} percentage - The new coin percentage (0-100).
     */
    setPercentageCoin(percentage) {
      this.percentageCoin = percentage;
      let imagePath = this.IMAGES_COIN[this.resolveImageIndex()];
      this.img = this.imageCache[imagePath];
    }
  
    /**
     * Determines the correct image index based on the current coin percentage.
     * @returns {number} The index of the image to be displayed.
     */
    resolveImageIndex() {
      if (this.percentageCoin == 100) {
        return 5;
      } else if (this.percentageCoin > 80) {
        return 4;
      } else if (this.percentageCoin > 60) {
        return 3;
      } else if (this.percentageCoin > 40) {
        return 2;
      } else if (this.percentageCoin > 20) {
        return 1;
      } else {
        return 0;
      }
    }
  }