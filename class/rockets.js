const ROCKETS_RADIUS = 10;
class Rockets {
    static LIFETIME = 500;
    static V = 10;
    static audioSrc = 'sfx/mixkit-short-laser-gun-shot-1670.wav';
    x;
    y;
    angle;
    age;
    style;
    radius;
    damage;

    constructor(x, y, angle, damage) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.damage = damage;
        this.age = 0;
        this.style = 'blue';
        this.radius = ROCKETS_RADIUS;
        rockets.push(this);
        playSound(Rockets.audioSrc,SFXVolume());
    }

    move() {
        this.x += Rockets.V * Math.cos(this.angle);
        this.y += Rockets.V * Math.sin(this.angle);
        this.age++;
    }
    draw(){
        drawCircleObject(this.x, this.y, this.radius, this.style,'r');
    }

}