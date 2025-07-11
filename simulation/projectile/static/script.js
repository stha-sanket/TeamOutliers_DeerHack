const velocitySlider = document.getElementById('velocity');
const angleSlider = document.getElementById('angle');
const velocityValue = document.getElementById('velocity-value');
const angleValue = document.getElementById('angle-value');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const range = document.getElementById('range');
const maxHeight = document.getElementById('max-height');
const tFlight = document.getElementById('t-flight');

function updateSimulation() {
    const v0 = velocitySlider.value;
    const angle = angleSlider.value;
    velocityValue.textContent = v0;
    angleValue.textContent = angle;

    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ v0, angle })
    })
    .then(response => response.json())
    .then(data => {
        range.textContent = data.range.toFixed(2);
        maxHeight.textContent = data.max_height.toFixed(2);
        tFlight.textContent = data.t_flight.toFixed(2);
        drawTrajectory(data.x, data.y);
    });
}

function drawTrajectory(x, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.moveTo(0, canvas.height);

    const scaleX = canvas.width / Math.max(...x);
    const scaleY = canvas.height / Math.max(...y);
    const scale = Math.min(scaleX, scaleY) * 0.9;

    for (let i = 0; i < x.length; i++) {
        ctx.lineTo(x[i] * scale, canvas.height - y[i] * scale);
    }
    ctx.stroke();
}

velocitySlider.addEventListener('input', updateSimulation);
angleSlider.addEventListener('input', updateSimulation);

updateSimulation();