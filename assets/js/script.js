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
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
        if (!prefersReducedMotion) {
            star.alpha += star.alphaChange;
            if (star.alpha <= 0 || star.alpha >= 1) star.alphaChange *= -1;
        }

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

    if (!prefersReducedMotion) requestAnimationFrame(animate);
}

// Start shooting stars at intervals
function startShootingStars() {
    if (prefersReducedMotion) return;
    setInterval(() => {
        if (Math.random() < 0.5) createShootingStar();
    }, 2000);
}

/* ------------------------------
   Footer Content
------------------------------ */

const grassContainer = document.querySelector('.grass-container');
function renderGarden() {
  const width = window.innerWidth;
  const density = width < 480
    ? { ferns: 2, lavenderClusters: 3, flowers: 7, foliage: 11, fireflies: 6 }
    : width < 768
      ? { ferns: 3, lavenderClusters: 4, flowers: 9, foliage: 16, fireflies: 8 }
      : width < 1200
        ? { ferns: 4, lavenderClusters: 5, flowers: 12, foliage: 23, fireflies: 10 }
        : { ferns: 5, lavenderClusters: 7, flowers: 15, foliage: 32, fireflies: 12 };

  grassContainer.querySelectorAll('.garden-generated').forEach(element => element.remove());

  for (let i = 0; i < density.foliage; i++) {
    const cluster = document.createElement('div');
    cluster.className = 'ground-cluster garden-generated';
    cluster.style.left = `${(i / (density.foliage - 1)) * 100}%`;
    cluster.style.setProperty('--cluster-angle', `${Math.random() * 24 - 12}deg`);

    const bladeCount = 6 + Math.floor(Math.random() * 4);
    for (let bladeIndex = 0; bladeIndex < bladeCount; bladeIndex++) {
      const blade = document.createElement('span');
      blade.className = 'ground-blade';
      blade.style.setProperty('--blade-height', `${18 + Math.random() * 22}px`);
      blade.style.setProperty('--blade-offset', `${(bladeIndex - (bladeCount - 1) / 2) * 3}px`);
      blade.style.setProperty('--blade-angle', `${(bladeIndex - (bladeCount - 1) / 2) * 7 + Math.random() * 8 - 4}deg`);
      cluster.appendChild(blade);
    }
    grassContainer.appendChild(cluster);
  }

  for (let i = 0; i < density.ferns; i++) {
    const fern = document.createElement('div');
    fern.className = 'garden-fern garden-generated';
    fern.style.left = `${((i + 0.5) / density.ferns) * 100}%`;
    fern.style.setProperty('--fern-height', `${64 + Math.random() * 28}px`);
    fern.style.setProperty('--fern-angle', `${Math.random() * 16 - 8}deg`);
    fern.style.animationDelay = `-${Math.random() * 4}s`;

    const leafletCount = 8 + Math.floor(Math.random() * 3);
    for (let leafIndex = 0; leafIndex < leafletCount; leafIndex++) {
      const taper = Math.sin((Math.PI * (leafIndex + 1)) / (leafletCount + 1));
      for (const side of ['left', 'right']) {
        const leaflet = document.createElement('span');
        leaflet.className = `fern-leaflet ${side}`;
        const direction = side === 'left' ? -1 : 1;
        leaflet.style.setProperty('--leaf-position', `${7 + leafIndex * (94 / leafletCount)}%`);
        leaflet.style.setProperty('--leaf-angle', `${direction * (22 + taper * 27)}deg`);
        leaflet.style.setProperty('--leaf-length', `${6 + taper * 18}px`);
        fern.appendChild(leaflet);
      }
    }
    grassContainer.appendChild(fern);
  }

  for (let i = 0; i < density.lavenderClusters; i++) {
    const center = ((i + 0.5) / density.lavenderClusters) * 100;
    const stemCount = i % 2 === 0 ? 3 : 2;
    for (let stemIndex = 0; stemIndex < stemCount; stemIndex++) {
      const stem = document.createElement('div');
      stem.className = 'lavender-stem garden-generated';
      stem.style.left = `${center + (stemIndex - (stemCount - 1) / 2) * 2}%`;
      stem.style.setProperty('--stem-height', `${40 + Math.random() * 18}px`);
      stem.style.setProperty('--stem-angle', `${Math.random() * 12 - 6}deg`);
      stem.style.animationDelay = `-${Math.random() * 3}s`;

      const budCount = 6 + Math.floor(Math.random() * 3);
      for (let budIndex = 0; budIndex < budCount; budIndex++) {
        const bud = document.createElement('span');
        bud.className = 'lavender-bud';
        bud.style.setProperty('--bud-position', `${50 + (budIndex / budCount) * 48}%`);
        bud.style.setProperty('--bud-side', `${budIndex % 2 === 0 ? -1 : 1}`);
        stem.appendChild(bud);
      }
      grassContainer.appendChild(stem);
    }
  }

  const bloomColors = ['rose', 'moon', 'blue', 'lavender'];
  for (let i = 0; i < density.flowers; i++) {
    const bloom = document.createElement('div');
    bloom.className = `moonflower ${bloomColors[i % bloomColors.length]} garden-generated`;
    bloom.style.left = `${((i + 0.5) / density.flowers) * 100}%`;
    bloom.style.setProperty('--stem-height', `${8 + Math.random() * 6}px`);
    bloom.style.setProperty('--bloom-scale', `${0.72 + Math.random() * 0.22}`);
    bloom.style.animationDelay = `-${Math.random() * 3}s`;

    const head = document.createElement('span');
    head.className = 'moonflower-head';
    for (let petalIndex = 0; petalIndex < 7; petalIndex++) {
      const petal = document.createElement('span');
      petal.className = 'moonflower-petal';
      petal.style.setProperty('--petal-index', petalIndex);
      head.appendChild(petal);
    }
    const center = document.createElement('span');
    center.className = 'moonflower-center';
    head.appendChild(center);
    bloom.appendChild(head);
    grassContainer.appendChild(bloom);
  }

  for (let i = 0; i < density.fireflies; i++) {
    const firefly = document.createElement('span');
    firefly.className = 'garden-firefly garden-generated';
    firefly.style.left = `${8 + Math.random() * 84}%`;
    firefly.style.bottom = `${38 + Math.random() * 70}px`;
    firefly.style.animationDelay = `-${Math.random() * 6}s`;
    grassContainer.appendChild(firefly);
  }
}

let gardenResizeTimeout;
window.addEventListener('resize', () => {
  window.clearTimeout(gardenResizeTimeout);
  gardenResizeTimeout = window.setTimeout(renderGarden, 180);
});
renderGarden();


/* ------------------------------
   Event Listeners & Init
------------------------------ */
resizeCanvas();
animate();
startShootingStars();
window.addEventListener("resize", resizeCanvas);
