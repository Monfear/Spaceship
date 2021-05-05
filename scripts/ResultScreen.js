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
        this.inputName = this.getElement(this.elementsOfDOM.inputName);
        this.form = this.getElement(this.elementsOfDOM.formLeaderBoard);
    }

    setupListeners() {
        this.btnLeaderBoard.addEventListener("click", this.addPlayer);
    }

    changeToLeaderboard = () => {
        this.element.classList.add("hide");

        const leaderboardScreen = new Leaderboard();
        leaderboardScreen.element.classList.remove("hide");
    };

    addPlayer = (points) => {
        console.log(points);

        const player = {
            name: this.inputName.value,
            points,
        };

        const url = "http://localhost:8000/players";

        fetch(url, {
            method: "POST",
            body: JSON.stringify(player),
            headers: { "Content-Type": "application/json" },
        });
    };

    // addPlayer = async (points) => {
    //     console.log(points);
    //     const player = {
    //         name: this.inputName.value,
    //         points,
    //     };

    //     const url = "http://localhost:8000/players";

    //     try {
    //         await fetch(url, {
    //             method: "POST",
    //             body: JSON.stringify(player),
    //             headers: { "Content-Type": "application/json" },
    //         });
    //     } catch (err) {
    //         console.log(errr);
    //     }
    // };
}
