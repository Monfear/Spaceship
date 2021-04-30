import { Common } from "./Common.js";
import { Enemy } from "./Enemy.js";
import { Leaderboard } from "./Leaderboard.js";
import { ResultScreen } from "./ResultScreen.js";
import { Spaceship } from "./Spaceship.js";
import { Survivals } from "./Survivals.js";

export class Game extends Common {
    constructor() {
        super();

        this.init();
    }

    points = 0;
    level = 1;

    enemies = [];
    enemiesSpeedInterval = 20;

    timerInterval = null;
    timerSpeedInterval = 400;

    checkPositionsInterval = null;
    checkPositionSpeedInterval = 200;

    insertEnemyInterval = null;
    insertEnemySpeedInterval = 3000;

    survivalItems = [];
    survivalItemsSpeed = 20;

    insertSurvivalItemInterval = null;
    insertSurvivalItemSpeedInterval = (Math.floor(Math.random() * 15) + 15) * 1000;

    enemyType = null;

    // audioShot = this.audioElements.shot;

    init() {
        this.connectDOM();
        // this.setupListeners();

        this.countToStart();
    }

    connectDOM() {
        this.battleScreen = this.getElement(this.elementsOfDOM.battleScreen);
        this.backdrop = this.getElement(this.elementsOfDOM.backdrop);
        this.counter = this.getElement(this.elementsOfDOM.counter);
        this.timer = this.getElement(this.elementsOfDOM.timer);
        this.info = this.getElement(this.elementsOfDOM.info);
        this.score = this.getElement(this.elementsOfDOM.score);
        this.life = this.getElement(this.elementsOfDOM.life);
        this.scoreNumberEl = this.getElement(this.elementsOfDOM.scoreNumber);
        this.lvlEl = this.getElement(this.elementsOfDOM.lvlEl);
        this.gameOverEl = this.getElement(this.elementsOfDOM.gameOverEl);
    }

    setupListeners() {}

