import { Common } from "./Common.js";
import { Leaderboard } from "./Leaderboard.js";

export class ResultScreen extends Common {
    constructor() {
        super();

        this.init();
    }

    init() {
        this.connectDOM();
        this.setupListeners();
    }

    connectDOM() {
        this.element = this.getElement(this.elementsOfDOM.modalResult);
        this.finalScore = this.getElement(this.elementsOfDOM.finalScore);
        this.btnLeaderBoard = this.getElement(this.elementsOfDOM.btnLeaderboard);
    }

    setupListeners() {
        this.btnLeaderBoard.addEventListener("click", this.changeToLeaderboard);
    }

    changeToLeaderboard = () => {
        this.element.classList.add("hide");

        const leaderboardScreen = new Leaderboard();
        leaderboardScreen.element.classList.remove("hide");
    };
}
