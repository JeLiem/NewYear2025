const envelope = document.querySelector(".envelope");
const card = document.querySelector(".card");

function openEnvelope() {
  const flap = document.querySelector(".flap");
  flap.style.transform = "rotateX(-180deg)";
  
  document.querySelector(".open-button").style.display = "none";

  setTimeout(() => {
    card.classList.remove("hidden");
    card.style.display = "block";
    envelope.style.display = "none"; 
    startFireworks();
  }, 800);
}

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const colors = ["#bba6dd", "#8765aa", "#d3c2f2", "#f3e7fd", "#faf8ff"];

function createParticle(x, y, color) {
  return {
    x,
    y,
    vx: Math.random() * 4 - 2,
    vy: Math.random() * 4 - 2,
    radius: Math.random() * 2 + 1,
    color,
    life: 100,
  };
}

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, i) => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.life--;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = particle.color;
    ctx.fill();
    if (particle.life <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(render);
}

function explode() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  for (let i = 0; i < 50; i++) {
    particles.push(createParticle(x, y, colors[Math.floor(Math.random() * colors.length)]));
  }
}

function startFireworks() {
  setInterval(explode, 800); 
  render();
}