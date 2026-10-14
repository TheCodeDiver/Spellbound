/* ------------------------------
   Mobile Menu Toggle
------------------------------ */
const menuToggle = document.getElementById('mobile-menu');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');

menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  menuToggle.classList.toggle('open', !isExpanded);
  navbar.classList.toggle('active', !isExpanded);
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');

    // Instead of immediately removing 'active', toggle a 'closing' class
    navbar.classList.add('closing');

    // wait for the transition duration (match CSS: 0.4s)
    setTimeout(() => {
      navbar.classList.remove('active', 'closing');
    }, 400); 
  });
});


const topRow = document.querySelector('.navbar > .top-row');
const extraOffset = 50; // adjust this number to control space from top

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    const navbarHeight = topRow.offsetHeight;

    window.scrollTo({
      top: target.offsetTop - navbarHeight - extraOffset,
      behavior: 'smooth'
    });
  });
});








/* ------------------------------
   Canvas Star Field + Shooting Stars
------------------------------ */
const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerHeight;

let stars = [];
const numStars = 200; // adjust for performance
let shootingStars = [];

// Resize canvas and regenerate stars
function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initStars();
}

// Initialize stars
function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            alpha: Math.random(),
            alphaChange: Math.random() * 0.02 + 0.01
        });
    }
}

// Create a shooting star
function createShootingStar() {
    shootingStars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        angle: (Math.random() * 180 - 45) * (Math.PI / 180),
        speed: 2 + Math.random() * 4,
        length: 50 + Math.random() * 100,
        alpha: 1
    });
}

// Animate everything
function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw twinkling stars
    stars.forEach(star => {
        star.alpha += star.alphaChange;
        if (star.alpha <= 0 || star.alpha >= 1) star.alphaChange *= -1;

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(238,227,255,${star.alpha})`;
        ctx.fill();
    });

    // Draw shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= 0.02;

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - Math.cos(s.angle) * s.length, s.y - Math.sin(s.angle) * s.length);
        ctx.strokeStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (s.alpha <= 0) shootingStars.splice(i, 1);
    }

    requestAnimationFrame(animate);
}

// Start shooting stars at intervals
function startShootingStars() {
    setInterval(() => {
        if (Math.random() < 0.5) createShootingStar();
    }, 2000);
}

/* ------------------------------
   Footer Content
------------------------------ */

const grassContainer = document.querySelector('.grass-container');
  const flowerColors = ['daisy','cherry','lavender','buttercup','peach','coral'];

  // --- GRASS (denser) ---
  const grassCount = 1000;
  for (let i = 0; i < grassCount; i++) {
    const blade = document.createElement('div');
    blade.className = 'grass-blade';
    const h = 1 + Math.random() * 50; // 20px - 70px
    blade.style.height = `${h}px`;
    // spread across width evenly with a small random nudge
    const left = (i / (grassCount - 1)) * 100 + (Math.random() - 0.5) * 0.8;
    blade.style.left = `${left}%`;
    blade.style.animationDelay = `-${Math.random() * 3}s`;
    grassContainer.appendChild(blade);
  }

  // --- FLOWERS (random sizes + stalk lengths) ---
  const flowerCount = 20;
  for (let i = 0; i < flowerCount; i++) {
    const flower = document.createElement('div');
    const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
    flower.className = `flower ${color}`;

    // place horizontally
    flower.style.left = `${Math.random() * 94 + 2}%`;

    // animation offset
    flower.style.animationDelay = `-${Math.random() * 4}s`;

    // random scale 0.6 .. 1.3
    const scale = (0.2 + Math.random() * 0.6);
    flower.style.setProperty('--scale', scale.toFixed(2));

    // stalk length proportional to scale (tweak constants to taste)
    const stalkPx = Math.round(18 + scale * 20); // ~30-46px typical
    flower.style.setProperty('--stalk-length', `${stalkPx}px`);

    // create inner and petals
    const inner = document.createElement('div');
    inner.className = 'flower-inner';

    const petals = document.createElement('div');
    petals.className = 'petals';

    const center = document.createElement('div');
    center.className = 'center';

    inner.appendChild(petals);
    inner.appendChild(center);
    flower.appendChild(inner);

    grassContainer.appendChild(flower);
  }


/* ------------------------------
   Event Listeners & Init
------------------------------ */
animate();
startShootingStars();
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
