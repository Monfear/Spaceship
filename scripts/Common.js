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
        timer: "[data-timer]",
        hpBar: "[data-hp-bar]",
        armorBar: "[data-armor-bar]",
        spaceship: "[data-spaceship]",
        info: "[data-info]",
        score: "[data-score]",
        life: "[data-life]",
        bullet: "[data-bullet]",
        lvlEl: "[data-lvl]",
        gameOverEl: "[data-game-over]",

        // modal result
        modalResult: "[data-result-modal]",
        finalScore: "[data-final-score]",
        btnLeaderboard: "[data-btn-leaderboard]",

        // modal leaderboard
        modalLeaderboard: "[data-leaderboard-modal]",
        rank: "[data-rank]",
        formLeaderBoard: "[data-form-leaderboard]",
        inputName: "[data-input-name]",
        btnMenuLeaderboard: "[data-btn-menu-leaderboard]",
        btnExit2Leaderboard: "[data-btn-exit2-leaderboard]",
    };

    audioElements = {
        shot: new Audio("./audio/LaserShot.wav"),
    };

    getElement(selector) {
        const elementDOM = document.querySelector(selector);

        if (!elementDOM) {
            throw new Error(`Item not found: ${selector}`);
        }

        return elementDOM;
    }
}
