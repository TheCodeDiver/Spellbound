/* ------------------------------
   Mobile Menu Toggle
------------------------------ */
const menu = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

menu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
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

// Initialize
resizeCanvas();
animate();
startShootingStars();
window.addEventListener("resize", resizeCanvas);


/* ------------------------------
   Footer Content
------------------------------ */

const grassContainer = document.querySelector('.grass-container');
const flowerColors = ['daisy','violet','yellow','orange','red'];

// Generate grass blades
for (let i = 0; i < 150; i++) {
    const blade = document.createElement('div');
    blade.classList.add('grass-blade');
    blade.style.setProperty('--i', i);
    blade.style.height = `${30 + Math.random() * 15}px`;
    blade.style.left = `${i}%`;
    blade.style.animationDelay = `-${Math.random() * 3}s`;
    grassContainer.appendChild(blade);
}

// Generate flowers
for (let i = 0; i < 35; i++) {
    const flower = document.createElement('div');
    const color = flowerColors[Math.floor(Math.random() * flowerColors.length)];
    flower.classList.add('flower', color);
    flower.style.left = `${Math.random() * 95}%`;
    flower.style.animationDelay = `-${Math.random() * 4}s`;
    
    const petals = document.createElement('div');
    petals.classList.add('petals');
    flower.appendChild(petals);
    
    grassContainer.appendChild(flower);
}


/* ------------------------------
   Event Listeners & Init
------------------------------ */
window.addEventListener("resize", resizeCanvas);

resizeCanvas();
startShootingStars();
