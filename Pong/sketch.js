// Width of the canvas
const CANVAS_WIDTH = 600;

// Height of the canvas
const CANVAS_HEIGHT = 600;

// width of the paddle
const PADDLE_WIDTH = 20;

// height of the paddle
const PADDLE_HEIGHT = 80;

// diameter of the ball
const BALL_DIAMETER = 20;

// x coordinate of the left paddle
const X_OF_LEFT_PAD = CANVAS_WIDTH * 0.1;

// x coordinate of the right paddle
const X_OF_RIGHT_PAD = CANVAS_WIDTH * 0.9 - PADDLE_WIDTH;

// rate at which paddle moves up or down
const PAD_MOVE_SPEED = 10;

// maximum speed the ball can travel
const MAX_BALL_SPEED = 12;

function preload() {
  hitWallSound = loadSound('pong_sounds/pong_hit_wall.mp3');
  hitPaddleSound = loadSound('pong_sounds/pong_hit_paddle.mp3');
  playerMissSound = loadSound('pong_sounds/pong_player_miss_ball.mp3');
}


function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  leftPaddle = new Paddle(X_OF_LEFT_PAD, CANVAS_HEIGHT / 2 - (PADDLE_HEIGHT / 2), PADDLE_WIDTH, PADDLE_HEIGHT);
  rightPaddle = new Paddle(X_OF_RIGHT_PAD, CANVAS_HEIGHT / 2 - (PADDLE_HEIGHT / 2), PADDLE_WIDTH, PADDLE_HEIGHT);
  ball = new Ball(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, BALL_DIAMETER);
}

function draw() {
  if(numTurnsForLeftPlayer == 0 || numTurnsForRightPlayer == 0) {
    fill(255);
    textSize(30);
    if(rightPlayerScore == 10) {
      text("You Win", CANVAS_WIDTH / 2 - 60, CANVAS_HEIGHT / 2);
    } else if (leftPlayerScore == 10) {
      text("You Lose", CANVAS_WIDTH / 2 - 60, CANVAS_HEIGHT / 2);
    }
    noLoop();
  } else {
    background(0);
    leftPaddle.draw();
    rightPaddle.draw();
    ball.draw();
    drawingMidLine();
    leftPaddle.computeDirection(ball.y, ball.magVelOfBall);
    leftPaddle.move();
    rightPaddle.move();
    ball.update();
    checkForCollision();
    displayScore();
    updateBallSpeed();
  }

}

// function for drawing the mid line between the paddles
function drawingMidLine() {
  stroke(255);
  line(CANVAS_WIDTH / 2, 0, CANVAS_WIDTH / 2, CANVAS_HEIGHT);
}

// checks if the ball has collided with the paddle or the top or bottom walls
function checkForCollision() {

  if(ball.collide(leftPaddle)) {
    // checks for the segment of the paddle which the ball has collided into
    // and sets the angle which the ball bounces of the paddle
    ball.checkForLeftPaddleSegment(leftPaddle);
    if(ball.xVel < 0) {
      ball.xVel *= -1;
    }
    hitPaddleSound.play();

  } else if(ball.collide(rightPaddle)) {
    ball.checkForRightPaddleSegment(rightPaddle);
    if(ball.xVel > 0) {
      ball.xVel *= -1;
    }
    hitPaddleSound.play();
  }

  // if the ball hits the top or bottom walls, let the ball bounce off the walls
  if(ball.y - BALL_DIAMETER / 2 <= 0 || ball.y + BALL_DIAMETER / 2 >= CANVAS_HEIGHT) {
    ball.yVel *= -1;
    hitWallSound.play();
  }
  // if the left player misses the ball, add the score to the right player
  if(ball.x - BALL_DIAMETER / 2 <= 0) {
    rightPlayerScore++;
    playerScored = true;
    playerMissSound.play();
    numTurnsForLeftPlayer--;
    // if the right player misses the ball, add the score to the left player
  } else if(ball.x + BALL_DIAMETER / 2 >= CANVAS_WIDTH) {
    leftPlayerScore++;
    playerScored = true;
    playerMissSound.play();
    numTurnsForRightPlayer--;
  }
  // if either player has scored, reset the ball's position to the centre of the screen
  // reset the speed of the ball to allow player to have enough time to react
  if(playerScored) {
    playerScored = false;
    ball.x = CANVAS_WIDTH / 2;
    ball.y = CANVAS_HEIGHT / 2;
    ball.magVelOfBall = 4;
    ball.xVel = ball.magVelOfBall * cos(random(-45, 45));
    ball.yVel = ball.magVelOfBall * sin(random(-45, 45));
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
    if(ball.magVelOfBall > 0 && ball.magVelOfBall < MAX_BALL_SPEED) {
      ball.magVelOfBall++;
    }
  }
}

// paddle objects
let leftPaddle;

let rightPaddle;

// ball object
let ball;

// score for left player
let leftPlayerScore = 0;

// score for right player
let rightPlayerScore = 0;

// boolean to determine if either player has scored
let playerScored = false;

// sound when ball hits the walls
let hitWallSound;

// sound when ball hits the paddles
let hitPaddleSound;

// sound when player misses the ball
let playerMissSound;

// the number of turns the left player gets
let numTurnsForLeftPlayer = 10;

// the number of turns the right player gets
let numTurnsForRightPlayer = 10;


// bugs to fix:
// sound(FIXED)
// reseting of ball speed when ball position is reset(FIXED)
// AI for left paddle is crap(FIXED)
// Number of turns should be 10(FIXED)
// The angle which the ball travels should be dependent on what part the paddle is hit by the ball
// the paddle is divided into 8 different parts, and the ball would reflect of the paddle at different
// angles based on what part the ball is hitting the paddle(FIXED)
// Collision and reflection of the ball should occur when the edge of the ball hits the paddle,
// and not the centre of the ball(FIXED)
