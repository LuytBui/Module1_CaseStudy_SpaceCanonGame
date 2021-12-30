function canvasMouseDown(event){
    if (playerHealth > 0){
        shoot();
    } else {
        if (Math.abs(event.clientY-gameHeight/2) <130 && event.clientX > gameWidth/2){
            init();
        }
    }
}

function canvasKeyDown(event) {
    switch(event.keyCode){
        case 65:
            playSound('sfx/change-gun-sound.wav', 2*SFXVolume());
            gunId = 0;
            break;
        case 83:
            playSound('sfx/change-gun-sound.wav', 2*SFXVolume());
            gunId = 1;
            break;
        case 68:
            playSound('sfx/change-gun-sound.wav', 2*SFXVolume());
            gunId = 2;
            break;
        case 70:
            playSound('sfx/change-gun-sound.wav', 2*SFXVolume());
            gunId = 3;
            break;
    }
    rocketStyle = ROCKET_STYLES[gunId];
    drawCanon();
}

function shoot() {
    // Hết đạn tự động đổi súng
    while (rocketAmmo[gunId] < 1) {
        gunId --;
    }

    rocketStyle = ROCKET_STYLES[gunId];
    rocketDamage = ROCKET_DAMAGE[gunId];
    rocketMaxHealth = ROCKET_MAX_HEALTH[gunId];
    rocketRadius = ROCKET_RADIUS[gunId];
    rocketVelocity = ROCKET_VELOCITY[gunId];
    rocketAudio = ROCKET_AUDIO[gunId];

    let angle = canonAngle();
    let x = gameWidth / 2 + (CANON_LENGTH + rocketRadius) * Math.cos(angle);
    let y = gameHeight - (CANON_LENGTH + rocketRadius) * Math.sin(angle);
    new Rockets(x, y, angle, rocketRadius,rocketVelocity, rocketDamage,rocketMaxHealth, rocketStyle, rocketAudio);
    rocketAmmo[gunId] --;
    if (gunId === 0){
        rocketAmmo[gunId] = 1000;
    }
}
