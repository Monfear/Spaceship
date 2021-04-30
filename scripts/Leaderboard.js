import { Common } from "./Common.js";

export class Leaderboard extends Common {
    constructor() {
        super();

        this.init();
    }

    init() {
        this.connectDOM();
        this.renderInfo();
        this.setupListeners();
    }

    connectDOM() {
        this.element = this.getElement(this.elementsOfDOM.modalLeaderboard);
        this.rank = this.getElement(this.elementsOfDOM.rank);
        this.btnMenu = this.getElement(this.elementsOfDOM.btnMenuLeaderboard);
        this.btnExit2 = this.getElement(this.elementsOfDOM.btnExit2Leaderboard);
    }

    setupListeners() {
        this.btnMenu.addEventListener("click", () => location.reload());
        this.btnExit2.addEventListener("click", () => window.close());
    }

    renderInfo() {
        // const data = [
        //     {
        //         name: "Patryk",
        //         points: 100,
        //     },
        //     {
        //         name: "Janusz",
        //         points: 100,
        //     },
        //     {
        //         name: "Zenek",
        //         points: 100,
        //     },
        //     {
        //         name: "Grażyna",
        //         points: 100,
        //     },
        //     {
        //         name: "Esmeralda",
        //         points: 100,
        //     },
        // ];

        const url = "http://localhost:8000/players?_sort=points&_order=desc";
        let template = "";

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                data.forEach((player, idx) => {
                    template += `
                <div class='modal-leaderboard__player-name'>
                <h2>${idx + 1}.&nbsp;</h2>
                <h2 data-player-rank>${player.name}&nbsp;</h2>
                <h2 style='margin-left: auto'>&nbsp;&nbsp;<span data-points-rank>${player.points}</span>&nbsp;points</h2>
                </div>
            `;
                });

                this.rank.innerHTML += template;
            });
    }
}
