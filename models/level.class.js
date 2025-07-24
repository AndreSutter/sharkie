/**
 * Represents a game level with its enemies, lights, background objects, coins, and poison bottles.
 */
class Level {
    enemies;
    light;
    backgroundObjects;
    coins;
    poisonBottles;
    level_end_x = 2880;
    level_end_Y = -100;
    level_start_Y = 280;

    /**
 * Creates a new Level instance with arrays for enemies, light, background objects, coins, and poison bottles.
 */
    constructor(enemies, light, backgroundObjects, coins, poisonBottles) {
        this.enemies = enemies;
        this.light = light;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.poisonBottles = poisonBottles;
    }
}
