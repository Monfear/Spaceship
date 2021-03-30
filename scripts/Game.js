import { Common } from "./Common.js";
import { Enemy } from "./Enemy.js";
import { Spaceship } from "./Spaceship.js";

export class Game extends Common {
    constructor() {
        super();

        this.init();
    }

    points = 0;
    level = 1;

    enemies = [];
    enemiesSpeedInterval = 30;

    checkPositionsInterval = null;
    checkPositionSpeedInterval = 200;

    enemyType = null;

    init() {
        this.connectDOM();
        // this.setupListeners();

        this.countToStart();
    }

    connectDOM() {
        this.battleScreen = this.getElement(this.elementsOfDOM.battleScreen);
        this.backdrop = this.getElement(this.elementsOfDOM.backdrop);
        this.counter = this.getElement(this.elementsOfDOM.counter);
        this.info = this.getElement(this.elementsOfDOM.info);
        this.score = this.getElement(this.elementsOfDOM.score);
        this.life = this.getElement(this.elementsOfDOM.life);
        this.scoreNumberEl = this.getElement(this.elementsOfDOM.scoreNumber);
        this.lvlEl = this.getElement(this.elementsOfDOM.lvlEl);
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
                    this.setFirstLevel();
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

    setFirstLevel() {
        this.spaceship.element.style.transform = "translateY(55px)";
        this.spaceship.actionListeners();

        // this.spaceship.updateMoves();
        // this.spaceship.updatePositionLoop();

        this.info.style.opacity = 1;
        this.lvlEl.innerText = `Level ${this.level}`;

        this.lvlEl.hidden = false;
        this.lvlEl.animate(
            [
                {
                    opacity: 0,
                    transform: "translate(-50%, -100%)",
                },
                {
                    opacity: 1,
                    transform: "translate(-50%, -50%)",
                },
            ],
            {
                duration: 1000,
                iterations: 1,
            }
        );

        setTimeout(() => {
            this.lvlEl.hidden = true;
            this.playFirstLevel();
        }, 2000);
    }

    playFirstLevel() {
        console.log("play");
        this.drawEnemy();

        this.checkPositionsInterval = setInterval(() => this.checkPositions(), this.checkPositionSpeedInterval);
    }

    drawEnemy() {
        const randomNum = Math.floor(Math.random() * 11) + 1;

        if (randomNum === 11) {
            this.insertEnemy(this.battleScreen, this.enemiesSpeedInterval * 2, "battle-screen__enemy2", "battle-screen__explosion-big", 8);
            this.enemyType = 0;
        } else if (randomNum % 2 === 0) {
            this.insertEnemy(this.battleScreen, this.enemiesSpeedInterval * 1.4, "battle-screen__enemy1", "battle-screen__explosion-small", 3);
            this.enemyType = 1;
        } else {
            this.insertEnemy(this.battleScreen, this.enemiesSpeedInterval, "battle-screen__enemy3", "battle-screen__explosion-small", 1);
            this.enemyType = 2;
        }
    }

    insertEnemy(...attr) {
        const enemy = new Enemy(...attr);
        enemy.init();
        this.enemies.push(enemy);
    }

    checkPositions() {
        console.log("check position");
        this.enemies.forEach((enemy, enemyIdx, enemiesArr) => {
            const enemyCoordinates = {
                top: enemy.element.offsetTop,
                bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
                left: enemy.element.offsetLeft,
                right: enemy.element.offsetLeft + enemy.element.offsetWidth,
            };

            if (enemyCoordinates.bottom - enemy.element.offsetHeight / 2 > window.innerHeight) {
                enemy.makeExplosion();
                enemiesArr.splice(enemyIdx, 1);
                // this.updateLives();
            }

            this.spaceship.bullets.forEach((bullet, bulletIdx, bulletArr) => {
                const bulletCoordinates = {
                    top: bullet.element.offsetTop,
                    bottom: bullet.element.offsetTop + bullet.element.offsetHeight,
                    left: bullet.element.offsetLeft,
                    right: bullet.element.offsetLeft + bullet.element.offsetWidth,
                };

                // if (bulletCoordinates.top <= enemyCoordinates.bottom - enemy.element.offsetHeight / 5 && bulletCoordinates.bottom >= enemyCoordinates.top && bulletCoordinates.right >= enemyCoordinates.left + enemy.element.offsetWidth / 4 && bulletCoordinates.left <= enemyCoordinates.right - enemy.element.offsetWidth / 4) {
                if (bulletCoordinates.top <= enemyCoordinates.bottom - enemy.element.offsetHeight / 5 && bulletCoordinates.right >= enemyCoordinates.left + enemy.element.offsetWidth / 4 && bulletCoordinates.left <= enemyCoordinates.right - enemy.element.offsetWidth / 4) {
                    console.log("trafiony");
                    enemy.getDamaged();

                    if (!enemy.lives) {
                        enemiesArr.splice(enemyIdx, 1);
                        this.updatePoints();
                    }

                    bulletArr.splice(bulletIdx, 1);
                    bullet.element.remove();
                    // this.updateScore();
                }
            });
        });

        this.spaceship.bullets.forEach((bullet, bulletIdx, bulletArr) => {
            if (bullet.element.offsetTop + bullet.element.offsetHeight < 0) {
                console.log("delete bullet");
                bulletArr.splice(bulletIdx, 1);
                bullet.element.remove();
            }
        });
    }

    updatePoints() {
        switch (this.enemyType) {
            case 0:
                this.points += 50;
                break;
            case 1:
                this.points += 20;
                break;
            case 2:
                this.points += 10;
                break;
            default:
                break;
        }

        this.scoreNumberEl.innerText = this.points;

        this.updateResist();
    }

    updateResist() {
        if (this.spaceship.isBarrier) {
            return;
        }

        this.spaceship.lives--;
        this.spaceship.hpBar.children[0].remove();
        this.backdrop.hidden = false;

        setTimeout(() => (this.backdrop.hidden = true), 200);

        if (!this.spaceship.lives) {
            this.endGame();
        }
    }

    endGame() {
        console.log("endGame");
    }
}
