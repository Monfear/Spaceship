export class Enemy {
    constructor(area, intervalTime, enemyClass, explosionClass, lives) {
        this.area = area;
        this.intervalTime = intervalTime;
        this.enemyClass = enemyClass;
        this.explosionClass = explosionClass;
        this.lives = lives;

        this.element = document.createElement("div");
        this.interval = null;

        this.audioExplosion = new Audio("./audio/Explosion.wav");
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
            console.log("update position()");
        }, this.intervalTime);
    }

    getDamaged() {
        console.log("damage");
        this.lives--;

        if (!this.lives) {
            this.makeExplosion();
        }
    }

    makeExplosion() {
        this.audioExplosion.play();
        clearInterval(this.interval);

        this.element.classList.remove(this.enemyClass);
        this.element.classList.add(this.explosionClass);

        setTimeout(() => {
            this.element.remove();
        }, 800);
    }
}
