const gameArea = document.getElementById('gameArea');
const context = gameArea.getContext('2d');
const size = 20;
let x = 200, y = 200;
let dx = size, dy = 0;

function drawSnakePart(x, y) {
    context.fillStyle = 'green';
    context.fillRect(x, y, size, size);
}

function update() {
    context.clearRect(0, 0, gameArea.width, gameArea.height);
    x += dx;
    y += dy;
    drawSnakePart(x, y);
}

setInterval(update, 100);

document.getElementById('upButton').addEventListener('click', function() { dx = 0; dy = -size; });
document.getElementById('downButton').addEventListener('click', function() { dx = 0; dy = size; });
document.getElementById('leftButton').addEventListener('click', function() { dx = -size; dy = 0; });
document.getElementById('rightButton').addEventListener('click', function() { dx = size; dy = 0; });
