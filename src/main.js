let balls = [];

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('z-index', '1');
  for (let i = 0; i < 2000; i++) {
    balls.push({
      x: random(width),
      y: random(height),
      vx: 0,
      vy: 0,
      r: 8 + random(4)
    });
  }
}

function draw() {
  background(0);  // Black background
  for (let b of balls) {
    let dx = mouseX - b.x;
    let dy = mouseY - b.y;
    let distSq = dx * dx + dy * dy;
    let force = 1000 / distSq;

    let angle = atan2(dy, dx);
    b.vx += cos(angle) * force;
    b.vy += sin(angle) * force;

    b.vx *= 0.9;
    b.vy *= 0.9;

    b.x += b.vx;
    b.y += b.vy;

    // Calculate distance to mouse
    let d = dist(mouseX, mouseY, b.x, b.y);
    let colorDistance = 50; // Distance at which balls show color

    noStroke();
    if (d < colorDistance) {
      // Enhanced glow
      fill(255, 215, 0, 50); // Outer glow
      circle(b.x, b.y, b.r + 9);
      fill(255, 215, 0, 60); // Inner glow
      circle(b.x, b.y, b.r + 4);

      // Main ball
      fill(255, 215, 0); // Gold color
      circle(b.x, b.y, b.r);
    } else {
      fill(255, 180); // White with some transparency
      circle(b.x, b.y, b.r);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

const card = document.querySelector(".card");

window.addEventListener("scroll", () => {
  const rotateY = window.scrollY * 0.3; // ajusta el 0.3 para más o menos giro
  card.style.transform = `rotateY(${rotateY}deg)`;
});


