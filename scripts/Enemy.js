// import { audioElements } from "./audio.js";
import { Common } from "./Common.js";

export class Enemy extends Common {
    constructor(area, intervalTime, enemyClass, explosionClass, lives, points) {
        super();

        this.area = area;
        this.intervalTime = intervalTime;
        this.enemyClass = enemyClass;
        this.explosionClass = explosionClass;
        this.lives = lives;
        this.points = points;

        this.element = document.createElement("div");
        this.interval = null;

        // this.audioExplosion = new Audio("./audio/Explosion.wav");
        // this.audioHit = new Audio("./audio/LowBassHit.wav");
    }

    init() {
        this.createUnit();
        this.updatePosition();
    }

    createUnit() {
        this.element.classList.add(this.enemyClass);
        this.area.append(this.element);
        this.element.style.top = -this.element.offsetHeight / 2 + "px";
        this.element.style.left = this.setRandomPosition() + "px";
    }

    setRandomPosition() {
        return Math.floor(Math.random() * (window.innerWidth - this.element.offsetWidth));
    }

    updatePosition() {
        this.interval = setInterval(() => {
            this.element.style.top = this.element.offsetTop + 1 + "px";
        }, this.intervalTime);
    }

    getDamaged() {
        // this.audioHit.play();
        // this.audioHit.volume = 0.3;
        // this.audioElements.hit.volume = 0.3;
        // this.audioElements.hit.play();

        this.lives--;

        if (!this.lives) {
            this.makeExplosion();
        }
    }

    makeExplosion() {
        // this.audioExplosion.play();
        this.audioElements.explosion.play();
        // audioElements.explosion.play();
        clearInterval(this.interval);

        this.element.classList.remove(this.enemyClass);
        this.element.classList.add(this.explosionClass);

        setTimeout(() => {
            this.element.remove();
        }, 800);
    }
}
