/**
 * Initializes and returns level 1 of the game.
 *
 * The level is created with arrays of enemies, lights, background objects,
 * coins, and poison bottles.
 *
 * @returns {Level} The initialized level object.
 */
function initLevel1() {
    return new Level(
        [
            new PoisonFishes(),
            new PoisonFishes(),
            new PoisonFishes(),
            new PoisonFishes(),
            new LilaJellyFishes(),
            new LilaJellyFishes(),
            new LilaJellyFishes(),
            new YellowJellyFishes(),
            new YellowJellyFishes(),
            new PoisonFatFishes(),
            new PoisonFatFishes(),
            new PoisonFatFishes(),
            new Endboss()
        ],

        [
            new Light()
        ],

        [
            new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', -720),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', -720),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', -720),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', -720),

            new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 0),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 0),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 0),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 0),

            new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 720),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720),

            new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 720 * 2),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 720 * 2),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 720 * 2),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 720 * 2),

            new BackgroundObject('img/3. Background/Layers/5. Water/D2.png', 720 * 3),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D2.png', 720 * 3),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D2.png', 720 * 3),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D2.png', 720 * 3),

            new BackgroundObject('img/3. Background/Layers/5. Water/D1.png', 720 * 4),
            new BackgroundObject('img/3. Background/Layers/4.Fondo 2/D1.png', 720 * 4),
            new BackgroundObject('img/3. Background/Layers/3.Fondo 1/D1.png', 720 * 4),
            new BackgroundObject('img/3. Background/Layers/2. Floor/D1.png', 720 * 4)
        ],

        [
            new Coin(500, 200),
            new Coin(560, 240),
            new Coin(600, 200),
            new Coin(640, 240),
            new Coin(680, 200),

            new Coin(900, 150),
            new Coin(960, 190),

            new Coin(1300, 250),
            new Coin(1360, 290),
            new Coin(1400, 250)
        ],

        [
            new PoisonBottle(500, 400),
            new PoisonBottle(900, 400),
            new PoisonBottle(1100, 400),
            new PoisonBottle(1500, 400),
            new PoisonBottle(1800, 400)
        ]
    );
}

/**
 * Global level1 variable, initialized as level 1 of the game.
 * @type {Level}
 */
let level1 = initLevel1();
