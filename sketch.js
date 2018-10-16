var stars = [];
var blackHoleRadius = 30;

function starCreator(n, dmin, dmax) {
  var array = [];
  while (n > 0) {
    var d = random(dmin, dmax);
    var x = random(d, width - d);
    var y = random(d, height - d);
    array.push(new Star(x, y, d));
    n--;
  }
  return array;
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  stars = starCreator(100, 5, 20);
  for (var i = 0; i < stars.length; i++) {
    stars[i].display();
  }

  ellipseMode(RADIUS)

}

function draw() {
  background(10);

  noFill();
  stroke(255);
  strokeWeight(5);
  ellipse(mouseX, mouseY, blackHoleRadius + 2);
  fill(0);
  stroke(230, 43, 255);
  strokeWeight(5);
  ellipse(mouseX, mouseY, blackHoleRadius);

  for (var i = 0; i < stars.length; i++) {
    stars[i].followMouse();
  }
}

function mouseClicked() {
  stars = starCreator(100, 5, 20);
}

function Star(x, y, diameter) {

  this.size = diameter;
  this.x = x;
  this.y = y;

  this.color = [255, random(200, 255), 0];
  this.speed = 0;
  this.isDead = false;

  // Methods
  this.followMouse = function() {
    var yDiff = this.y - mouseY;
    var xDiff = this.x - mouseX;
    var distance = sqrt(pow(yDiff, 2) + pow(xDiff, 2));
    var angle = Math.atan(yDiff / xDiff);
    this.speed = 3000 / this.size * 50 / pow(distance, 2);

    if (mouseX === 0 && mouseY === 0) {
      this.display();
      return;
    }

    if (distance < blackHoleRadius) {
      this.isDead = true;
    }

    if (mouseX > this.x && (mouseY > this.y && angle > 0 || mouseY < this.y && angle < 0)) {
      this.x += this.speed * cos(angle);
      this.y += this.speed * sin(angle);
    } else if (mouseX < this.x && (mouseY > this.y && angle < 0 || mouseY < this.y && angle > 0)) {
      this.x += this.speed * -cos(angle);
      this.y += this.speed * -sin(angle);
    }

    this.display();
  }

  this.display = function() {
    if (this.isDead) {
      return;
    }
    fill(this.color);
    noStroke();
    ellipseMode(RADIUS);
    ellipse(this.x, this.y, this.size);
  }
}
