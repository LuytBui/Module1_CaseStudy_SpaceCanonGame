function drawCanon() {
    ctx.fillStyle = rocketStyle;
    ctx.beginPath();
    ctx.translate(gameWidth / 2, gameHeight);
    ctx.rotate(-1 * canonAngle() - Math.PI / 2);
    ctx.fillRect(-10, 0, 20, CANON_LENGTH);
    ctx.rotate(canonAngle() + Math.PI / 2);
    ctx.arc(0, 50, 90, 0, 2 * Math.PI);
    ctx.fill();
    ctx.translate(-1 * gameWidth / 2, -1 * gameHeight);

}

function drawRockets() {
    for (let i = 0; i < rockets.length; i++) {
        let rocket = rockets[i];
        rocket.draw();
        rocket.move();
    }
    checkRocketsOutOfHealth();
}

function checkRocketsOutOfHealth() {
    for (let i = 0; i < rockets.length; i++) {
        let rocket = rockets[i];
        if (rocket.age > Rockets.LIFETIME || rocket.health <=0) {
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
            destroySpaceShipReward(spaceShip);
            spaceShips.splice(i, 1);
        } else {
            spaceShip.draw();
        }

        keepSpaceShipInsideCanvas(spaceShip);

        //kiểm tra tàu vượt qua đường ngang
        if (spaceShip.y + spaceShip.radius > gameHeight) {
            playerHealth--;
            spaceShips.splice(i, 1);
            playSound(MISSED_OUT_SOUND, 3 * SFXVolume());
        }

        spaceShip.move();
    }
}

function keepSpaceShipInsideCanvas(spaceShip) {
    if (spaceShip.x < spaceShip.radius) {
        spaceShip.x = spaceShip.radius;
    }
    if (spaceShip.x > gameWidth - spaceShip.radius) {
        spaceShip.x = gameWidth - spaceShip.radius;
    }
}


function newSpaceShip() {
    let randomNumber = Math.random();
    if (randomNumber > (1 - newSpaceShip_Probability) && spaceShips.length < maxSpaceShip_Count) {  // mỗi 1s có 50% cơ hội sinh ra tàu mới
        let shipRandomHealth = minSpaceShip_Health + Math.floor(Math.random() * (maxSpaceShip_Health - minSpaceShip_Health + 1));
        new SpaceShips(shipRandomCoorX(), 50, shipRandomHealth, 'blue');
    }

}

function shipRandomCoorX() {
    // trả về giá trị ngẫu nhiên, ưu tiên xuất hiện ở 2 góc nhiều hơn ở giữa
    let oneThird = gameWidth / 3;
    let randomNumber = Math.random();
    if (randomNumber <= 0.4) { /// left side
        return Math.random() * oneThird;
    } else if (randomNumber >= 0.6) {/// right side
        return (2 + Math.random()) * oneThird;
    } else { /// center
        return (1 + Math.random()) * oneThird;
    }
}

function checkCollision() {
    for (let i = 0; i < spaceShips.length; i++) {
        for (let j = 0; j < rockets.length; j++) {
            let spaceShip = spaceShips[i];
            let rocket = rockets[j]
            if (isCollise(spaceShip, rocket)) {
                new Explosions(rocket.x, rocket.y, 'yellow', 40);
                score += spaceShip.health > rocket.damage ? rocket.damage : spaceShip.health;
                spaceShip.takeDamageFrom(rocket);
                rocket.health -= rocket.damage;
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
    let dX = pointerX - gameWidth / 2;
    let dY = gameHeight - pointerY;

    let angle = Math.atan(dY / dX);
    if (angle < 0) {
        angle += Math.PI;
    }
    return angle;
}

function drawDepots() {
    // Vẽ kho chứa đạn
    for (let i = 0; i < ROCKET_STYLES.length; i++) {
        ctx.globalAlpha = 0.75;
        ctx.fillStyle = '#a70a21';
        ctx.fillRect(gameWidth / 2 + 120 + i * (120 + 15), gameHeight - 85, 120, 35);
        ctx.fillStyle = ROCKET_STYLES[i];
        ctx.fillRect(gameWidth / 2 + 120 + i * (120 + 15), gameHeight - 50, 120, 50);

        ctx.globalAlpha = 1;
        ctx.fillStyle = '#a70a21';
        ctx.textAlign = 'center';
        ctx.font = '23px' + ' Arial';
        ctx.fillStyle = 'WHITE';
        ctx.fillText('Press ' + ROCKET_CHANGE_HOTKEY[i], gameWidth / 2 + 180 + (120 + 15) * i, gameHeight - 60);

        ctx.fillStyle = 'white';
        if (i === 0) {
            ctx.font = '45px' + ' Symbol';
            ctx.fillText('∞', gameWidth / 2 + 180 + (120 + 15) * i, gameHeight - 10);
        } else {
            ctx.font = '30px' + ' Arial';
            ctx.fillText(rocketAmmo[i], gameWidth / 2 + 180 + (120 + 15) * i, gameHeight - 10);
        }

    }
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
        ctx.fillText(string, x, y + radius / 4);
    }
}


function clearCanvas() {
    ctx.clearRect(-1 * gameWidth, -1 * gameHeight, 2 * gameWidth, 2 * gameHeight);
}
