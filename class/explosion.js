class Explosions {
    static audioSrc = 'sfx/mixkit-hand-receiving-a-basketball-2090.wav';
    static V = 10;

    x;
    y;
    style;
    radius;
    maxRadius;


    constructor(x, y, style, maxRadius) {
        this.x = x;
        this.y = y;
        this.style = style;
        this.maxRadius = maxRadius;
        this.radius = 0;
        explosions.push(this);
        playSound(Explosions.audioSrc,2*SFXVolume());
    }

    draw(){
        drawCircleObject(this.x, this.y, this.radius, this.style,'X');
    }

    grow() {
        this.radius += Explosions.V;
    }
}