let canvas;
let world;
window.keyboard = new Keyboard();
let isSoundOn = true;


/**
 * Loads sound settings from localStorage and applies them.
 */
function loadSoundSettings() {
    let savedSoundState = localStorage.getItem('soundState');
    if (savedSoundState !== null) {
        isSoundOn = (savedSoundState === 'true');
    }
    applySoundSettings();
}

/**
 * Saves the current sound state to localStorage.
 */
function saveSoundSettings() {
    localStorage.setItem('soundState', isSoundOn);
}

/**
 * Applies sound settings by updating the sound button image,
 * playing/pausing the background music, and muting/unmuting all sounds.
 */
function applySoundSettings() {
    const soundButton = document.getElementById('sound-button');
    if (soundButton) {
        soundButton.src = isSoundOn ? 'img/sound-on.png' : 'img/sound-off.png';
    }
    if (world && world.backgroundMusic) {
        if (isSoundOn) {
            world.backgroundMusic.play();
        } else {
            world.backgroundMusic.pause();
        }
    }
    muteAllSounds(!isSoundOn);
}

/**
 * Toggles the sound on/off and updates the settings.
 */
function toggleSound() {
    isSoundOn = !isSoundOn;
    saveSoundSettings();
    applySoundSettings();
}

window.onload = () => {
    setTimeout(() => {
        toggleMobileControls();
        setupMobileControls();
        setShootControl();
        setSlapControl();
        updateAllScreens();
    }, 100);
};

/**
 * Starts the game by hiding the start screen and initializing the game.
 */
function startGame() {
  let startScreen = document.getElementById('start-screen');
  let canvas = document.getElementById('canvas');
  startScreen.style.display = 'none';
  canvas.style.display = 'block';
  init();
  updateAllScreens();
}


/**
 * Initializes the game: sets up the canvas, creates the game world,
 * and loads sound settings and mobile controls.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    loadSoundSettings();
    setupMobileControls();
    setupTouchControls();
}

/**
 * Sets up touch event listeners for attack and bubble buttons.
 */
function setupTouchControls() {
    document.getElementById('btn-attack').addEventListener('touchstart', handleSlap);
    document.getElementById('btn-bubble').addEventListener('touchstart', handleBubble);
    document.getElementById('btn-bubble').addEventListener('touchend', resetBubbleCooldown);
}

/**
 * Handles the touchstart event for the attack button by triggering a slap.
 */
function handleSlap() {
    console.log('Slap button pressed');
    if (world && world.character) {
        world.character.slap();
    }
}

/**
 * Handles the touchstart event for the bubble button.
 * If poison bottles are available, shoots a poison bubble; otherwise, shoots a normal bubble.
 */
function handleBubble() {
    console.log('Bubble button pressed');
    if (world && world.character && world.canShootBubble) {
        let now = Date.now();
        if (world.character.poisonBottles > 0) {
            world.shootPoisonBubble();
        } else {
            world.shootBubble();
        }
        world.canShootBubble = false;
        world.lastBubbleTime = now;
    }
}

/**
 * Resets the bubble shooting cooldown.
 */
function resetBubbleCooldown() {
    if (world) {
        world.canShootBubble = true;
    }
}

/**
 * Mutes or unmutes all sounds based on the given flag.
 * @param {boolean} mute - Set to true to mute sounds.
 */
function muteAllSounds(mute) {
    if (!world) return;
    let allSounds = [
        world.backgroundMusic,
        world.character?.swimming_sound,
        world.character?.coin_collect_sound,
        world.character?.poison_sound,
        world.character?.shock_sound,
        world.character?.death_sound,
        world.character?.bubble_sound,
        world.character?.bottle_collect_sound,
        world.endboss?.bossMusic 
    ];
    allSounds.forEach(sound => {
        if (sound) {
            sound.muted = mute;
        }
    });
}

/**
 * Updates the style of a given screen element based on the canvas bounding rectangle.
 * @param {string} screenId - The ID of the screen element.
 * @param {DOMRect} rect - The bounding rectangle of the canvas.
 */
function updateScreenStyle(screenId, rect) {
    let screen = document.getElementById(screenId);
    if (screen) {
        screen.style.position = "absolute";
        screen.style.top = rect.top + 'px';
        screen.style.left = rect.left + 'px';
        screen.style.width = rect.width + 'px';
        screen.style.height = rect.height + 'px';
    }
}

/**
 * Updates the style of all screens (start screen, game over screen, etc.) based on the canvas.
 */
