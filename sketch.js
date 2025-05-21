let starPositions = [];
let constellations = [];
let specialStar;
let trees = [];
let distantCityBuildings = [];
let leftCityBuildings = [];

let jaguar, snake, bird;

let telescopeAngle = 0;
let telescopeDirection = 1;

function setup() {
  createCanvas(800, 600);
  noStroke();
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
  textSize(28);
  textFont('Georgia');

  // Estrelas
  for (let i = 0; i < 150; i++) {
    starPositions.push({
      x: random(width),
      y: random(height / 2),
      baseBrightness: random(80, 180),
      flickerSpeed: random(0.5, 1.5)
    });
  }

  specialStar = {
    x: random(300, 600),
    y: random(50, 200),
    size: 8
  };

  for (let i = 0; i < 5; i++) {
    let group = [];
    let cx = random(100, 700);
    let cy = random(50, 250);
    for (let j = 0; j < 4; j++) {
      group.push({
        x: cx + random(-50, 50),
        y: cy + random(-30, 30)
      });
    }
    constellations.push(group);
  }

  // Árvores variadas no campo
  for (let i = 0; i < 20; i++) {
    let x = random(80, 600);
    let y = random(420, 490);
    let size = random(20, 40);
    trees.push({ x, y, size });
  }

  // Prédios distantes na cidade no canto direito
  for (let i = 0; i < 10; i++) {
    let x = 10 + i * 22;
    let h = random(60, 110);
    distantCityBuildings.push({ x, h });
  }

  // Prédios para a cidade no canto esquerdo
  for (let i = 0; i < 8; i++) {
    let x = 20 + i * 30;
    let h = random(80, 140);
    leftCityBuildings.push({ x, h });
  }

  jaguar = new Animal(500, 510, 1.2, 'jaguar');
  snake = new Animal(600, 530, 1.5, 'snake');
  bird = new Animal(550, 460, 2, 'bird');
}

function draw() {
  background(5, 10, 25);
  drawSkyGradient();
  drawMoon();
  drawStars();
  drawSpecialStar();
  drawConstellations();

  drawLeftCity();
  drawDistantCity();
  drawMountainField();

  jaguar.update();
  jaguar.display();

  snake.update();
  snake.display();

  bird.update();
  bird.display();

  drawTelescopeAndPerson();

  fill(240, 240, 220);
  stroke(40);
  strokeWeight(1.5);
  text("Vendo a cidade do campo", width / 2, 30);
  noStroke();
}

function drawSkyGradient() {
  for (let y = 0; y < height / 2; y++) {
    let inter = map(y, 0, height / 2, 0, 1);
    let c = lerpColor(color(5, 10, 25), color(15, 25, 45), inter);
    stroke(c);
    line(0, y, width, y);
  }
  noStroke();
}

function drawMoon() {
  let glow = 40 + 10 * sin(frameCount * 0.8);
  noStroke();
  fill(245, 245, 210, 200);
  ellipse(700, 100, 70 + glow * 0.3, 70 + glow * 0.3);
  fill(230, 230, 180);
  ellipse(700, 100, 60, 60);
  fill(10, 10, 30, 80);
  ellipse(690, 90, 50, 50);
}

function drawStars() {
  noStroke();
  for (let i = 0; i < starPositions.length; i++) {
    let s = starPositions[i];
    let flicker = sin(frameCount * s.flickerSpeed + i) * 30;
    let brightness = constrain(s.baseBrightness + flicker, 50, 255);
    fill(brightness);
    ellipse(s.x, s.y, 2, 2);
  }
}

function drawSpecialStar() {
  let glow = 30 + 20 * sin(frameCount * 0.6);
  fill(255, 255, 180, 100);
  ellipse(specialStar.x, specialStar.y, glow, glow);
  fill(255, 255, 120);
  ellipse(specialStar.x, specialStar.y, specialStar.size, specialStar.size);
}

function drawConstellations() {
  stroke(150, 150, 255, 100);
  strokeWeight(1.3);
  for (let group of constellations) {
    for (let i = 0; i < group.length - 1; i++) {
      line(group[i].x, group[i].y, group[i + 1].x, group[i + 1].y);
    }
  }
  noStroke();
}

function drawLeftCity() {
  push();
  noStroke();
  for (let b of leftCityBuildings) {
    fill(50, 40, 70);
    rect(b.x, height - b.h, 25, b.h, 5);

    fill(255, 215, 70, random(150, 250));
    for (let y = height - b.h + 10; y < height - 10; y += 18) {
      for (let x = b.x + 4; x < b.x + 22; x += 9) {
        if (random() > 0.75) {
          rect(x, y, 5, 10, 1);
        }
      }
    }
  }
  pop();
}

function drawDistantCity() {
  push();
  noStroke();
  for (let b of distantCityBuildings) {
    fill(40, 40, 60);
    rect(b.x, height - b.h, 18, b.h, 4);

    fill(255, 220, 70, random(100, 220));
    for (let y = height - b.h + 10; y < height - 10; y += 15) {
      for (let x = b.x + 3; x < b.x + 15; x += 7) {
        if (random() > 0.7) {
          rect(x, y, 4, 8, 1);
        }
      }
    }
  }
  pop();
}

