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
        backdrop: "[data-backdrop]",
        counter: "[data-counter]",
        hpBar: "[data-hp-bar]",
        armorBar: "[data-armor-bar]",
        spaceship: "[data-spaceship]",
        info: "[data-info]",
        score: "[data-score]",
        life: "[data-life]",
        bullet: "[data-bullet]",
        lvlEl: "[data-lvl]",

        // modal result
        modalResult: "[data-result-modal]",
        finalScore: "[data-final-score]",
        btnMenu: "[data-btn-menu]",
        btnExit2: "[data-btn-exit2]",
        btnLeaderboard: "[data-btn-leaderboard]",

        // modal leaderboard
        modalLeaderboard: "[data-leaderboard-modal]",
        btnMenuLeaderboard: "[data-btn-menu-leaderboard]",
        btnExit2Leaderboard: "[data-btn-exit2-leaderboard]",
    };

    getElement(selector) {
        const elementDOM = document.querySelector(selector);

        if (!elementDOM) {
            throw new Error(`Item not found: ${selector}`);
        }

        return elementDOM;
    }
}
