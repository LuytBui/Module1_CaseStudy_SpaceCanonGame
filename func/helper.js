let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let score;
let playerHealth;
let gunId;
let rocketStyle, rocketDamage,rocketMaxHealth, rocketRadius, rocketVelocity, rocketAudio;
let rocketAmmo = [];

let gameWidth = canvas.width;
let gameHeight = canvas.height;
let pointerX = -1;
let pointerY = -1;
let rockets;
let explosions;
let spaceShips;
let floatingBonuses;

let initTimeStamp;
// const STAGE_1_LENGTH = 60000 + 22000;   // millisecond
// const STAGE_2_LENGTH = 60000 * 2 + 49000;   // millisecond


const MISSED_OUT_SOUND = 'sfx/mixkit-wrong-answer-bass-buzzer-948.wav';
const STAGE_1_MUSIC = 'sfx/Music-Slow.mp3';
const STAGE_2_MUSIC = 'sfx/Music-Normal.mp3';
const STAGE_3_MUSIC = 'sfx/Music-Fast.mp3';
const ROCKET_CHANGE_HOTKEY = ['A', 'S', 'D', 'F'];
const ROCKET_STYLES = ['#bc4218', '#537849', '#ffed0f', '#5bd2ff'];

const ROCKET_DAMAGE = [1, 2, 3, 6];
const ROCKET_MAX_HEALTH = [1, 2, 5, 30];
const ROCKET_RADIUS = [10, 10, 20, 30];
const ROCKET_VELOCITY = [12, 15, 27, 21];
const ROCKET_AUDIO= ['sfx/gun-sound-id-00.wav', 'sfx/gun-sound-id-01.wav', 'sfx/gun-sound-id-02.wav', 'sfx/gun-sound-id-03.wav'];
const ROCKET_AMMO_INIT = [1000, 20, 10, 5];

let music;
let update_Interval;
let newSpaceShip_Interval;
let newFloatingBonus_Interval;
let highScore;

function init() {
    initEnvironment();
    gunId = 0;
    rocketStyle = ROCKET_STYLES[gunId];
    rocketDamage = ROCKET_DAMAGE[gunId];
    rocketRadius = ROCKET_RADIUS[gunId];
    rocketVelocity = ROCKET_VELOCITY[gunId];
    rocketAudio = ROCKET_AUDIO[gunId];
    rocketAmmo = [];
    for (let i = 0; i < ROCKET_AMMO_INIT.length; i++) {
        rocketAmmo[i] = ROCKET_AMMO_INIT[i];
    }

    rockets = [];
    explosions = [];
    spaceShips = [];
    floatingBonuses = [];
    score = 0;
    milestoneIndex = 0;
    playerHealth = 2;
    playTime = '00:00';

    initTimeStamp = new Date().getTime();
    highScore = localStorage.getItem('HighScore');
    if (highScore == null) highScore = 0;

    update_Interval = setInterval(update, 1000 / 60);
    newSpaceShip_Interval = setInterval(newSpaceShip, newSpaceShip_IntervalTime);
    newFloatingBonus_Interval = setInterval(createNewFloatingBonusInterval, newFloatingBonus_IntervalTime);
    musicIndex = 0;
    isMusicPlaying = false;
}

function drawBG() {
    let backgroundImage = new Image();
    backgroundImage.src = 'img/Sky-Stars-Pattern.jpg';
    ctx.drawImage(backgroundImage, 0, 0, gameWidth, gameHeight);
}

function SFXVolume() {
    return 0.2;
}

function musicVolume() {
    return 0.1;
}


let musics = [STAGE_1_MUSIC, STAGE_2_MUSIC, STAGE_3_MUSIC];
let musicIndex = 0;

function playMusic() {
    isMusicPlaying = true;
    music = playSound(musics[musicIndex], musicVolume());
}
let isMusicPlaying;
function checkMusic() {
    if (!isMusicPlaying) {
        playMusic();
    }
    if (music.ended) {
        if (musicIndex !== musics.length) {
            musicIndex++;
        }
        playMusic();
    }
}

function stopMusic() {
    if (music === null || music === undefined) {
        console.log(music);
       return;
    }
    isMusicPlaying = false;
    music.pause();
}

function playSound(src, volume) {
    let audio = new Audio(src);
    audio.muted = true;
    audio.volume = volume;
    // audio.volume = 0;
    audio.muted = false;
    audio.play();
    return audio;
}


function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
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


function clearCanvas() {
    ctx.clearRect(-1 * gameWidth, -1 * gameHeight, 2 * gameWidth, 2 * gameHeight);
}