const gameArea = document.getElementById('gameArea');
const context = gameArea.getContext('2d');
const size = 20;
let x = 200, y = 200;
let dx = size, dy = 0;
let snake = [{ x: x, y: y }];

function drawSnake() {
    snake.forEach(snakePart => {
        context.fillStyle = 'green';
        context.fillRect(snakePart.x, snakePart.y, size, size);
    });
}

const gameAreaWidth = 400;
const gameAreaHeight = 400;
const size = 20;
let snake = [{ x: 200, y: 200 }];
let dx = size, dy = 0;

function wrapPosition(position, max) {
    if (position < 0) {
        return max - size;
    } else if (position >= max) {
        return 0;
    }
    return position;
}

function update() {
    context.clearRect(0, 0, gameAreaWidth, gameAreaHeight);

    let headX = wrapPosition(snake[0].x + dx, gameAreaWidth);
    let headY = wrapPosition(snake[0].y + dy, gameAreaHeight);

    const head = { x: headX, y: headY };
    snake.unshift(head);
    snake.pop();

    drawSnake();
}

setInterval(update, 100);

document.getElementById('upButton').addEventListener('click', function() { dx = 0; dy = -size; });
document.getElementById('downButton').addEventListener('click', function() { dx = 0; dy = size; });
document.getElementById('leftButton').addEventListener('click', function() { dx = -size; dy = 0; });
document.getElementById('rightButton').addEventListener('click', function() { dx = size; dy = 0; });

