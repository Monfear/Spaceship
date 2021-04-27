import { Common } from "./Common.js";
import { Bullet } from "./Bullet.js";
import { Barrier } from "./Barrier.js";

export class Spaceship extends Common {
    constructor(area) {
        super();

        this.area = area;
        this.element = this.getElement(this.elementsOfDOM.spaceship);
    }

    isArrowLeft = false;
    isArrowRight = false;
    isBarrier = false;

    moveStep = 10;
    bullets = [];

    lives = 3;
    shields = 1;

    // audioShot = this.audioElements.shot;

    init() {
        this.connectDOM();

        this.setupListeners();

        this.setStartResistance();
        this.setStartPosition();
        this.updatePositionLoop();
    }

    connectDOM() {
        this.hpBar = this.getElement(this.elementsOfDOM.hpBar);
        this.armorBar = this.getElement(this.elementsOfDOM.armorBar);
    }

    setupListeners() {
        // window.addEventListener("keydown", (e) => this.keydownActions(e));
        // window.addEventListener("keyup", (e) => this.keyupActions(e));

        this.keydownActionsRefer = this.keydownActions;
        this.keyupActionsRefer = this.keyupActions;

        window.addEventListener("keydown", this.keydownActionsRefer);
        window.addEventListener("keyup", this.keyupActionsRefer);
    }

    setStartPosition() {
        this.element.hidden = false;
        this.element.style.bottom = "0px";
        this.element.style.transform = "translateY(255px)"; //55
        this.element.style.left = `${window.innerWidth / 2 - this.getCurrentPosition()}px`;
    }

    setStartResistance() {
        for (let i = this.lives; i > 0; i--) {
            let hpItem = document.createElement("div");
            hpItem.classList.add("battle-screen__hp");
            this.hpBar.append(hpItem);
        }

        for (let i = this.shields; i > 0; i--) {
            let shieldItem = document.createElement("div");
            shieldItem.classList.add("battle-screen__armor");
            this.armorBar.append(shieldItem);
        }
    }

    getCurrentPosition() {
        return this.element.offsetLeft + this.element.offsetWidth / 2;
    }

    // actionListeners = () => {
    //     window.addEventListener("keydown", (e) => {
    //         if (e.key === "ArrowLeft") {
    //             this.isArrowLeft = true;
    //         } else if (e.key === "ArrowRight") {
    //             this.isArrowRight = true;
    //         }
    //     });

    //     window.addEventListener("keyup", (e) => {
    //         if (e.key === " ") {
    //             this.executeShot();
    //         }

    //         if (e.key === "Control") {
    //             this.executeBarrier();
    //         }

    //         if (e.key === "ArrowLeft") {
    //             this.isArrowLeft = false;
    //         } else if (e.key === "ArrowRight") {
    //             this.isArrowRight = false;
    //         }
    //     });
    // };

    keydownActions = (e) => {
        if (e.key === "ArrowLeft") {
            this.isArrowLeft = true;
        } else if (e.key === "ArrowRight") {
            this.isArrowRight = true;
        }
    };

    keyupActions = (e) => {
        if (e.key === " ") {
            this.executeShot();
            // this.audioShot.play();
        }

        if (e.key === "Control") {
            this.executeBarrier();
        }

        if (e.key === "ArrowLeft") {
            this.isArrowLeft = false;
        } else if (e.key === "ArrowRight") {
            this.isArrowRight = false;
        }
    };

    updatePositionLoop = () => {
        this.updateMoves();
        requestAnimationFrame(this.updatePositionLoop);
    };

    updateMoves() {
        if (this.isArrowLeft && this.getCurrentPosition() > 30) {
            this.element.style.left = parseInt(this.element.style.left) - this.moveStep + "px";

            if (this.isBarrier) {
                this.barrier.element.style.left = parseInt(this.element.style.left) - this.moveStep * 2.8 + "px";
            }
        } else if (this.isArrowRight && this.getCurrentPosition() < window.innerWidth - 30) {
            this.element.style.left = parseInt(this.element.style.left) + this.moveStep + "px";

            if (this.isBarrier) {
                this.barrier.element.style.left = parseInt(this.element.style.left) + this.moveStep * -2.8 + "px";
            }
        }
    }

    executeShot() {
        const bullet = new Bullet(this.getCurrentPosition(), this.element.offsetTop, this.area);
        bullet.init();
        this.bullets.push(bullet);
    }

    executeBarrier() {
        if (this.isBarrier || this.shields <= 0) {
            return;
        }

        this.shields--;
        this.armorBar.lastChild.remove();

        this.barrier = new Barrier(this.getCurrentPosition(), this.element.offsetTop, this.area);
        this.isBarrier = true;

        this.barrier.init();

        setTimeout(() => {
            this.barrier.delete();

            this.isBarrier = false;
        }, 7000);
    }
}
