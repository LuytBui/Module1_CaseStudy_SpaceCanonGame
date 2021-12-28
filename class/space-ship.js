let newSpaceShip_Interval = 1000;
let maxSpaceShip_Count = 10;
let maxSpaceShip_Health = 10;
let minSpaceShip_Health = 1;


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
    style;
    explode;
    velocity;

    constructor(x, y, health, style) {
        this.x = x;
        this.y = y;
        this.health = health;
        this.style = style;
        this.radius = SpaceShips.MIN_RADIUS + SpaceShips.RADIUS_INTERVAL * health;
        this.velocity = SpaceShips.MAX_V - this.health * SpaceShips.V_INTERVAL;
        this.explode = false;
        spaceShips.push(this);
        playSound(SpaceShips.audioSrc, SFXVolume());
    }

    move() {
        this.x += (Math.random() - 0.5) * this.velocity * 2;
        this.y -= Math.random() * 0.5 * this.velocity;
        if (this.x > canvas.width - this.radius) {
            this.x = canvas.width - this.radius;
        }
        if (this.x < 0) {
            this.x = 0;
        }
    }

    draw() {
        drawCircleObject(this.x, this.y, this.radius, this.style, this.health);
    }

    takeDamageFrom(damageSource) {
        this.health -= damageSource.damage;
        if (this.health < 0) {
            this.health = 0;
        }
        //Trúng đạn làm tàu nhỏ dần
        this.radius = SpaceShips.MIN_RADIUS + SpaceShips.RADIUS_INTERVAL * this.health;
    }
} // end of class define


setInterval(newSpaceShip, newSpaceShip_Interval)

function newSpaceShip() {
    let randomNumber = Math.random();
    if (randomNumber > 0.5 && spaceShips.length < maxSpaceShip_Count) {  // mỗi 1s có 50% cơ hội sinh ra tàu mới
        let shipRandomCoor_x = (Math.random() - 0.5) * canvas.width;
        let shipRandomHealth = minSpaceShip_Health + Math.floor(Math.random() * (maxSpaceShip_Health - minSpaceShip_Health + 1));
        new SpaceShips(shipRandomCoor_x, canvas.height - 100, shipRandomHealth, 'blue');
    }

}