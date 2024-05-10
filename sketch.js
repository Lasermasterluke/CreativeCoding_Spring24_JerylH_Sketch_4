let letters = [];
let columns = Array(26).fill(0); // array to keep track of the count of letters in each column

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  textSize(24);
  textAlign(CENTER, CENTER);
  fill(255);
}

function draw() {
  background(0); // set background to black

  // display all letters
  for (let i = 0; i < letters.length; i++) {
    let letter = letters[i];
    // update and display each letter
    letter.update();
    letter.display();
  }
}

function keyPressed() {
  // add new letter to the array
  if (keyCode >= 65 && keyCode <= 90) { // check if the key is a letter
    let index = key.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
    let targetX = map(index, 0, 25, 50, width - 50);
    let targetY = height - 50 - (columns[index] * 30); // calculate targetY based on how many are already in the column
    letters.push(new Letter(key.toUpperCase(), width / 2, height / 2, targetX, targetY));
    columns[index]++; // increment the count for that column
  }
}

class Letter {
  constructor(char, x, y, targetX, targetY) {
    this.char = char;
    this.pos = createVector(x, y);
    this.target = createVector(targetX, targetY);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
  }

  update() {
    // calculate the direction towards the target
    let force = p5.Vector.sub(this.target, this.pos);
    force.setMag(0.2); // reduce the magnitude to slow down movement
    this.acc.add(force);
    this.vel.add(this.acc);
    this.vel.mult(0.95); // damping to slow down gradually
    this.pos.add(this.vel);
    this.acc.mult(0); // reset acceleration
    
    // add a small random movement to simulate shaking
    this.pos.x += random(-.25, .25);
    this.pos.y += random(-.25, .25);
  }

  display() {
    fill(255);
    text(this.char, this.pos.x, this.pos.y);
  }
}
