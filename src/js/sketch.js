let peas = [];
let nodes = [];
let isFading = true;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  for (let i = 0; i < 750; i++) {
    peas.push(new Pea());
  }
}

function draw() {
  if (isFading) fade();
  else background(255);

  for (let p = 0; p < peas.length; p++) {
    for (let n = 0; n < nodes.length; n++) {
      peas[p].seek(nodes[n].pos());
    }
    if (nodes.length > 0) {
      peas[p].move(nodes.length);
    }
    peas[p].display();
  }

  for (let i = 0; i < nodes.length; i++) {
    nodes[i].display();
  }
}

function mouseClicked() {
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].isDeleted(mouseX, mouseY)) {
      nodes.splice(i, 1);
      return;
    }
  }
  nodes.push(new Node(mouseX, mouseY));
}

// Space: toggle fading trail
// Number keys 1-9: change acceleration rate
function keyPressed() {
  if (key === ' ') {
    isFading = !isFading;
  } else if (keyCode > 48 && keyCode < 58) {
    for (let p = 0; p < peas.length; p++) {
      peas[p].accMultEquals((keyCode - 47) * 0.5);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function fade() {
  noStroke();
  fill(255, 20);
  rect(0, 0, width, height);
}

class Node {
  constructor(_x, _y) {
    this.loc = createVector(_x, _y);
    this.r = random(50, 150);
    this.g = random(0, 100);
    this.b = random(100, 250);
    this.a = 100;
  }

  pos() {
    return this.loc;
  }

  isDeleted(_x, _y) {
    return dist(_x, _y, this.loc.x, this.loc.y) <= 10;
  }

  display() {
    fill(this.r, this.g, this.b, this.a);
    noStroke();
    ellipse(this.loc.x, this.loc.y, 20, 20);
  }
}

class Pea {
  constructor() {
    this.loc = createVector(random(width), random(height));
    this.ploc = createVector(this.loc.x, this.loc.y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.accMult = 0.1;
    this.velLimit = 10;
    this.r = random(100, 250);
    this.g = random(50, 150);
    this.b = random(0, 100);
    this.a = 255;
  }

  seek(_n) {
    let n = p5.Vector.sub(_n, this.loc);
    this.acc = p5.Vector.add(n, this.acc);
  }

  move(_i) {
    this.acc.div(_i);
    this.acc.normalize();
    this.acc.mult(this.accMult);
    this.vel.add(this.acc);
    this.vel.limit(this.velLimit);
    this.loc.add(this.vel);
  }

  accMultEquals(_m) {
    this.accMult = _m * 0.1;
  }

  display() {
    stroke(this.r, this.g, this.b, this.a);
    strokeWeight(3);
    line(this.loc.x, this.loc.y, this.ploc.x, this.ploc.y);
    this.ploc.set(this.loc);
  }
}
