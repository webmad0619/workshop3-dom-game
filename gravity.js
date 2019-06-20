// Dani Vicario - gravity experiment (canvas)- Wed Jun 19 11:29:32 CEST 2019
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

let circleRadius = 25
let boxPositionBoundary = h2 + 300 - (circleRadius)
let posY = boxPositionBoundary
// debugger

let ballIsMoving = true

// earth gravity
let acceleration
let acumulatedAcceleration = 0
let sense = -1
let speed = 0
let spacebarPressed = false

window.onkeydown = function (e) {
    // 32 is the spacebar
    if (e.keyCode === 32) {
        spacebarPressed = true
        acceleration = 9.8 / 100
        speed = 8
    }
}

setInterval(() => {
    if (spacebarPressed)    {
        acumulatedAcceleration += acceleration        // console.log(acumulatedAcceleration)
    }
    ctx.clearRect(0, 0, w, h);
    ctx.beginPath();
    ctx.rect(w2 - 100, h2 + 300, 200, 10)
    ctx.fill();
    ctx.closePath();
    
    ctx.save();

    let finalYPosition = posY+= ((speed - acumulatedAcceleration) * sense)

    if (finalYPosition > boxPositionBoundary) {
        speed = 0;
        acumulatedAcceleration = 0
        spacebarPressed = false
        finalYPosition = boxPositionBoundary
    }
    ctx.translate(w2, finalYPosition)

    ctx.beginPath();
    ctx.arc(0, 0, circleRadius, 0, PI_DOUBLE);
    ctx.fill();
    ctx.closePath();

    ctx.restore();
}, 10)