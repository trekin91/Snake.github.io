const canvas = document.getElementById('jeuSerpent');
const ctx = canvas.getContext('2d');
const tailleFruit = 10;
let dx = tailleFruit;
let dy = 0;
let fruits = { x: 0, y: 0 };
let serpent = [{ x: 160, y: 160 }, { x: 150, y: 160 }];
let score = 0;
let jeuEnCours;

function dessinerFruit() {
    ctx.fillStyle = 'red';
    ctx.fillRect(fruits.x, fruits.y, tailleFruit, tailleFruit);
}

function dessinerSerpentPart(serpentPart) {
    ctx.fillStyle = 'green';
    ctx.fillRect(serpentPart.x, serpentPart.y, tailleFruit, tailleFruit);
}

function dessinerSerpent() {
    serpent.forEach(dessinerSerpentPart);
}

function avancerSerpent() {
    let head = { x: serpent[0].x + dx, y: serpent[0].y + dy };
    head.x = head.x >= canvas.width ? 0 : (head.x < 0 ? canvas.width - tailleFruit : head.x);
    head.y = head.y >= canvas.height ? 0 : (head.y < 0 ? canvas.height - tailleFruit : head.y);

    serpent.unshift(head);

    const aMangeFruit = serpent[0].x === fruits.x && serpent[0].y === fruits.y;
    if (aMangeFruit) {
        score += 1;
        creerFruit();
    } else {
        serpent.pop();
    }
}

function dessinerScore() {
    ctx.fillStyle = 'blue';
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 90, 20);
}

function finDeJeu() {
    for (let i = 1; i < serpent.length; i++) {
        if (serpent[i].x === serpent[0].x && serpent[i].y === serpent[0].y) {
            jeuEnCours = false;
            return true;
        }
    }
    return false;
}

function demarrerNouvellePartie() {
    serpent = [{ x: 160, y: 160 }, { x: 150, y: 160 }];
    score = 0;
    dx = tailleFruit;
    dy = 0;
    creerFruit();
    if (!jeuEnCours) {
        jeuEnCours = true;
        jeu();
    }
}

function jeu() {
    if (finDeJeu()) {
        alert('Fin de la partie. Votre score est ' + score);
        demarrerNouvellePartie();
        return;
    }

    setTimeout(function onTick() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        dessinerFruit();
        avancerSerpent();
        dessinerSerpentPart();
        dessinerScore();
        jeu();
    }, 100);
}

function changerDirection(event) {
    const GAUCHE = 37;
    const DROITE = 39;
    const HAUT = 38;
    const BAS = 40;

    const keyPressed = event.keyCode;
    const monte = dy === -tailleFruit;
    const descend = dy === tailleFruit;
    const vaAGauche = dx === -tailleFruit;
    const vaADroite = dx === tailleFruit;

    if (keyPressed === GAUCHE && !vaADroite) {
        dx = -tailleFruit;
        dy = 0;
    }
    if (keyPressed === HAUT && !descend) {
        dx = 0;
        dy = -tailleFruit;
    }
    if (keyPressed === DROITE && !vaAGauche) {
        dx = tailleFruit;
        dy = 0;
    }
    if (keyPressed === BAS && !monte) {
        dx = 0;
        dy = tailleFruit;
    }
}

function randomTen(min, max) {
    return Math.round((Math.random() * (max - min) + min) / tailleFruit) * tailleFruit;
}

function creerFruit() {
    fruits.x = randomTen(0, canvas.width - tailleFruit);
    fruits.y = randomTen(0, canvas.height - tailleFruit);

    serpent.forEach(function estFruitSurSerpent(part) {
        const estSurSerpent = part.x === fruits.x && part.y === fruits.y;
        if (estSurSerpent) creerFruit();
    });
}

document.addEventListener("keydown", changerDirection);
demarrerNouvellePartie();
