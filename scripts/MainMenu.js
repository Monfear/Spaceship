import { Common } from "./Common.js";

class MainMenu extends Common {
    constructor() {
        super();

        this.init();
    }

    init() {
        this.connectDOM();
        this.setupListeners();

        this.playStartedSound();
    }

    connectDOM() {
        this.audioStartScreen = this.getElement(this.elementsOfDOM.audioStartScreen);
    }

    setupListeners() {}

    playStartedSound() {
        // this.audioStartScreen.autoplay = "true";
        // this.audioStartScreen.muted = true;
        // this.audioStartScreen.play();
        // this.audioStartScreen.muted = false;

        console.log(this.audioStartScreen);
    }
}

export const mainMenu = new MainMenu();