    countToStart() {
        const audio = new Audio("./audio/battle.wav");
        audio.playbackRate = 0.9;
        audio.volume = 0.5;
        audio.play();

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

        window.addEventListener("keydown", this.spaceship.keydownActionsRefer);
        window.addEventListener("keyup", this.spaceship.keyupActionsRefer);

        // this.spaceship.actionListeners();

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

            this.audioBattle = new Audio("./audio/battlebg/dark.mp3");
            this.audioBattle.loop = true;
            this.audioBattle.volume = 0.8;
            this.audioBattle.play();
        }, 2000);
    }

    playFirstLevel() {
        this.startTimer();

        this.insertEnemyInterval = setInterval(() => this.drawEnemy(), this.insertEnemySpeedInterval);

        this.insertSurvivalItemInterval = setInterval(() => this.drawSurvivalItem(), this.insertSurvivalItemSpeedInterval);

        this.checkPositionsInterval = setInterval(() => this.checkPositions(), this.checkPositionSpeedInterval);
    }

    startTimer() {
        let minutes = 0;
        let seconds = 0;

        this.timerInterval = setInterval(() => {
            seconds++;

            if (seconds === 60) {
                seconds = 0;
                minutes++;

                this.playNextLevel();
            }

            this.timer.innerText = `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
        }, this.timerSpeedInterval);
    }

    playNextLevel() {
        this.level++;

        this.spaceship.shields++;
        let shieldItem = document.createElement("div");
        shieldItem.classList.add("battle-screen__armor");
        this.spaceship.armorBar.append(shieldItem);

        if (this.insertEnemySpeedInterval > 1000) {
            clearInterval(this.insertEnemyInterval);
            this.insertEnemySpeedInterval -= 200;
            this.insertEnemyInterval = setInterval(() => this.drawEnemy(), this.insertEnemySpeedInterval);
        }

        if (this.enemiesSpeedInterval > 4) {
            this.enemiesSpeedInterval -= 2;
            this.survivalItemsSpeed -= 1;
        }

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
        }, 2000);
    }

    drawEnemy() {
        const randomNum = Math.floor(Math.random() * 11) + 1;

        if (randomNum === 11) {
            this.insertEnemy(this.battleScreen, this.enemiesSpeedInterval, "battle-screen__enemy2", "battle-screen__explosion-big", 8, 50);
            this.enemyType = 11;
        }

        if (randomNum % 2 === 0 && randomNum !== 11) {
            this.insertEnemy(this.battleScreen, this.enemiesSpeedInterval * 0.7, "battle-screen__enemy1", "battle-screen__explosion-small", 3, 20);
            this.enemyType = 2;
        } else if (randomNum % 2 !== 0 && randomNum !== 11) {
            this.insertEnemy(this.battleScreen, this.enemiesSpeedInterval * 0.5, "battle-screen__enemy3", "battle-screen__explosion-small", 1, 10);
            this.enemyType = 3;
        }
    }

    insertEnemy(...attr) {
        const enemy = new Enemy(...attr);
        enemy.init();
        this.enemies.push(enemy);
    }

    drawSurvivalItem() {
        const randomNum = Math.floor(Math.random() * 3) + 1;

        if (randomNum === 1) {
            this.insertSurvivalItem(this.battleScreen, "battle-screen__health", "+", this.survivalItemsSpeed);
        } else if (randomNum === 2) {
            this.insertSurvivalItem(this.battleScreen, "battle-screen__asteroid", "-", this.survivalItemsSpeed);
        } else if (randomNum === 3) {
            this.insertSurvivalItem(this.battleScreen, "battle-screen__bomb", "-", this.survivalItemsSpeed);
        }

        clearInterval(this.insertSurvivalItemInterval);
        this.insertSurvivalItemSpeedInterval = (Math.floor(Math.random() * 15) + 15) * 1000;
        this.insertSurvivalItemInterval = setInterval(() => this.drawSurvivalItem(), this.insertSurvivalItemSpeedInterval);
    }

    insertSurvivalItem(...attr) {
        const item = new Survivals(...attr);
        item.init();
        this.survivalItems.push(item);
    }

    checkPositions() {
        this.enemies.forEach((enemy, enemyIdx, enemiesArr) => {
            const enemyCoordinates = {
                top: enemy.element.offsetTop,
                bottom: enemy.element.offsetTop + enemy.element.offsetHeight,
                left: enemy.element.offsetLeft,
                right: enemy.element.offsetLeft + enemy.element.offsetWidth,
            };
            // console.log(this.spaceship.element.offsetTop);
            // console.log(enemyCoordinates.top - enemy.element.offsetHeight / 2);

            // outside the screen
            if (enemyCoordinates.bottom - enemy.element.offsetHeight / 2 > window.innerHeight) {
                enemy.makeExplosion();
                enemiesArr.splice(enemyIdx, 1);
                this.removeHealth();
            }

            this.spaceship.bullets.forEach((bullet, bulletIdx, bulletArr) => {
                const bulletCoordinates = {
                    top: bullet.element.offsetTop,
                    bottom: bullet.element.offsetTop + bullet.element.offsetHeight,
                    left: bullet.element.offsetLeft,
                    right: bullet.element.offsetLeft + bullet.element.offsetWidth,
                };

                // if (bulletCoordinates.top <= enemyCoordinates.bottom - enemy.element.offsetHeight / 5 && bulletCoordinates.bottom >= enemyCoordinates.top && bulletCoordinates.right >= enemyCoordinates.left + enemy.element.offsetWidth / 4 && bulletCoordinates.left <= enemyCoordinates.right - enemy.element.offsetWidth / 4) {

                // checking cross points
                if (bulletCoordinates.top <= enemyCoordinates.bottom - enemy.element.offsetHeight / 5 && bulletCoordinates.right >= enemyCoordinates.left + enemy.element.offsetWidth / 4 && bulletCoordinates.left <= enemyCoordinates.right - enemy.element.offsetWidth / 4) {
                    enemy.getDamaged();

                    if (!enemy.lives) {
                        this.points += enemy.points;
                        this.scoreNumberEl.innerText = this.points;

                        enemiesArr.splice(enemyIdx, 1);

                        // this.updatePoints();
                    }

                    bulletArr.splice(bulletIdx, 1);
                    bullet.element.remove();
                    // this.updateScore();
                }
            });

            const spaceshipCoordinates = {
                top: this.spaceship.element.offsetTop,
                bottom: this.spaceship.element.offsetTop + this.spaceship.element.offsetHeight,
                left: this.spaceship.element.offsetLeft,
                right: this.spaceship.element.offsetLeft + this.spaceship.element.offsetWidth,
            };

            if (enemyCoordinates.bottom - enemy.element.offsetHeight / 1.5 >= spaceshipCoordinates.top && enemyCoordinates.right >= spaceshipCoordinates.left && enemyCoordinates.left <= spaceshipCoordinates.right) {
                if (this.spaceship.isBarrier) {
                    return;
                }

                this.removeHealth();
                this.removeHealth();
                enemiesArr.splice(enemyIdx, 1);
                enemy.makeExplosion();
            }
        });

        this.survivalItems.forEach((item, idx, arr) => {
            const itemCoordinates = {
                top: item.element.offsetTop,
                bottom: item.element.offsetTop + item.element.offsetHeight,
                left: item.element.offsetLeft,
                right: item.element.offsetLeft + item.element.offsetWidth,
            };

            const spaceshipCoordinates = {
                top: this.spaceship.element.offsetTop,
                bottom: this.spaceship.element.offsetTop + this.spaceship.element.offsetHeight,
                left: this.spaceship.element.offsetLeft,
                right: this.spaceship.element.offsetLeft + this.spaceship.element.offsetWidth,
            };

            if (itemCoordinates.bottom - item.element.offsetHeight / 1.2 >= spaceshipCoordinates.top && itemCoordinates.right >= spaceshipCoordinates.left && itemCoordinates.left <= spaceshipCoordinates.right) {
                if (item.type === "+") {
                    this.addHealth(item, idx, arr);
                    // item.audioHealth.play();
                    // arr.splice(idx, 1);
                    // item.delete();
                    // this.spaceship.lives++;
                    // let hpItem = document.createElement("div");
                    // hpItem.classList.add("battle-screen__hp");
                    // this.spaceship.hpBar.append(hpItem);
                } else if (item.type === "-") {
                    if (this.spaceship.isBarrier) {
                        item.delete();
                        return;
                    }

                    item.audioDead.play();

                    arr.splice(idx, 1);
                    item.delete();

                    while (this.spaceship.lives) {
                        this.removeHealth();
                    }
                }
            }

            // if (itemCoordinates.top - item.element.offsetHeight / 2 >= window.innerHeight) {
            //     arr.splice(idx, 1);
            //     item.delete();
            // }

            if (itemCoordinates.bottom - item.element.offsetHeight / 4 >= window.innerHeight) {
                arr.splice(idx, 1);
                item.delete();
            }
        });

        this.spaceship.bullets.forEach((bullet, bulletIdx, bulletArr) => {
            if (bullet.element.offsetTop + bullet.element.offsetHeight < 0) {
                bulletArr.splice(bulletIdx, 1);
                bullet.element.remove();
            }
        });
    }

    // updatePoints() {
    //     switch (this.enemyType) {
    //         case 11:
    //             this.points += 50;
    //             break;
    //         case 2:
    //             this.points += 20;
    //             break;
    //         case 3:
    //             this.points += 10;
    //             break;
    //         default:
    //             break;
    //     }

    //     this.scoreNumberEl.innerText = this.points;

    //     // this.updateResist();
    //     // this.endGame();
    // }

    removeHealth() {
        // if (this.spaceship.isBarrier) {
        //     return;
        // }

        this.spaceship.lives--;

        if (this.spaceship.hpBar.children.length) {
            this.spaceship.hpBar.children[0].remove();
        }

        this.backdrop.hidden = false;

        setTimeout(() => (this.backdrop.hidden = true), 200);

        if (!this.spaceship.lives) {
            this.endGame();
        }
    }

    addHealth(item, idx, arr) {
        console.log("add health()");

        item.audioHealth.play();

        arr.splice(idx, 1);
        item.delete();

        this.spaceship.lives++;

        let hpItem = document.createElement("div");
        hpItem.classList.add("battle-screen__hp");
        this.spaceship.hpBar.append(hpItem);
    }

    endGame() {
        this.audioBattle.pause();

        window.removeEventListener("keydown", this.spaceship.keydownActionsRefer);
        window.removeEventListener("keyup", this.spaceship.keyupActionsRefer);

        this.spaceship.element.classList.remove("battle-screen__spaceship");
        this.spaceship.element.classList.add("battle-screen__spaceship-explosion");

        clearInterval(this.checkPositionsInterval);
        clearInterval(this.insertEnemyInterval);
        clearInterval(this.insertSurvivalItemInterval);
        clearInterval(this.timerInterval);

        this.gameOverEl.classList.remove("hide");

        setTimeout(() => {
            this.spaceship.element.remove();
        }, 2000);

        this.enemies.forEach((enemy) => {
            enemy.makeExplosion();
        });

        this.enemies.length = 0;

        this.survivalItems.forEach((item) => {
            item.delete();
        });

        this.survivalItems.length = 0;

        const resultScreen = new ResultScreen();
        resultScreen.element.classList.remove("hide");
        resultScreen.finalScore.innerText = this.points;

        resultScreen.form.addEventListener(
            "submit",
            resultScreen.addPlayer(this.points)
            // e.preventDefault();
        );

        // const leaderboardScreen = new Leaderboard();
        // leaderboardScreen.element.classList.remove("hide");
    }
}
