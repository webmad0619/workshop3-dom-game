// Dani Vicario - mike experiment (canvas)- Thu Jun 20 13:32:19 CEST 2019
const globalCompositeOperationModes = {
    "source-over": "source-over",
    "source-in": "source-in",
    "source-out": "source-out",
    "source-atop": "source-atop",
    "destination-over": "destination-over",
    "destination-in": "destination-in",
    "destination-out": "destination-out",
    "destination-atop": "destination-atop",
    "lighter": "lighter",
    "copy": "copy",
    "xor": "xor",
    "multiply": "multiply",
    "screen": "screen",
    "overlay": "overlay",
    "darken": "darken",
    "lighten": "lighten",
    "color-dodge": "color-dodge",
    "color-burn": "color-burn",
    "hard-light": "hard-light",
    "soft-light": "soft-light",
    "difference": "difference",
    "exclusion": "exclusion",
    "hue": "hue",
    "saturation": "saturation",
    "color": "color",
    "luminosity": "luminosity"
}
    
function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
};

/** @type HTMLCanvasElement */
var canvasDOMEl = document.getElementById("canvas");

/** @type CanvasRenderingContext2D */
var ctx = canvasDOMEl.getContext("2d");

var w = window.innerWidth;
var h = window.innerHeight;
var w2 = w / 2;
var h2 = h / 2;

var PI = Math.PI;
var PI_DOUBLE = 2 * Math.PI;
var PI_HALF = Math.PI / 2;

canvasDOMEl.setAttribute("height", window.innerHeight);
canvasDOMEl.setAttribute("width", window.innerWidth);

class Event {
    constructor(posX, whatNeedsToHappenWhenEventIsExecuted) {
        this.x = posX
        this.whatNeedsToHappenWhenEventIsExecuted = whatNeedsToHappenWhenEventIsExecuted
    }
}

function playSoundA() {
    console.log("sonido A")
}

let allEvents = [
    new Event(100, playSoundA),
    new Event(100, playSoundA),
    new Event(500, playSoundA)
]

var Player = {
    x: 99,
    moveRight: function () {
        this.x++
    }
}

allEvents.forEach(event => {
    if (event.x === Player.x) {
        event.whatNeedsToHappenWhenEventIsExecuted()
    }
})