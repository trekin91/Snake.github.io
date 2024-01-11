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

function update() {
    context.clearRect(0, 0, gameArea.width, gameArea.height);
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    snake.pop();
    drawSnake();
}

setInterval(update, 100);

document.getElementById('upButton').addEventListener('click', function() { dx = 0; dy = -size; });
document.getElementById('downButton').addEventListener('click', function() { dx = 0; dy = size; });
document.getElementById('leftButton').addEventListener('click', function() { dx = -size; dy = 0; });
document.getElementById('rightButton').addEventListener('click', function() { dx = size; dy = 0; });