function drawMountainField() {
  noStroke();

  beginShape();
  fill(55, 80, 45);
  vertex(0, height);
  for (let x = 0; x <= width; x += 20) {
    let y = map(noise(x * 0.015), 0, 1, 440, 480);
    vertex(x, y);
  }
  vertex(width, height);
  endShape(CLOSE);

  // campo verde texturizado
  for (let y = 480; y < height; y += 4) {
    stroke(20, 70, 20);
    line(0, y, width, y);
  }
  noStroke();

  // Árvores
  for (let tree of trees) {
    fill(35, 25, 15, 200);
    rect(tree.x + 3, tree.y + tree.size * 0.3, tree.size * 0.2, tree.size * 0.6, 4);
    fill(70, 50, 25);
    rect(tree.x, tree.y + tree.size * 0.3, tree.size * 0.2, tree.size * 0.6, 4);

    fill(20, 90, 25);
    triangle(tree.x - tree.size * 0.8, tree.y + tree.size * 0.3, tree.x + tree.size * 1.0, tree.y + tree.size * 0.3, tree.x + tree.size * 0.1, tree.y - tree.size * 0.8);
    fill(15, 70, 20);
    triangle(tree.x - tree.size * 0.6, tree.y + tree.size * 0.1, tree.x + tree.size * 0.7, tree.y + tree.size * 0.1, tree.x + tree.size * 0.05, tree.y - tree.size * 0.6);
  }
}

function drawTelescopeAndPerson() {
  let baseX = 250;
  let baseY = 400;

  telescopeAngle += telescopeDirection * 0.5;
  if (telescopeAngle > 30 || telescopeAngle < -30) {
    telescopeDirection *= -1;
  }

  // sombra do tripé
  noStroke();
  fill(20, 20, 20, 180);
  ellipse(baseX + 40, baseY + 35, 80, 15);

  // Tripé
  stroke(70);
  strokeWeight(5);
  line(baseX + 40, baseY - 10, baseX + 10, baseY + 50);
  line(baseX + 40, baseY - 10, baseX + 70, baseY + 50);
  stroke(90);
  strokeWeight(2);
  line(baseX + 10, baseY + 50, baseX + 70, baseY + 50);
  noStroke();

  // Corpo do telescópio com rotação
  push();
  translate(baseX + 40, baseY - 30);
  rotate(telescopeAngle);
  fill(130, 130, 140);
  stroke(80);
  strokeWeight(2);
  rect(0, -12, 70, 24, 10);
  fill(100, 100, 110, 180);
  ellipse(10, 0, 18, 28);
  fill(210, 230, 255);
  ellipse(70, 0, 24, 24);
  fill(255, 255, 255, 140);
  ellipse(75, -6, 12, 8);
  pop();

  // Pessoa
  fill(70, 40, 25);
  ellipse(baseX, baseY, 30, 30);
  fill(110, 70, 40);
  rect(baseX - 14, baseY + 14, 28, 36, 6);
  fill(75, 55, 45);
  rect(baseX - 22, baseY + 44, 14, 24, 4);
  rect(baseX + 10, baseY + 44, 14, 24, 4);
  fill(55, 35, 35);
  rect(baseX + 12, baseY + 8, 14, 32, 6);
  rect(baseX - 28, baseY + 14, 16, 26, 6);
}

// Classe Animal
class Animal {
  constructor(x, y, speed, type) {
    this.pos = createVector(x, y);
    this.speed = speed;
    this.type = type;
    this.dir = random(360);
    this.changeDirTimer = 0;
  }

  update() {
    this.changeDirTimer--;
    if (this.changeDirTimer <= 0) {
      this.dir = random(360);
      this.changeDirTimer = int(random(120, 300));
    }
    let vel = p5.Vector.fromAngle(radians(this.dir));
    vel.setMag(this.speed);
    this.pos.add(vel);
    this.pos.x = constrain(this.pos.x, 100, 700);
    this.pos.y = constrain(this.pos.y, 470, 520);
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    if (this.type === 'jaguar') {
      drawJaguar();
    } else if (this.type === 'snake') {
      drawSnake();
    } else if (this.type === 'bird') {
      drawBird();
    }
    pop();
  }
}

function drawJaguar() {
  fill(160, 110, 60);
  ellipse(0, 0, 60, 30); // corpo
  ellipse(25, -5, 22, 22); // cabeça
  fill(0);
  ellipse(30, -8, 6, 6); // olho
  fill(0);
  // manchas
  for (let i = -20; i < 30; i += 15) {
    ellipse(i, 5 + sin(frameCount * 0.1 + i) * 3, 10, 6);
  }
}

function drawSnake() {
  noFill();
  stroke(100, 180, 60);
  strokeWeight(4);
  beginShape();
  for (let i = 0; i < 15; i++) {
    let x = i * 6;
    let y = sin(frameCount * 5 + i * 10) * 7;
    vertex(x, y);
  }
  endShape();
  noStroke();
}

function drawBird() {
  fill(200, 180, 40);
  ellipse(0, 0, 24, 12);
  triangle(-10, 0, -20, -5, -20, 5);
  fill(0);
  ellipse(5, -2, 4, 4);
}
