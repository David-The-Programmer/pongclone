class Paddle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.yVel = 0;
  }

  draw() {
    fill(255);
    noStroke();
    rect(this.x, this.y, this.width, this.height);
  }

  move() {
    this.y += this.yVel;
    // constrain the y coordinate of the paddle such that the paddle does not go beyond the walls
    this.y = constrain(this.y, 0, CANVAS_HEIGHT - PADDLE_HEIGHT);
  }
  // direction which the paddles move(up or down)
  direction(yVel) {
    this.yVel = yVel;
  }
}
