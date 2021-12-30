class Rockets {
    static LIFETIME = 500;
    x;
    y;
    angle;
    age;
    style;
    radius;
    damage;
    velocity;
    health;
    maxHealth;

    constructor(x, y, angle, radius, velocity, damage, maxHealth, style, audioSrc) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.damage = damage;
        this.maxHealth = maxHealth;
        this.health = maxHealth;
        this.age = 0;
        this.style = style;
        this.radius = radius;
        this.velocity = velocity;
        rockets.push(this);
        playSound(audioSrc, SFXVolume());
    }

    move() {
        this.x += this.velocity * Math.cos(this.angle);
        this.y -= this.velocity * Math.sin(this.angle);
        this.age++;
    }

    draw() {
        drawCircleObject(this.x, this.y, this.radius, this.style, 'r');
    }

}