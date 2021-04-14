export class Survivals {
    constructor(area, itemClass, type, intervalTime) {
        this.area = area;
        this.itemClass = itemClass;
        this.type = type;
        this.intervalTime = intervalTime;

        this.element = document.createElement("div");
        this.interval = null;
    }

    init() {
        this.createItem();
        this.updatePosition();
    }

    createItem() {
        this.element.classList.add(this.itemClass);
        this.area.append(this.element);
        this.element.style.top = -this.element.offsetHeight / 2 + "px";
        this.element.style.left = this.setRandomPosition() + "px";
    }

    updatePosition() {
        this.interval = setInterval(() => {
            this.element.style.top = this.element.offsetTop + 1 + "px";
        }, this.intervalTime);
    }

    setRandomPosition() {
        return Math.floor(Math.random() * (window.innerWidth - this.element.offsetWidth));
    }
}
