import { Common } from "./Common.js";
import { Spaceship } from "./Spaceship.js";

export class Game extends Common {
    constructor() {
        super();

        this.init();
    }

    points = 0;

    init() {
        this.connectDOM();
        // this.setupListeners();

        this.countToStart();
    }

    connectDOM() {
        this.battleScreen = this.getElement(this.elementsOfDOM.battleScreen);
        this.counter = this.getElement(this.elementsOfDOM.counter);
        this.info = this.getElement(this.elementsOfDOM.info);
        this.score = this.getElement(this.elementsOfDOM.score);
        this.life = this.getElement(this.elementsOfDOM.life);
        this.scoreNumberEl = this.getElement(this.elementsOfDOM.scoreNumber);
    }

    setupListeners() {}

    countToStart() {
        const audio = new Audio("./audio/battle.wav");
        audio.playbackRate = 0.9;
        // audio.play();

        let number = 5;

        let interval = setInterval(() => {
            this.counter.animate(
                [
                    {
                        opacity: 0,
                        transform: "scale(0) translate(-50%, -50%)",
                    },
                    {
                        opacity: 1,
                        transform: "scale(1) translate(-50%, -50%)",
                    },
                ],
                {
                    duration: 1000,
                    iterations: Infinity,
                }
            );
            this.counter.innerText = number;
            number--;

            if (number < 0) {
                clearInterval(interval);

                this.counter.innerText = "Start";

                setTimeout(() => {
                    this.counter.style.display = "none";

                    audio.pause();
                    this.play();
                }, 2000);
            }
        }, 1000);

        this.setStartStructure();
    }

    setStartStructure() {
        this.spaceship = new Spaceship(this.battleScreen);
        this.spaceship.init();

        this.points = 0;
        this.scoreNumberEl.innerText = this.points;
    }

    play() {
        this.spaceship.element.style.transform = "translateY(55px)";
        this.spaceship.actionListeners();

        // this.spaceship.updateMoves();
        // this.spaceship.updatePositionLoop();

        this.info.style.opacity = 1;
    }
}
