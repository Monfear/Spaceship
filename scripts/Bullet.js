// import { audioElements } from "./audio.js";
import { Common } from "./Common.js";

export class Bullet extends Common {
    constructor(x, y, area) {
        super();

        this.x = x;
        this.y = y;
        this.area = area;

        this.element = document.createElement("div");
        // this.audio = new Audio("./audio/LaserShot.wav");
    }

    intervalShot = null;
    bulletSpeed = 4;
    bulletShift = 1;

    init() {
        // this.audio.play();
        this.audioElements.shot.play();
        // audioElements.shot.play();

        this.element.classList.add("battle-screen__bullet");
        this.area.append(this.element);
        this.element.style.left = this.x - this.element.offsetWidth / 2 + "px";
        this.element.style.top = this.y + this.element.offsetWidth / 3 + "px";

        this.intervalShot = setInterval(() => {
            this.element.style.top = parseInt(this.element.style.top) - this.bulletShift + "px";
        }, this.bulletSpeed);
    }

    delete() {
        clearInterval(this.intervalShot);
        this.element.remove();
    }
}
