
class SpaceShips {
    static audioSrc = 'sfx/55849__sergenious__ship.wav';
    static MIN_RADIUS = 30;
    static RADIUS_INTERVAL = 5;
    static MAX_V = 15;
    static V_INTERVAL = 1;
    x;
    y;
    radius;
    health;
    maxHealth;
    style;
    explode;
    velocity;

    constructor(x, y, health, style) {
        this.x = x;
        this.y = y;
        this.health = health;
        this.maxHealth = health;
        this.style = style;
        this.radius = SpaceShips.MIN_RADIUS + SpaceShips.RADIUS_INTERVAL * health;
        this.velocity = SpaceShips.MAX_V - this.health * SpaceShips.V_INTERVAL;
        this.explode = false;
        spaceShips.push(this);
        playSound(SpaceShips.audioSrc, SFXVolume());
    }

    move() {
        this.x += (Math.random() - 0.5) * this.velocity * 2;
        this.y += Math.random() * 0.5 * this.velocity;
        if (this.x > gameWidth - this.radius) {
            this.x = gameWidth - this.radius;
        }
        if (this.x < 0) {
            this.x = 0;
        }
    }

    draw() {
        drawCircleObject(this.x, this.y, this.radius, this.style, this.health);
    }

    takeDamageFrom(damageSource) {
        let damage = damageSource.health > damageSource.damage ? damageSource.damage : damageSource.health;
        this.health -= damage;
        if (this.health < 0) {
            this.health = 0;
        }
        //Trúng đạn làm tàu nhỏ dần
        this.radius = SpaceShips.MIN_RADIUS + SpaceShips.RADIUS_INTERVAL * this.health;
    }
} // end of class define


