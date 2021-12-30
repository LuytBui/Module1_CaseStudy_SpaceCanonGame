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
        if (rocket.age > Rockets.LIFETIME || rocket.health <= 0) {
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
    let shipMaxVelocity = 14;
    let shipMinVelocity = 4;
    let randomNumber = Math.random();
    if (randomNumber > (1 - newSpaceShip_Probability) && spaceShips.length < maxSpaceShip_Count) {  // mỗi 1s có 50% cơ hội sinh ra tàu mới
        let shipRandomHealth = Math.floor(minSpaceShip_Health + Math.random() * (maxSpaceShip_Health - minSpaceShip_Health + 1));

        let shipRandomVelocity = shipMinVelocity + (shipMaxVelocity - shipMinVelocity) * Math.random();
        new SpaceShips(shipRandomCoorX(), 50, shipRandomHealth, shipRandomVelocity, '#0027b0');
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

function checkCollisionSpaceShip() {
    for (let i = 0; i < spaceShips.length; i++) {
        for (let j = 0; j < rockets.length; j++) {
            let spaceShip = spaceShips[i];
            let rocket = rockets[j];
            if (isCollise(spaceShip, rocket)) {
                new Explosions(rocket.x, rocket.y, 'yellow', 40);
                score += spaceShip.health > rocket.damage ? rocket.damage : spaceShip.health;
                spaceShip.takeDamageFrom(rocket);
                rocket.health -= rocket.damage;
            }
        }
    }
}

function checkCollisionFloatingBonus() {
    for (let i = 0; i < floatingBonuses.length; i++) {
        for (let j = 0; j < rockets.length; j++) {
            let floatingBonus = floatingBonuses[i];
            let rocket = rockets[j];

            if (isCollise(floatingBonus, rocket)) {
                console.log(floatingBonus);
                new Explosions(rocket.x, rocket.y, floatingBonus.style, 50);
                for(let i = 0; i<rocketAmmo.length; i++){
                    rocketAmmo[i] += i * floatingBonus.rocketsAmount;
                }

                playSound('sfx/increase-sfx.wav', SFXVolume());
                floatingBonuses.splice(i, 1);
            }
        }
    }
}

function isCollise(circle1, circle2) {
    return Math.abs(circle1.x - circle2.x) < circle1.radius + circle2.radius &&
        Math.abs(circle1.y - circle2.y) < circle1.radius + circle2.radius;
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

function createNewFloatingBonusInterval() {
    let probability = 0.4;
    let randomNumber = Math.random();
    if (randomNumber > 1 - probability) {
        newFloatingBonus();
    }
}

function newFloatingBonus() {
    let randomId = Math.floor(Math.random() * (ROCKET_STYLES.length - 1)) + 1;
    let rocketsAmount = randomId * bonusAwardAmount;
    let radius = 40 + rocketsAmount;
    let direction = Math.floor(Math.random() * 2) * 2 - 1;
    let style = ROCKET_STYLES[randomId];
    let initX = gameWidth / 2 + direction * -1 * (gameWidth / 2 + 500);
    let initY = 150;
    // x, y, radius, rocketId, rocketsAmount, style, velocity, direction
    new FloatingBonus(initX, initY, radius, randomId, rocketsAmount, style, 10, direction);
}

function drawFloatingBonus() {
    for (let i = 0; i < floatingBonuses.length; i++) {
        let floatingBonus = floatingBonuses[i];
        if (floatingBonus.x < -1000 || floatingBonuses > gameWidth + 1000) {
            floatingBonuses.splice(i, 1);
            i--;
            continue;
        }
        drawCircleObject(floatingBonus.x, floatingBonus.y, floatingBonus.radius, floatingBonus.style, floatingBonus.rocketsAmount);
        floatingBonus.move();
    }
}





