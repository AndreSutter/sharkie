class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x = 80;
    y = 250;
    height = 100;
    width = 120;

     /**
   * Loads an image from the specified path.
   * @param {string} path - The path to the image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object onto the given canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws the object's frame based on its type.
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
   */
  drawFrame(ctx) {
    if (this instanceof Character) {
      this.drawCharacterFrame(ctx);
      this.drawSlapRange(ctx, this);
    } else if (this instanceof PoisonFishes || this instanceof PoisonFatFishes) {
      this.drawPoisonFrame(ctx);
    } else if (this instanceof Endboss) {
      this.drawEndbossFrame(ctx);
    } else {
      this.drawDefaultFrame(ctx);
    }
  }

  /**
   * Draws the slap range frame for a character.
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
   * @param {DrawableObject} character - The character object.
   */
  drawSlapRange(ctx, character) {

  }

  /**
   * Draws the character frame.
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
   */
  drawCharacterFrame(ctx) {

  }

  /**
   * Draws the poison frame.
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
   */
  drawPoisonFrame(ctx) {

  }

  /**
   * Draws the endboss frame.
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
   */
  drawEndbossFrame(ctx) {

  }

  /**
   * Draws the default frame.
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
   */
  drawDefaultFrame(ctx) {

  }

  /**
   * Draws the frame for normal bubbles.
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
   */
  drawBubbleFrame(ctx) {
  }

  /**
   * Draws the frame for poison bubbles.
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D context.
   */
  drawPoisonBubbleFrame(ctx) {

  }

  /**
   * Preloads an array of images and stores them in the image cache.
   * @param {string[]} arr - An array of image paths.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}