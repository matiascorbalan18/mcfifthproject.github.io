const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d")

function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

let circles = [];

const colors = ["#FFD54F", "#FFF8E1", "#FF6F00"];

document.body.style.backgroundColor = "#704204";

function initCircles() {
    circles = [];
    let circleCount = window.innerWidth / 100;
    for (let i = 0; i < circleCount; i++) {
        let radius = window.innerWidth / 4;
        let x = randomBetween(radius, canvas.width - radius);
        let y = randomBetween(radius, canvas.height - radius);
        let dx = randomBetween(window.innerWidth / -2000, window.innerWidth / 2000);
        let dy = randomBetween(window.innerWidth / -2000, window.innerWidth / 2000);
        let color = colors[Math.floor(Math.random() * colors.length)];
        circles.push({ x, y, dx, dy, radius, color});
    }
}

function drawCircle(circle) {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = circle.color;
    ctx.fill();
    ctx.closePath();
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(circle => {
        if (circle.x + circle.radius > canvas.width || circle.x - circle.radius < 0) {
            circle.dx = -circle.dx;
        }
        if (circle.y + circle.radius > canvas.height || circle.y - circle.radius < 0) {
            circle.dy = -circle.dy;
        }
        circle.x += circle.dx;
        circle.y += circle.dy;
        drawCircle(circle);
    });
}

function resizeCanvas () {
    canvas.width = window.innerWidth * 1.5;
    canvas.height = window.innerHeight * 1.5;
    initCircles();
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

initCircles();

animate();