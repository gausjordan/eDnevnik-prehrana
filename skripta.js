async function entryPoint() {
    let delayTime = 100;

    // Prevent concurrent instantiation
    document.removeEventListener("mouseup", entryPoint);

    // Find/process '?' characters
    let matchesRoundOne = findElementsContaining('?');
    await processMatchesRoundOne(matchesRoundOne, delayTime);
    
    // Find/process '+' characters
    let matchesRoundTwo = findElementsContaining('+');
    await processMatchesRoundTwo(matchesRoundTwo, delayTime);
}

/** Click all of the question marks */
async function processMatchesRoundOne(matchesRoundOne, milliseconds) {
    for (let m of matchesRoundOne) {
        await pause(milliseconds);
        m.click();
    }
}

/** Click every other '+' character (url-based) */
async function processMatchesRoundTwo(matchesRoundTwo, milliseconds) {
    for (let m of matchesRoundTwo) {
        if (m.href.substr(-10) === 'false/true') {
            await pause(milliseconds);
            m.click();
        }
    }
}

//** Delay (prevent server-side detection) */
function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Seek elements based on a search string
function findElementsContaining(searchString) {
    let allElements = document.querySelectorAll('*');
    let matches = Array.from(allElements).filter(e =>
        e.innerHTML == searchString);
    return matches;
}

/** Add an event listener to inject the code */
document.addEventListener("mouseup", entryPoint);
if (typeof autoRunEvent === 'undefined') {
    let autoRunEvent = null;
} autoRunEvent = new MouseEvent('mouseup', {
    bubbles: true,
    cancelable: true,
    view: window
});

/** Entry point */
document.dispatchEvent(autoRunEvent);
