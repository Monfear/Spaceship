export class Common {
    elementsOfDOM = {
        // main menu
        startScreen: "[data-start-screen]",
        btnStart: "[data-btn-start]",
        btnExit: "[data-btn-exit]",
        // btnSettings: "[data-btn-settings]",
        audioStartScreen: "[data-start-screen-audio]",
        btnSound: "[data-btn-sound]",
        divSoundLine: "[data-sound-line]",
    };

    getElement(selector) {
        const elementDOM = document.querySelector(selector);

        if (!elementDOM) {
            throw new Error(`Item not found: ${selector}`);
        }

        return elementDOM;
    }
}
