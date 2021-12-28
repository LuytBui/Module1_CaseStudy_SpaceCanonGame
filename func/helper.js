let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let console1 = document.getElementById('console1');
let console2 = document.getElementById('console2');
let score = 0;
let playerHealth = 5;


let initTimeStamp;
function init(){
    ctxSwitchToCenter();
    // initTimeStamp = Date.now();
    playMusic();
}

function drawBG(){
    let backgroundImage = new Image();
    backgroundImage.src = 'img/Sky-Stars-Pattern.jpg';
        ctx.drawImage(backgroundImage,-1* canvas.width/2,0,canvas.width,canvas.height);
}
function SFXVolume(){
    return 0.2;
}
function musicVolume(){
    return 0.1;
}

let music;
function playMusic(){
    let musicaAudioSrc = 'sfx/slow-2021-08-30_-_Boss_Time_-_www.FesliyanStudios.com.mp3';
    music = playSound(musicaAudioSrc,SFXVolume(),musicVolume());
}
function stopMusic(){
    music.stop;
}

function playSound(src, volume){
    let audio = new Audio(src);
    audio.volume = volume;
    // audio.volume = 0;
    audio.play();
    return audio;
}


function ctxSwitchToCenter() {
    // Chuyển hệ trục tọa độ về mép dưới, chính giữa màn hình
    ctx.translate(canvas.width / 2, canvas.height);
    ctx.scale(1, -1);
}
function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}
