import { Common } from "./Common.js";

export class ResultModal extends Common {
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
        this.btnLeaderBoard.addEventListener("click", () => console.log("leaderboard"));
    }
}
