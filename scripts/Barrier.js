export class Barrier {
    constructor(x, y, area) {
        this.x = x;
        this.y = y;
        this.area = area;

        this.element = document.createElement("div");
        this.audio = new Audio("./audio/EnergyShieldActivated.wav");
    }

    init() {
        this.audio.play();

        this.element.classList.add("battle-screen__shield");
        this.area.append(this.element);
        this.element.style.left = this.x - this.element.offsetWidth / 2 - 3.5 + "px";
        this.element.style.top = this.y + "px";
    }

    delete() {
        let opacity = 1;

        const interval = setInterval(() => {
            opacity -= 0.1;
            this.element.style.opacity = opacity;
        }, 100);

        if (opacity < 0) {
            clearInterval(interval);
            this.element.remove();
        }
    }
}