function updateAllScreens() {
    let screens = [
        'start-screen',
        'game-over-screen',
        'you-win-screen',
        'try-again-button',
        'instruction-modal',
        'info-modal'
    ];
    let rect = document.getElementById('canvas').getBoundingClientRect();
    screens.forEach(id => updateScreenStyle(id, rect));
}

window.addEventListener('resize', updateAllScreens);

/**
 * Displays the instruction modal.
 */
function showInstructions() {
    let instructionModal = document.getElementById('instruction-modal');
    instructionModal.style.display = 'block';
    updateAllScreens();
}

/**
 * Closes the instruction modal.
 */
function closeInstructions() {
    document.getElementById('instruction-modal').style.display = 'none';
}

/**
 * Displays the information modal.
 */
function showInfo() {
    let infoModal = document.getElementById('info-modal');
    infoModal.style.display = 'block';
    updateAllScreens();
}

/**
 * Closes the information modal.
 */
function closeInfo() {
    document.getElementById('info-modal').style.display = 'none';
}

/**
 * Checks if the current device is mobile.
 * @returns {boolean} True if a mobile device is detected.
 */
function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

/**
 * Toggles the display of mobile controls based on device type or window width.
 */
function toggleMobileControls() {
    const mobileControls = document.getElementById("mobile-controls");
    if (isMobileDevice() || window.innerWidth < 1400) {
        mobileControls.style.display = "flex"; 
    } else {
        mobileControls.style.display = "none"; 
    }
}

/**
 * Adds touch event listeners to a mobile control element.
 * @param {Object} control - The control configuration.
 * @param {string} control.id - The ID of the control element.
 * @param {string} control.key - The keyboard key associated with this control.
 */
function addMobileControlListener(control) {
    let button = document.getElementById(control.id);
    if (!button) return;
    button.addEventListener('touchstart', (e) => {
        e.preventDefault();
        window.keyboard[control.key] = true;
        if (control.key === 'S' && world && world.character.poisonBottles > 0) {
            world.shootPoisonBubble();
        }
    }, { passive: false });
    button.addEventListener('touchend', (e) => {
        e.preventDefault();
        window.keyboard[control.key] = false;
    }, { passive: false });
}

/**
 * Sets up all mobile control elements by adding their event listeners.
 */
function setupMobileControls() {
    const controls = [
        { id: 'btn-left', key: 'LEFT' },
        { id: 'btn-right', key: 'RIGHT' },
        { id: 'btn-up', key: 'UP' },
        { id: 'btn-down', key: 'DOWN' },
        { id: 'btn-attack', key: 'SPACE' },
        { id: 'btn-bubble', key: 'D' },
        { id: 'btn-s', key: 'S' }
    ];
    controls.forEach(control => addMobileControlListener(control));
}


/**
 * Sets up the shooting controls for keydown events.
 */
function setShootControl() {
    window.addEventListener('keydown', (e) => {
        if ((e.key === 'd' || e.key === 'D') && !world.character.afterDeathNone() && world.canShootBubble) {
            let now = Date.now();
            world.shootBubble(); 
            world.canShootBubble = false;
            world.lastBubbleTime = now;
        }
        if ((e.key === 's' || e.key === 'S') && world.character.poisonBottles > 0) {
            world.shootPoisonBubble(); 
        }
    });
    window.addEventListener('keyup', (e) => {
        if (e.key === 'd' || e.key === 'D') {
            world.canShootBubble = true;
        }
    });
}

/**
 * Sets up the slap control for keydown events.
 */
function setSlapControl() {
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !world.character.afterDeathNone()) {
            world.character.slap();
        }
    });
}

window.addEventListener("resize", toggleMobileControls);

window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = true;
    if (e.keyCode == 37) keyboard.LEFT = true;
    if (e.keyCode == 38) keyboard.UP = true;
    if (e.keyCode == 40) keyboard.DOWN = true;
    if (e.keyCode == 32) keyboard.SPACE = true;
    if (e.keyCode == 68) keyboard.D = true;
    if (e.keyCode === 83) keyboard.S = true;
});

window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = false;
    if (e.keyCode == 37) keyboard.LEFT = false;
    if (e.keyCode == 38) keyboard.UP = false;
    if (e.keyCode == 40) keyboard.DOWN = false;
    if (e.keyCode == 32) keyboard.SPACE = false;
    if (e.keyCode == 68) keyboard.D = false;
    if (e.keyCode === 83) keyboard.S = false;
});
