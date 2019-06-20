// Dani Vicario - fruitcollision experiment (canvas)- Thu Jun 20 10:36:25 CEST 2019
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

function randomInt(min, max) {
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

let player = {
    x: 500,
    y: h2,
    moveLeft: function () {
        this.x -= 10
    },
    moveRight: function () {
        this.x += 10
    }
}

class Apple {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.destroyed = false
        this.color = `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`
    }

    draw() {
        if (!this.destroyed) {
            ctx.beginPath();
            ctx.fillStyle = this.color
            ctx.arc(this.x, this.y + 10, 10, 0, PI_DOUBLE);
            ctx.fill();
            ctx.closePath();
        }
    }

    destroy() {
        this.destroyed = true
    }
}

let scoreBoard = {
    score: 0,
    increaseScore: function () {
        this.score += 10
    },
    draw: function () {
        ctx.font = '48px serif';
        ctx.fillText(this.score, 10, 50);
    },
    getScore: function () {
        return this.score
    }
}


// over here you could check if two apples match the same location by using a do-while statement :)
let apples = Array(5).fill().map(x => new Apple(randomInt(0, 100) * 10, h2))

window.onkeydown = function (e) {
    if (e.keyCode === 39) {
        player.moveRight()
    }

    if (e.keyCode === 37) {
        player.moveLeft()
    }

    let destroyedApple = null

    apples.forEach((apple, idx) => {
        if (apple.x === player.x) {
            apple.destroy()
            destroyedApple = idx
            scoreBoard.increaseScore()
        }
    })

    if (destroyedApple !== null) apples.splice(destroyedApple, 1)
}

setInterval(() => {
    ctx.clearRect(0, 0, w, h);

    ctx.moveTo(0, h2 + 20)
    ctx.lineTo(w, h2 + 20)
    ctx.stroke()

    ctx.beginPath();
    ctx.rect(player.x, player.y, 20, 20)
    ctx.fill();
    ctx.closePath();

    apples.forEach(apple => apple.draw())

    scoreBoard.draw()

    if (scoreBoard.getScore() === 50) {
        console.log("You have passed the level! Level UP!!!!!")
    }
}, 10)