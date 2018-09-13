class Ball {
  constructor(x, y, d) {
    this.x = x;
    this.y = y;
    this.diameter = d;
    this.xVel = 4;
    this.yVel = 4;
    this.magVelOfBall = 5;
  }

  draw() {
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }

  update() {
    this.x += this.xVel;
    this.y += this.yVel;
  }

  // function for checking if ball collided with any object
  collide(object) {
    if(object.x == X_OF_LEFT_PAD) {
      if(this.x - BALL_DIAMETER / 2 >= object.x && this.x - BALL_DIAMETER / 2 <= object.x + object.width) {
        if(this.y + BALL_DIAMETER / 2 >= object.y && this.y - BALL_DIAMETER / 2 <= object.y + object.height) {
          return true;
        }
      }
    } else if(object.x == X_OF_RIGHT_PAD) {
      if(this.x + BALL_DIAMETER / 2 >= object.x && this.x + BALL_DIAMETER / 2 <= object.x + object.width) {
        if(this.y + BALL_DIAMETER / 2 >= object.y && this.y - BALL_DIAMETER / 2 <= object.y + object.height) {
          return true;
        }
      }
    }

  }

  // function for checking which part of the paddle is hit by the ball and set the angle which the ball
  // reflects off the paddle
  checkForRightPaddleSegment(object) {
    angleMode(DEGREES);
    // if the ball hits the 1st segment on top of the paddle, reflect the ball at -135 degrees
    if(this.y >= object.y && this.y < object.y + PADDLE_HEIGHT * (1/8)) {
      this.xVel = this.magVelOfBall * cos(-135);
      this.yVel = this.magVelOfBall * sin(-135);

        // if the ball hits the 2nd segment of the paddle, reflect the ball at -150 degrees
    } else if(this.y >= object.y + PADDLE_HEIGHT * (1/8) && this.y < object.y + PADDLE_HEIGHT * (2/8)) {
      this.xVel = this.magVelOfBall * cos(-150);
      this.yVel = this.magVelOfBall * sin(-150);

        // if the ball hits the 3rd segment of the paddle, reflect the ball at -165 degrees
    } else if(this.y >= object.y + PADDLE_HEIGHT * (2/8) && this.y < object.y + PADDLE_HEIGHT * (3/8)) {
      this.xVel = this.magVelOfBall * cos(-165);
      this.yVel = this.magVelOfBall * sin(-165);

        // if the ball hits the 4th segment of the paddle, reflect the ball at 180 degrees
    } else if(this.y >= object.y + PADDLE_HEIGHT * (3/8) && this.y < object.y + PADDLE_HEIGHT * (4/8)) {
      this.xVel = this.magVelOfBall * cos(180);
      this.yVel = this.magVelOfBall * sin(180);

        // if the ball hits the 5th segment of the paddle, reflect the ball at 180 degrees
    }else if(this.y >= object.y + PADDLE_HEIGHT * (4/8) && this.y < object.y + PADDLE_HEIGHT * (5/8)) {
      this.xVel = this.magVelOfBall * cos(180);
      this.yVel = this.magVelOfBall * sin(180);

        // if the ball hits the 6th segment of the paddle, reflect the ball at 165 degrees
    }else if(this.y >= object.y + PADDLE_HEIGHT * (5/8) && this.y < object.y + PADDLE_HEIGHT * (6/8)) {
      this.xVel = this.magVelOfBall * cos(165);
      this.yVel = this.magVelOfBall * sin(165);

        // if the ball hits the 7th segment of the paddle, reflect the ball at 150 degrees
    }else if(this.y >= object.y + PADDLE_HEIGHT * (6/8) && this.y < object.y + PADDLE_HEIGHT * (7/8)) {
      this.xVel = this.magVelOfBall * cos(150);
      this.yVel = this.magVelOfBall * sin(150);

        // if the ball hits the 8th segment of the paddle, reflect the ball at 135 degrees
    }else if(this.y >= object.y + PADDLE_HEIGHT * (7/8)) {
      this.xVel = this.magVelOfBall * cos(135);
      this.yVel = this.magVelOfBall * sin(135);
    }
  }

  // function for checking which part of the paddle is hit by the ball and set the angle which the ball
  // reflects off the paddle
  checkForLeftPaddleSegment(object) {
    angleMode(DEGREES);
    // if the ball hits the 1st segment on top of the left paddle, reflect the ball at -45 degrees
    if(this.y >= object.y && this.y < object.y + PADDLE_HEIGHT * (1/8)) {
      this.xVel = this.magVelOfBall * cos(-45);
      this.yVel = this.magVelOfBall * sin(-45);

        // if the ball hits the 2nd segment of the left paddle, reflect the ball at -30 degrees
    } else if(this.y >= object.y + PADDLE_HEIGHT * (1/8) && this.y < object.y + PADDLE_HEIGHT * (2/8)) {
      this.xVel = this.magVelOfBall * cos(-30);
      this.yVel = this.magVelOfBall * sin(-30);

        // if the ball hits the 3rd segment of the left paddle, reflect the ball at -15 degrees
    } else if(this.y >= object.y + PADDLE_HEIGHT * (2/8) && this.y < object.y + PADDLE_HEIGHT * (3/8)) {
      this.xVel = this.magVelOfBall * cos(-15);
      this.yVel = this.magVelOfBall * sin(-15);

        // if the ball hits the 4th segment of the left paddle, reflect the ball at 0 degrees
    } else if(this.y >= object.y + PADDLE_HEIGHT * (3/8) && this.y < object.y + PADDLE_HEIGHT * (4/8)) {
      this.xVel = this.magVelOfBall * cos(0);
      this.yVel = this.magVelOfBall * sin(0);

        // if the ball hits the 5th segment of the left paddle, reflect the ball at 0 degrees
    } else if(this.y >= object.y + PADDLE_HEIGHT * (4/8) && this.y < object.y + PADDLE_HEIGHT * (5/8)) {
      this.xVel = this.magVelOfBall * cos(0);
      this.yVel = this.magVelOfBall * sin(0);

        // if the ball hits the 6th segment of the paddle, reflect the ball at 15 degrees
    } else if(this.y >= object.y + PADDLE_HEIGHT * (5/8) && this.y < object.y + PADDLE_HEIGHT * (6/8)) {
      this.xVel = this.magVelOfBall * cos(15);
      this.yVel = this.magVelOfBall * sin(15);

        // if the ball hits the 7th segment of the paddle, reflect the ball at 30 degrees
    } else if(this.y >= object.y + PADDLE_HEIGHT * (6/8) && this.y < object.y + PADDLE_HEIGHT * (7/8)) {
      this.xVel = this.magVelOfBall * cos(30);
      this.yVel = this.magVelOfBall * sin(30);

        // if the ball hits the 8th segment of the paddle, reflect the ball at 45 degrees
    } else if(this.y >= object.y + PADDLE_HEIGHT * (7/8)) {
      this.xVel = this.magVelOfBall * cos(45);
      this.yVel = this.magVelOfBall * sin(45);
    }
  }
}
