
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('riverCanvas');
    const ctx = canvas.getContext('2d');

    const riverWidthSlider = document.getElementById('riverWidth');
    const swimmerSpeedSlider = document.getElementById('swimmerSpeed');
    const waterSpeedSlider = document.getElementById('waterSpeed');
    const startButton = document.getElementById('start-button');

    const riverWidthValue = document.getElementById('riverWidthValue');
    const swimmerSpeedValue = document.getElementById('swimmerSpeedValue');
    const waterSpeedValue = document.getElementById('waterSpeedValue');

    const timeEl = document.getElementById('time');
    const driftEl = document.getElementById('drift');
    const resultantVelocityEl = document.getElementById('resultantVelocity');
    const totalDistanceEl = document.getElementById('totalDistance');

    const MAX_CANVAS_HEIGHT = 500;

    let riverWidth = riverWidthSlider.value;
    let swimmerSpeed = swimmerSpeedSlider.value;
    let waterSpeed = waterSpeedSlider.value;

    let swimmer = { x: 0, y: 0 };
    let animationFrameId;

    function resizeCanvas() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = Math.min(riverWidth * 20, MAX_CANVAS_HEIGHT);
        draw();
    }

    function updateValues() {
        riverWidth = riverWidthSlider.value;
        swimmerSpeed = swimmerSpeedSlider.value;
        waterSpeed = waterSpeedSlider.value;

        riverWidthValue.textContent = riverWidth;
        swimmerSpeedValue.textContent = swimmerSpeed;
        waterSpeedValue.textContent = waterSpeed;

        const timeToCross = riverWidth / swimmerSpeed;
        const driftDistance = waterSpeed * timeToCross;
        const resultantVelocity = Math.sqrt(swimmerSpeed**2 + waterSpeed**2);
        const totalDistance = Math.sqrt(riverWidth**2 + driftDistance**2);

        timeEl.textContent = timeToCross.toFixed(2);
        driftEl.textContent = driftDistance.toFixed(2);
        resultantVelocityEl.textContent = resultantVelocity.toFixed(2);
        totalDistanceEl.textContent = totalDistance.toFixed(2);

        canvas.height = Math.min(riverWidth * 10, MAX_CANVAS_HEIGHT);
        resetAnimation();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw swimmer emoji
        ctx.font = '24px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🏊', swimmer.x, swimmer.y);
    }

    function animate() {
        const timeToCross = riverWidth / swimmerSpeed;
        const driftDistance = waterSpeed * timeToCross;

        const ySpeed = canvas.height / timeToCross;
        const xSpeed = (driftDistance / riverWidth) * canvas.height / timeToCross;

        swimmer.y += ySpeed / 60; // 60 FPS
        swimmer.x += xSpeed / 60;

        if (swimmer.y < canvas.height) {
            draw();
            animationFrameId = requestAnimationFrame(animate);
        } else {
            draw(); // Final draw at the destination
        }
    }

    function resetAnimation() {
        cancelAnimationFrame(animationFrameId);
        swimmer = { x: canvas.width / 2, y: 0 };
        draw();
    }

    function startAnimation() {
        resetAnimation();
        animate();
    }

    riverWidthSlider.addEventListener('input', updateValues);
    swimmerSpeedSlider.addEventListener('input', updateValues);
    waterSpeedSlider.addEventListener('input', updateValues);
    startButton.addEventListener('click', startAnimation);
    window.addEventListener('resize', resizeCanvas);

    // Initial setup
    resizeCanvas();
    updateValues();
});
