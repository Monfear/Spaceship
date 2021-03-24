export class Common {
    elementsOfDOM = {
        // game
        gameScreen: "[data-game-screen]",
        scoreNumber: "[data-score-number]",

        // main menu
        startScreen: "[data-start-screen]",
        btnStart: "[data-btn-start]",
        btnExit: "[data-btn-exit]",
        audioStartScreen: "[data-start-screen-audio]",
        btnSound: "[data-btn-sound]",
        divSoundLine: "[data-sound-line]",

        // battle area
        battleScreen: "[data-battle-screen]",
        counter: "[data-counter]",
        hpBar: "[data-hp-bar]",
        armorBar: "[data-armor-bar]",
        spaceship: "[data-spaceship]",
        info: "[data-info]",
        score: "[data-score]",
        life: "[data-life]",
        bullet: "[data-bullet]",
        lvlEl: "[data-lvl]",
    };

    getElement(selector) {
        const elementDOM = document.querySelector(selector);

        if (!elementDOM) {
            throw new Error(`Item not found: ${selector}`);
        }

        return elementDOM;
    }
}
