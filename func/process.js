function process() {
    clearCanvas();
    drawBG();
    drawCanon();
    drawRockets();
    checkAndDrawSpaceShips();
    checkCollision();
    drawExplosions();
    updateScore();
    displayPlayerHealth();
}

const CANON_LENGTH = 90;

function shoot() {
    let angle = canonAngle();
    let x = (CANON_LENGTH + ROCKETS_RADIUS) * Math.cos(angle);
    let y = (CANON_LENGTH + ROCKETS_RADIUS) * Math.sin(angle);
    new Rockets(x, y, angle, 3);
}

function drawCanon() {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.rotate(canonAngle() - Math.PI / 2);
    ctx.fillRect(-10, 0, 20, CANON_LENGTH);
    ctx.rotate(-1 * canonAngle() + Math.PI / 2);
    ctx.arc(0, -50, 90, 0, 2 * Math.PI);
    ctx.fill();

}

function drawRockets() {
    for (let i = 0; i < rockets.length; i++) {
        let rocket = rockets[i];
        rocket.draw();
        rocket.move();
    }
    checkRocketsOutOfRange();
}

function checkRocketsOutOfRange() {
    for (let i = 0; i < rockets.length; i++) {
        let rocket = rockets[i];
        if (rocket.age > Rockets.LIFETIME) {
            rockets.splice(i, 1);
            delete rocket;
        }
    }
}

function drawExplosions() {
    for (let i = 0; i < explosions.length; i++) {
        let explosion = explosions[i];
        if (explosion.radius > explosion.maxRadius) {
            explosions.splice(i, 1);
            delete explosion;
        }
        explosion.draw();
        explosion.grow();
    }
}

function checkAndDrawSpaceShips() {
    for (let i = 0; i < spaceShips.length; i++) {
        let spaceShip = spaceShips[i];

        if (spaceShip.health < 1) {
            spaceShips.splice(i, 1);
        } else {
            spaceShip.draw();
        }

        keepSpaceShipInsideCanvas(spaceShip);

        //kiểm tra tàu vượt qua đường ngang
        if (spaceShip.y - spaceShip.radius < 0) {
            playerHealth--;
            spaceShips.splice(i, 1);
        }

        spaceShip.move();
    }
}

function keepSpaceShipInsideCanvas(spaceShip) {
    if (spaceShip.x < -1 * canvas.width / 2 + spaceShip.radius) {
        spaceShip.x = -1 * canvas.width / 2 + spaceShip.radius;
    }
    if (spaceShip.x > canvas.width / 2 - spaceShip.radius) {
        spaceShip.x = canvas.width / 2 - spaceShip.radius
    }
}


function checkCollision() {
    for (let i = 0; i < spaceShips.length; i++) {
        for (let j = 0; j < rockets.length; j++) {
            let spaceShip = spaceShips[i];
            let rocket = rockets[j]
            if (isCollise(spaceShip, rocket)) {
                rockets.splice(j, 1);
                new Explosions(rocket.x, rocket.y, 'yellow', 40);
                score += spaceShip.health > rocket.damage ? rocket.damage : spaceShip.health;
                spaceShip.takeDamageFrom(rocket);
            }
        }
    }
}

function isCollise(circle1, circle2) {
    return Math.abs(circle1.x - circle2.x) < circle1.radius + circle2.radius &&
        Math.abs(circle1.y - circle2.y) < circle1.radius + circle2.radius;
}


function canonAngle() {
    // Trả về góc (radians) của chuột so với gốc tọa độ
    let currentX = -canvas.width / 2 + pointerX;
    let currentY = canvas.height - pointerY;

    let angle = Math.atan(currentY / currentX);
    if (angle < 0) {
        angle += Math.PI;
    }
    return angle;
}

function drawCircleObject(x, y, radius, style, string) {

    ctx.beginPath();
    ctx.fillStyle = style;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
    if (string !== '') {
        ctx.font = radius + 'px' + ' Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.transform(1, 0, 0, -1, 0, 0);
        ctx.fillText(string, x, -1 * y + radius / 2);
        ctx.transform(1, 0, 0, -1, 0, 0);
    }
}

function drawText(string, x, y, color, font) {
    ctx.color = color;
    ctx.font = font;
    ctx.fillText(string, x, y);
}

function clearCanvas() {
    ctx.clearRect(-1 * canvas.width, -1 * canvas.height, 2 * canvas.width, 2 * canvas.height);
}
