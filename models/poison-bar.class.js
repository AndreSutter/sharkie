class PoisonBar extends StatusBar {
    
    IMAGES_POISON = [
      'img/4. Marcadores/Purple/0_.png',
      'img/4. Marcadores/Purple/20_.png',
      'img/4. Marcadores/Purple/40_.png',
      'img/4. Marcadores/Purple/60_.png',
      'img/4. Marcadores/Purple/80_.png',
      'img/4. Marcadores/Purple/100_.png'
    ];
  
    x = 20;
    y = 80;
    percentagePoison = 10;
  
    /**
     * Creates a new PoisonBar instance.
     * Loads the poison images, sets the position, and initializes the percentage to 0.
     */
    constructor() {
      super();
      this.loadImages(this.IMAGES_POISON);
      this.x = 20;
      this.y = 80;
      this.setPercentagePoison(0);
    }
  
    /**
     * Sets the poison percentage and updates the displayed image accordingly.
     * @param {number} percentage - The new poison percentage (0-100).
     */
    setPercentagePoison(percentage) {
      this.percentagePoison = percentage;
      let path = this.IMAGES_POISON[this.resolveImageIndex()];
      this.img = this.imageCache[path];
    }
  
    /**
     * Determines the correct image index based on the current poison percentage.
     * @returns {number} The index of the image to display.
     */
    resolveImageIndex() {
      if (this.percentagePoison == 100) {
        return 5;
      } else if (this.percentagePoison > 80) {
        return 4;
      } else if (this.percentagePoison > 60) {
        return 3;
      } else if (this.percentagePoison > 40) {
        return 2;
      } else if (this.percentagePoison > 20) {
        return 1;
      } else {
        return 0;
      }
    }
  
    /**
     * Increments the poison percentage when poison is collected and updates the bar.
     */
    poisonCollected() {
      this.percentagePoison += 20;
      if (this.percentagePoison > 100) {
        this.percentagePoison = 100;
      }
      this.setPercentagePoison(this.percentagePoison);
    }
  
    /**
     * Decrements the poison percentage when poison is thrown and updates the bar.
     */
    poisonThrown() {
      this.percentagePoison -= 20;
      if (this.percentagePoison < 0) {
        this.percentagePoison = 0;
      }
      this.setPercentagePoison(this.percentagePoison);
    }
  }
  