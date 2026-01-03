document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.getElementById('cursorDot');

    // Only run if the cursorDot element exists on the page
    if (cursorDot) {
        document.addEventListener('mousemove', e => {
            // Use requestAnimationFrame for smoother movement
            requestAnimationFrame(() => {
                cursorDot.style.left = e.clientX + 'px';
                cursorDot.style.top = e.clientY + 'px';
            });
        });
    }
});
// --- Snowflakes ---
const canvas = document.getElementById('snowCanvas');
const ctx = canvas.getContext('2d');
let width, height, snowflakes;

function initSnow() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    snowflakes = [];
    for (let i = 0; i < 120; i++) {
        snowflakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 2 + 1,
            d: Math.random() * 1 + 0.5
        });
    }
}

function drawSnow() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.beginPath();
    for (let f of snowflakes) {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        f.y += f.d;
        if (f.y > height) f.y = -10;
    }
    ctx.fill();
    requestAnimationFrame(drawSnow);
}

window.addEventListener('resize', initSnow);
initSnow();
drawSnow();

// --- Ultra Smooth Momentum Scrolling ---
const body = document.body;
const main = document.querySelector('main');

let sx = 0, // Target scroll position
    sy = 0;
let dx = sx, // Current interpolated position
    dy = sy;

// Update the scroll target when the user scrolls
window.addEventListener('scroll', () => {
  sx = window.pageXOffset;
  sy = window.pageYOffset;
});

// Animation loop to "ease" the scroll
function render() {
  dx = li(dx, sx, 0.07); // The 0.07 is the "butter" factor (lower is smoother/slower)
  dy = li(dy, sy, 0.07);
  
  dx = Math.floor(dx * 100) / 100;
  dy = Math.floor(dy * 100) / 100;
  
  // This helps remove the "pixel-hitting" feel
  window.scrollTo(dx, dy);
  
  requestAnimationFrame(render);
}

// Linear Interpolation function
function li(a, b, n) {
  return (1 - n) * a + n * b;
}

// Start the loop
// render(); // Uncomment this line if you want the script-based easing. 
// NOTE: Try the CSS below FIRST as it's cleaner.

// Close button
document.getElementById('closeNotification').addEventListener('click', function() {
    document.getElementById('discordNotification').style.display = 'none';
});

// Join Now click
document.querySelector('.discord-notification .text').addEventListener('click', function() {
    window.open('https://discord.gg/YOUR_LINK_HERE', '_blank');
});
