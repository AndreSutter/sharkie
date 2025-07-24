class Light extends MovableObject {
    x = 0;
    y = 0;
    width = 800;
    height = 200;
  
    /**
     * Creates a new Light instance, loads its image, and starts its animation.
     */
    constructor() {
      super().loadImage('img/3. Background/Layers/1. Light/1.png');
      this.animate();
    }
  
      /**
     * This method is required but intentionally left empty.
     * The Light object does not require animations, but
     * the method is defined to prevent errors.
     */
      animate() {
    }
  }
  