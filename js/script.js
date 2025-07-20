const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
let w, h;
let stars = [];
let meteors = [];

function init() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;

  stars = Array.from({ length: 150 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    radius: Math.random() * 1.5,
    alpha: Math.random(),
    delta: Math.random() * 0.02,
  }));

  meteors = Array.from({ length: 3 }, () => ({
    x: Math.random() * w,
    y: Math.random() * -h,
    length: Math.random() * 80 + 40,
    speed: Math.random() * 6 + 2,
    angle: Math.PI / 4,
  }));
}

function draw() {
  ctx.clearRect(0, 0, w, h);

  // Estrelas piscando
  stars.forEach((s) => {
    s.alpha += s.delta;
    if (s.alpha <= 0 || s.alpha >= 1) s.delta *= -1;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
    ctx.fill();
  });

  // Meteoros
  meteors.forEach((m) => {
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(
      m.x - m.length * Math.cos(m.angle),
      m.y - m.length * Math.sin(m.angle)
    );
    ctx.strokeStyle = "rgba(255, 255, 255, 0.7)";
    ctx.lineWidth = 2;
    ctx.stroke();

    m.x += m.speed;
    m.y += m.speed;

    if (m.y > h || m.x > w) {
      m.x = Math.random() * w;
      m.y = Math.random() * -h;
    }
  });

  requestAnimationFrame(draw);
}

window.addEventListener("resize", init);
init();
draw();
