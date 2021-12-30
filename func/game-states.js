
let newSpaceShip_IntervalTime;
let newFloatingBonus_IntervalTime;
let maxSpaceShip_Count;
let maxSpaceShip_Health;
let minSpaceShip_Health;
let newSpaceShip_Probability;
let bonusAwardAmount;
const CANON_LENGTH = 90;
let playTime;

function  initEnvironment(){
    newSpaceShip_IntervalTime = 1000;
    newFloatingBonus_IntervalTime = 10000;
    maxSpaceShip_Count = 8;
    maxSpaceShip_Health = 7;
    minSpaceShip_Health = 1;
    newSpaceShip_Probability = 0.5;
    bonusAwardAmount = 1;
}


function displayPlayerHealth() {
    checkMilestones();
    let img = new Image();
    img.src = 'img/heart-small.png';
    for (let i = 0; i < playerHealth; i++) {
        ctx.drawImage(img, 30 + (35 + 10) * i, 20, 35, 35);
    }
}

let milestones = [80, 160, 310, 500, 700, 1000, 1300, 1600, 2000, 2500, 3000, 3500, 4000, 4500, 5000];
let milestoneIndex;
function checkMilestones(){
    if (milestoneIndex < milestones.length && score >= milestones[milestoneIndex] ) { // nếu vượt qua một ngưỡng
        playerHealth++;
        rocketAmmo[1]+=20;
        rocketAmmo[2]+=10;
        rocketAmmo[3]+=5;

        newSpaceShip_IntervalTime -= 45;
        maxSpaceShip_Count +=1;
        maxSpaceShip_Health += 2;
        minSpaceShip_Health += 0.5;
        newSpaceShip_Probability +=0.04;
        bonusAwardAmount +=0.5;

        playSound('sfx/increase-sfx.wav', SFXVolume());
        milestoneIndex++;
    }
}

function destroySpaceShipReward(spaceShip){
    let spaceShipMaxHealth = spaceShip.maxHealth;
    if (spaceShipMaxHealth<=4){
        rocketAmmo[1]+=1;
        return;
    }
    if (spaceShipMaxHealth<=6){
        rocketAmmo[1]+=3;
        rocketAmmo[2]+=2;
        return;
    }
    if (spaceShipMaxHealth<=8){
        rocketAmmo[2]+=1;
        rocketAmmo[3]+=1;
        return;
    }
    rocketAmmo[2]+=1;
}

function updateScore() {
    let string = 'POINTS: ' + score;
    ctx.font = '1.75rem' + ' Garamond';
    ctx.fillStyle = 'yellow';
    ctx.textAlign = 'left';
    ctx.fillText(string, 30, 94);

    // document.getElementById('score').innerText = score;
    // document.getElementById('playerHealth').innerText = playerHealth;
}


function updatePlayTime() {
    if (playerHealth > 0) {
        let nowTime = new Date().getTime();
        let different = (nowTime - initTimeStamp) / 1000;
        let minutes = Math.floor(different / 60);
        let seconds = Math.floor(different % 60);
        playTime = pad(minutes, 2) + ':' + pad(seconds, 2);
    }
    ctx.font = '2rem' + ' Arial';
    ctx.fillStyle = '#afded0';
    ctx.textAlign = 'left';
    ctx.fillText(playTime, 20, gameHeight - 20);

    function pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }
}


// function updateStage() {
//     let nowTime = new Date().getTime();
//     let different = nowTime - initTimeStamp;
//
//     if (different < STAGE_1_LENGTH) {
//         stage = 1;
//     } else if (different < STAGE_1_LENGTH + STAGE_2_LENGTH / 2) {
//         stage = 2;
//     } else if (different < STAGE_1_LENGTH + STAGE_2_LENGTH) {
//         stage = 2.5;
//     } else {
//         stage = 3;
//     }
//     setStageEnvironment(stage);
// }

function gameOver() {
    stopMusic();
    if (score > highScore){
        highScore = score;
        localStorage.setItem('HighScore', highScore);
    }

    ctx.fillStyle = '#ec0d0d';
    ctx.globalAlpha = 0.35;
    ctx.fillRect(0,gameHeight/2-160, gameWidth,310);
    ctx.globalAlpha = 1;
    ctx.font = '80px' + ' Georgia';
    ctx.fontWeight= 'bold';
    ctx.fillStyle = '#ffed0f';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER!', gameWidth / 2, gameHeight / 2-70);

    ctx.textAlign = 'left';
    ctx.font = '40px' + ' Times New Roman';
    ctx.fontWeight= 'normal';
    ctx.fillStyle = '#fffeca';
    ctx.fillText('SURVIVE TIME: ' + playTime, gameWidth / 2 - 500, gameHeight / 2 );
    ctx.fillText('SCORE: ' + score, gameWidth / 2 - 500, gameHeight / 2 + 50);
    ctx.fillText('HIGHSCORE: ' + highScore, gameWidth / 2 - 500, gameHeight / 2 + 100);

    ctx.font = '60px' + ' Times New Roman';
    ctx.fillStyle = '#01b80b';
    ctx.textAlign = 'right';
    ctx.fillText('CLICK TO', gameWidth / 2 + 500, gameHeight / 2 +20 );
    ctx.fillText('PLAY AGAIN', gameWidth / 2 + 500, gameHeight / 2 + 70);
}

