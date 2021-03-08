export class Common {
    elementsOfDOM = {
        // main menu
        audioStartScreen: "[data-start-screen-audio]",
        btnStart: "[data-btn-start]",
        btnExit: "[data-btn-exit]",
        btnSettings: "[data-btn-settings]",
    };

    getElement(selector) {
        const elementDOM = document.querySelector(selector);

        if (!elementDOM) {
            throw new Error(`Item not found: ${selector}`);
        }

        return elementDOM;
    }
}
