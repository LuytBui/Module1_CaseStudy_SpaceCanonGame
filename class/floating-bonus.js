class FloatingBonus{
    x;
    y;
    radius;
    rocketId;
    rocketsAmount;
    style;
    velocity;
    direction;
    age;

    constructor(x, y, radius, rocketId, rocketsAmount, style, velocity, direction) {
        this.x = x;
        this.y = y;
        this.rocketId = rocketId;
        this.rocketsAmount = rocketsAmount;
        this.radius = radius;
        this.style = style;
        this.velocity = velocity;
        this.direction = direction;
        this.age = 0;

        floatingBonus.push(this);
    }
    draw(){
        drawCircleObject(this.x, this.y, this.radius, this.style, this.rocketsAmount);
    }
    move(){
        this.x += this.direction * this.velocity;
    }
}