class Ball {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.diameter = d;
  }

  draw() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }

  move(xVel, yVel) {
    this.x += xVel;
    this.y += yVel;
  }

  // function for checking if ball collided with any object
  collide(object) {
    if(this.x >= object.x && this.x <= object.x + object.width) {
      if(this.y >= object.y && this.y <= object.y + object.height) {
        return true;
      }
    }
  }
}
