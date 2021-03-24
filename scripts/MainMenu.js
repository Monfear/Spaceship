import { Common } from "./Common.js";
import { Game } from "./Game.js";

class MainMenu extends Common {
    constructor() {
        super();

        this.init();

        this.clickAudio = new Audio("./audio/AccessNow.wav");
    }

    isMusic = false;

    init() {
        this.connectDOM();
        this.setupListeners();
    }

    connectDOM() {
        this.gameScreen = this.getElement(this.elementsOfDOM.gameScreen);

        this.startScreen = this.getElement(this.elementsOfDOM.startScreen);

        this.btnSound = this.getElement(this.elementsOfDOM.btnSound);
        this.divSoundLine = this.getElement(this.elementsOfDOM.divSoundLine);
        this.audioStarted = this.getElement(this.elementsOfDOM.audioStartScreen);

        this.btnStart = this.getElement(this.elementsOfDOM.btnStart);
        this.btnExit = this.getElement(this.elementsOfDOM.btnExit);

        this.allButtons = document.querySelectorAll("button");
    }

    setupListeners() {
        // this.pauseStartedSoundRefer = this.pauseStartedSound.bind(this);
        // this.playStartedSoundRefer = this.playStartedSound.bind(this);
        // this.btnSound.addEventListener("click", this.playStartedSoundRefer);
        // this.toggleSoundRef = this.toggleSound.bind(this);
        // this.btnSound.addEventListener("click", this.toggleSoundRef);

        this.btnSound.addEventListener("click", this.toggleSound);

        this.btnExit.addEventListener("click", () => this.exitGame());
        this.btnStart.addEventListener("click", () => this.startGame());
    }

    toggleSound = () => {
        if (!this.isMusic) {
            this.isMusic = true;

            this.divSoundLine.classList.add("hide");

            this.audioStarted.play();

            // this.btnSound.removeEventListener("click", this.playStartedSoundRefer);
            // this.btnSound.addEventListener("click", this.pauseStartedSoundRefer);
        } else {
            this.isMusic = false;

            this.divSoundLine.classList.remove("hide");
            this.audioStarted.pause();

            // this.btnSound.removeEventListener("click", this.pauseStartedSoundRefer);
            // this.btnSound.addEventListener("click", this.playStartedSoundRefer);
        }
    };

    // playStartedSound() {
    //     this.divSoundLine.classList.add("hide");
    //     this.audioStarted.play();

    //     this.btnSound.removeEventListener("click", this.playStartedSoundRefer);
    //     this.btnSound.addEventListener("click", this.pauseStartedSoundRefer);
    // }

    // pauseStartedSound() {
    //     this.divSoundLine.classList.remove("hide");
    //     this.audioStarted.pause();

    //     this.btnSound.removeEventListener("click", this.pauseStartedSoundRefer);
    //     this.btnSound.addEventListener("click", this.playStartedSoundRefer);
    // }

    startGame() {
        this.clickAudio.play();

        let opacity = 1;

        const interval = setInterval(() => {
            opacity -= 0.2;
            this.startScreen.style.opacity = opacity;
            this.gameScreen.style.opacity = opacity;

            if (opacity < 0) {
                clearInterval(interval);

                this.startScreen.style.display = "none";

                this.gameScreen.style.backgroundSize = "auto";
                this.gameScreen.style.backgroundImage = "url(img/BG2.gif)";
                this.gameScreen.style.opacity = 1;

                this.audioStarted.pause();

                const game = new Game();
            }
        }, 500);
    }

    exitGame() {
        this.clickAudio.play();
        window.close();
    }
}

export const mainMenu = new MainMenu();
