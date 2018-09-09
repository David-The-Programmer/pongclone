// Width of the canvas
const CANVAS_WIDTH = 600;

// Height of the canvas
const CANVAS_HEIGHT = 600;

// width of the paddle
const PADDLE_WIDTH = 20;

// height of the paddle
const PADDLE_HEIGHT = 70;

// diameter of the ball
const BALL_DIAMETER = 20;

// x coordinate of the left paddle
const X_OF_LEFT_PAD = CANVAS_WIDTH * 0.1;

// x coordinate of the right paddle
const X_OF_RIGHT_PAD = CANVAS_WIDTH * 0.9 - PADDLE_WIDTH;

// rate at which paddle moves up or down
const PAD_MOVE_SPEED = 10;

// maximum speed the ball can travel
const MAX_BALL_SPEED = 8;


function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  leftPaddle = new Paddle(X_OF_LEFT_PAD, CANVAS_HEIGHT / 2 - (PADDLE_HEIGHT / 2), PADDLE_WIDTH, PADDLE_HEIGHT);
  rightPaddle = new Paddle(X_OF_RIGHT_PAD, CANVAS_HEIGHT / 2 - (PADDLE_HEIGHT / 2), PADDLE_WIDTH, PADDLE_HEIGHT);
  ball = new Ball(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, BALL_DIAMETER);
}

function draw() {
  background(0);
  leftPaddle.draw();
  rightPaddle.draw();
  ball.draw();
  drawingMidLine();
  // if the up arrow key is pressed, then move the right paddle upwards
  if(keyIsDown(UP_ARROW)) {
    rightPaddle.direction(-PAD_MOVE_SPEED);
    // if the down arrow key is pressed, then move the right paddle downwards
  } else if(keyIsDown(DOWN_ARROW)) {
    rightPaddle.direction(PAD_MOVE_SPEED);
  } else {
    // if no key/other keys are pressed, do not move the right paddle
    rightPaddle.yVel = 0;
  }
  leftPaddle.direction(yVelOfBall);
  leftPaddle.move();
  rightPaddle.move();
  ball.move(xVelOfBall, yVelOfBall);
  checkForCollision();
  displayScore();
  updateBallSpeed();


}


// function for drawing the mid line between the paddles
function drawingMidLine() {
  stroke(255);
  line(CANVAS_WIDTH / 2, 0, CANVAS_WIDTH / 2, CANVAS_HEIGHT);
}

// checks if the ball has collided with the paddle or the top or bottom walls
function checkForCollision() {
  if(ball.collide(leftPaddle)) {
    if(xVelOfBall < 0) {
      xVelOfBall *= -1;
    }
  } else if(ball.collide(rightPaddle)) {
    if(xVelOfBall > 0) {
      xVelOfBall *= -1;
    }
  }

  // if the ball hits the top or bottom walls, let the ball bounce off the walls
  if(ball.y - BALL_DIAMETER / 2 <= 0 || ball.y + BALL_DIAMETER / 2 >= CANVAS_HEIGHT) {
    yVelOfBall *= -1;
  }
  // if the left player misses the ball, add the score to the right player
  if(ball.x - BALL_DIAMETER / 2 <= 0) {
    rightPlayerScore++;
    playerScored = true;
    // if the right player misses the ball, add the score to the left player
  } else if(ball.x + BALL_DIAMETER / 2 >= CANVAS_WIDTH) {
    leftPlayerScore++;
    playerScored = true;
  }
  // if either player has scored, reset the ball's position to the centre of the screen
  // reset the speed of the ball to allow player to have enough time to react
  if(playerScored) {
    playerScored = false;
    ball.x = CANVAS_WIDTH / 2;
    ball.y = CANVAS_HEIGHT / 2;
    if(random(0, 1) > 0.5) {
      xVelOfBall = 2;
      yVelOfBall = -2;
    } else {
      xVelOfBall = 2;
      yVelOfBall = 2;
    }

  }
}

// function for updating the score
function displayScore() {
  stroke(255);
  textSize(30);
  text(leftPlayerScore, CANVAS_WIDTH * 0.4 , 30);
  text(rightPlayerScore, CANVAS_WIDTH / 2 + ((CANVAS_WIDTH * 0.1) - 20), 30);
}

// function updates the ball speed so that it increases over time
function updateBallSpeed() {
  if(frameCount % 100 == 0 ) {
    if(xVelOfBall > 0 && xVelOfBall < MAX_BALL_SPEED) {
      xVelOfBall++;
    } else if(xVelOfBall < 0 && xVelOfBall > -MAX_BALL_SPEED) {
      xVelOfBall--;
    }

    if(yVelOfBall > 0 && yVelOfBall < MAX_BALL_SPEED) {
      yVelOfBall++;
    } else if(yVelOfBall < 0 && yVelOfBall > -MAX_BALL_SPEED) {
      yVelOfBall--;
    }

  }
}

// paddle objects
let leftPaddle;

let rightPaddle;

// ball object
let ball;

// x velocity of the ball
xVelOfBall = 2;

// y velocity of the ball
yVelOfBall = 2;

// score for left player
let leftPlayerScore = 0;

// score for right player
let rightPlayerScore = 0;

// boolean to determine if either player has scored
let playerScored = false;

// bugs to fix:
// sound
// reseting of ball speed when ball position is reset(FIXED)
// AI for left paddle is crap(KINDA FIXED)
//
