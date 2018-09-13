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
    // if it is the left paddle that is moving, then continously add a y velocity to the y coordinate of the
    // left paddle
    // if it is the right paddle, then let the y of the paddle be equal to how the mouse is moving
    if(this.x == X_OF_LEFT_PAD) {
      this.y += this.yVel;
    } else if(this.x == X_OF_RIGHT_PAD) {
      this.y = mouseY - PADDLE_HEIGHT / 2;
    }

    // constrain the y coordinate of the paddle such that the paddle does not go beyond the walls
    this.y = constrain(this.y, 0, CANVAS_HEIGHT - PADDLE_HEIGHT);
  }

  // function that would compute the direction the left paddle is taking
  computeDirection(yPositionOfBall, speedOfBall) {
    if(frameCount % 3 == 0) {
      this.yVel = 0;
    } else {
      if(yPositionOfBall <= this.y) {
        if(speedOfBall > 0) {
          speedOfBall *= -1;

        }
        this.yVel = speedOfBall;
      } else if(yPositionOfBall > this.y + PADDLE_HEIGHT) {
        if(speedOfBall < 0) {
          speedOfBall *= -1;
        }
        this.yVel = speedOfBall;
      }
    }

  }
}
