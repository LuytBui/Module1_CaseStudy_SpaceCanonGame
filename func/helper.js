let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let score;
let playerHealth;
let gunId;
let rocketStyle, rocketDamage, rocketRadius, rocketVelocity, rocketAudio;
let rocketAmmo = [];

let gameWidth = canvas.width;
let gameHeight = canvas.height;
let pointerX = -1;
let pointerY = -1;
let rockets;
let explosions;
let spaceShips;
let floatingBonus;

let initTimeStamp;
let stage;
// const STAGE_1_LENGTH = 60000 + 22000;   // millisecond
// const STAGE_2_LENGTH = 60000 * 2 + 49000;   // millisecond
const STAGE_1_LENGTH = 60000 + 0000;   // millisecond
const STAGE_2_LENGTH = 60000 + 49000;   // millisecond


const MISSED_OUT_SOUND = 'sfx/mixkit-wrong-answer-bass-buzzer-948.wav';
const STAGE_1_MUSIC = 'sfx/Music-Slow.mp3';
const STAGE_2_MUSIC = 'sfx/Music-Normal.mp3';
const STAGE_3_MUSIC = 'sfx/Music-Fast.mp3';
const ROCKET_CHANGE_HOTKEY = ['A', 'S', 'D', 'F'];
const ROCKET_STYLES = ['#bc4218', '#537849', '#ffed0f', '#5bd2ff'];
const ROCKET_DAMAGE = [1, 2, 3, 6];
const ROCKET_MAX_HEALTH = [1, 2, 5, 30];
const ROCKET_RADIUS = [10, 10, 20, 30];
const ROCKET_VELOCITY = [10, 10, 30, 20];
const ROCKET_AUDIO = ['sfx/rocket.wav', 'sfx/rocket.wav', 'sfx/rocket.wav', 'sfx/rocket.wav'];
const ROCKET_AMMO_INIT = [1000, 20, 10, 5];

let music;
let newSpaceShip_Interval;
let highScore;

function init() {
    stage = 1;
    setStageEnvironment(1);
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
    floatingBonus = [];
    score = 0;
    lastScoreMilestone = 0;
    playerHealth = 1;
    playTime = '00:00';

    initTimeStamp = new Date().getTime();
    newSpaceShip_Interval = setInterval(newSpaceShip, newSpaceShip_IntervalTime);
    highScore = localStorage.getItem('HighScore');
    if (highScore == null) highScore = 0;
    console.log(highScore);
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


let nowPlaying = 0;

function checkMusic() {
    if (stage === 1 && nowPlaying !== stage) {
        music = playSound(STAGE_1_MUSIC, musicVolume());
        nowPlaying = stage;
    }
    if (Math.floor(stage) === 2 && nowPlaying !== Math.floor(stage)) {
        stopMusic();
        music = playSound(STAGE_2_MUSIC, musicVolume());
        nowPlaying = Math.floor(stage);
    }
    if (stage === 3 && nowPlaying !== stage) {
        stopMusic();
        music = playSound(STAGE_3_MUSIC, musicVolume());
        nowPlaying = stage;
    }
}

function stopMusic() {
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
