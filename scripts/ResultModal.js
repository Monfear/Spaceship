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
        this.btnMenu = this.getElement(this.elementsOfDOM.btnMenu);
        this.btnExit2 = this.getElement(this.elementsOfDOM.btnExit2);
        this.btnLeaderBoard = this.getElement(this.elementsOfDOM.btnLeaderboard);
    }

    setupListeners() {
        this.btnMenu.addEventListener("click", () => location.reload());
        this.btnExit2.addEventListener("click", () => window.close());
        this.btnLeaderBoard.addEventListener("click", () => console.log("leaderboard"));
    }
}
