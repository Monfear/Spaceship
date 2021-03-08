import { Common } from "./Common.js";

class MainMenu extends Common {
    constructor() {
        super();

        this.init();
    }

    init() {
        this.connectDOM();
        this.setupListeners();
    }

    connectDOM() {
        this.startScreen = this.getElement(this.elementsOfDOM.startScreen);

        this.btnSound = this.getElement(this.elementsOfDOM.btnSound);
        this.divSoundLine = this.getElement(this.elementsOfDOM.divSoundLine);
        this.audioStarted = this.getElement(this.elementsOfDOM.audioStartScreen);

        this.btnStart = this.getElement(this.elementsOfDOM.btnStart);
        this.btnExit = this.getElement(this.elementsOfDOM.btnExit);
    }

    setupListeners() {
        this.pauseStartedSoundRefer = this.pauseStartedSound.bind(this);
        this.playStartedSoundRefer = this.playStartedSound.bind(this);
        this.btnSound.addEventListener("click", this.playStartedSoundRefer);

        this.btnExit.addEventListener("click", () => this.exitGame());
        this.btnStart.addEventListener("click", () => this.startGame());
    }

    playStartedSound() {
        this.divSoundLine.classList.add("hide");
        this.audioStarted.play();

        this.btnSound.removeEventListener("click", this.playStartedSoundRefer);
        this.btnSound.addEventListener("click", this.pauseStartedSoundRefer);
    }

    pauseStartedSound() {
        this.divSoundLine.classList.remove("hide");
        this.audioStarted.pause();

        this.btnSound.removeEventListener("click", this.pauseStartedSoundRefer);
        this.btnSound.addEventListener("click", this.playStartedSoundRefer);
    }

    startGame() {
        this.startScreen.style.opacity = 1;
        let opacity = 1;

        const interval = setInterval(() => {
            opacity -= 0.2;
            this.startScreen.style.opacity = opacity;

            if (opacity < 0) {
                clearInterval(interval);
                this.startScreen.remove();
            }
        }, 500);
    }

    exitGame() {
        window.close();
    }
}

export const mainMenu = new MainMenu();
