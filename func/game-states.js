let lastScoreMilestone = 0;
function displayPlayerHealth(){

    if (score - lastScoreMilestone>= 100){ //Thêm 1 mạng cứ mỗi 100 điểm
        playerHealth++;
        lastScoreMilestone = Math.floor(score/100)*100;
        playSound('sfx/increase-sfx.wav',SFXVolume())
    }

    let img = new Image();
    img.src = 'img/heart-small.png';
    ctx.transform(1, 0, 0, -1, 0, 0);
    for (let i = 0; i< playerHealth; i++){
        ctx.drawImage(img, 30+ (35+10)*i - canvas.width / 2,-1 * canvas.height+20, 35,35);
    }
    ctx.transform(1, 0, 0, -1, 0, 0);
}

function updateScore() {
    let string = 'Điểm: ' + score;
    ctx.font = '2rem' + ' Arial';
    ctx.fillStyle = 'yellow';
    ctx.textAlign = 'left';
    ctx.transform(1, 0, 0, -1, 0, 0);
    ctx.fillText(string, 30 - canvas.width / 2, -1 * canvas.height + 94);
    ctx.transform(1, 0, 0, -1, 0, 0);

    // document.getElementById('score').innerText = score;
    // document.getElementById('playerHealth').innerText = playerHealth;
}


