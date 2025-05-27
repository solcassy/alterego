const sketch = (p) => {
  let balls = [];

  p.setup = function() {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.style('z-index', '1');
    for (let i = 0; i < 2000; i++) {
      balls.push({
        x: p.random(p.width),
        y: p.random(p.height),
        vx: 0,
        vy: 0,
        r: 8 + p.random(4)
      });
    }
  };

  p.draw = function() {
    p.background(0);  // Black background
    for (let b of balls) {
      let dx = p.mouseX - b.x;
      let dy = p.mouseY - b.y;
      let distSq = dx * dx + dy * dy;
      let force = 1000 / distSq;

      let angle = p.atan2(dy, dx);
      b.vx += p.cos(angle) * force;
      b.vy += p.sin(angle) * force;

      b.vx *= 0.9;
      b.vy *= 0.9;

      b.x += b.vx;
      b.y += b.vy;

      // Calculate distance to mouse
      let d = p.dist(p.mouseX, p.mouseY, b.x, b.y);
      let colorDistance = 50; // Distance at which balls show color

      p.noStroke();
      if (d < colorDistance) {
        // Enhanced glow
        p.fill(255, 215, 0, 50); // Outer glow
        p.circle(b.x, b.y, b.r + 9);
        p.fill(255, 215, 0, 60); // Inner glow
        p.circle(b.x, b.y, b.r + 4);

        // Main ball
        p.fill(255, 215, 0); // Gold color
        p.circle(b.x, b.y, b.r);
      } else {
        p.fill(255, 180); // White with some transparency
        p.circle(b.x, b.y, b.r);
      }
    }
  };

  p.windowResized = function() {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
};

new p5(sketch);

const card = document.querySelector(".card");

window.addEventListener("scroll", () => {
  const rotateY = window.scrollY * 0.3; // ajusta el 0.3 para más o menos giro
  card.style.transform = `rotateY(${rotateY}deg)`;
});


