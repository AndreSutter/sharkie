class StatusBar extends DrawableObject {
    
    IMAGES_LIFE = [
      'img/4. Marcadores/Purple/0_ .png',
      'img/4. Marcadores/Purple/20__1.png',
      'img/4. Marcadores/Purple/40_ .png',
      'img/4. Marcadores/Purple/60_ .png',
      'img/4. Marcadores/Purple/80_ .png',
      'img/4. Marcadores/Purple/100_ .png'
    ];
  
    percentage = 100;
  
    /**
     * Creates a new StatusBar instance, loads life images, sets position and dimensions, and initializes the percentage.
     */
    constructor() {
      super();
      this.loadImages(this.IMAGES_LIFE);
      this.x = 20;
      this.y = 0;
      this.width = 200;
      this.height = 60;
      this.setPercentage(100);
    }
  
    /**
     * Sets the life percentage and updates the displayed image.
     * @param {number} percentage - The new life percentage (0-100).
     */
    setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.IMAGES_LIFE[this.resolveImageIndex()];
      this.img = this.imageCache[path];
    }
  
    /**
     * Determines the appropriate image index based on the current life percentage.
     * @returns {number} The index of the image to display.
     */
    resolveImageIndex() {
      if (this.percentage == 100) {
        return 5;
      } else if (this.percentage > 80) {
        return 4;
      } else if (this.percentage > 60) {
        return 3;
      } else if (this.percentage > 40) {
        return 2;
      } else if (this.percentage > 20) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  
