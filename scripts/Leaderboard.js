import { Common } from "./Common.js";

export class Leaderboard extends Common {
    constructor() {
        super();

        this.init();
    }

    init() {
        this.connectDOM();
        this.setupListeners();

        console.log(this.btnMenu);
    }

    connectDOM() {
        this.element = this.getElement(this.elementsOfDOM.modalLeaderboard);
        this.btnMenu = this.getElement(this.elementsOfDOM.btnMenuLeaderboard);
        this.btnExit2 = this.getElement(this.elementsOfDOM.btnExit2Leaderboard);
    }

    setupListeners() {
        this.btnMenu.addEventListener("click", () => location.reload());
        this.btnExit2.addEventListener("click", () => window.close());
    }
}
