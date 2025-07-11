const canvas = document.getElementById('lensCanvas');
const ctx = canvas.getContext('2d');
const lensTypeSelect = document.getElementById('lens_type');
const objectDistanceSlider = document.getElementById('object_distance');
const focalLengthSlider = document.getElementById('focal_length');

let lensType = 'convex';
let objectDistance = 150;
let focalLength = 100;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw principal axis
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    // Draw lens
    const lensX = canvas.width / 2;
    const lensY = canvas.height / 2;
    ctx.beginPath();
    if (lensType === 'convex') {
        ctx.moveTo(lensX, lensY - 50);
        ctx.quadraticCurveTo(lensX + 50, lensY, lensX, lensY + 50);
        ctx.quadraticCurveTo(lensX - 50, lensY, lensX, lensY - 50);
    } else { // concave
        ctx.moveTo(lensX - 20, lensY - 50);
        ctx.lineTo(lensX + 20, lensY - 50);
        ctx.lineTo(lensX, lensY);
        ctx.lineTo(lensX + 20, lensY + 50);
        ctx.lineTo(lensX - 20, lensY + 50);
        ctx.lineTo(lensX, lensY);
        ctx.closePath();
    }
    ctx.stroke();


    // Draw focal points
    ctx.beginPath();
    ctx.arc(lensX - focalLength, lensY, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(lensX + focalLength, lensY, 5, 0, 2 * Math.PI);
    ctx.fill();

    // Draw object
    const objectX = lensX - objectDistance;
    const objectY = lensY - 50;
    ctx.beginPath();
    ctx.moveTo(objectX, objectY);
    ctx.lineTo(objectX, lensY);
    ctx.stroke();

    // Calculate and draw image
    fetch('/calculate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            lens_type: lensType,
            object_distance: objectDistance,
            focal_length: focalLength
        })
    })
    .then(response => response.json())
    .then(data => {
        const imageDistance = data.image_distance;
        if (isFinite(imageDistance)) {
            const imageX = lensX + imageDistance;
            const magnification = imageDistance / -objectDistance;
            const imageHeight = 50 * magnification;
            const imageY = lensY - imageHeight;

            ctx.beginPath();
            ctx.moveTo(imageX, imageY);
            ctx.lineTo(imageX, lensY);
            ctx.strokeStyle = 'red';
            ctx.stroke();
            ctx.strokeStyle = 'black';
        }
    });
}

lensTypeSelect.addEventListener('change', (e) => {
    lensType = e.target.value;
    draw();
});

objectDistanceSlider.addEventListener('input', (e) => {
    objectDistance = parseInt(e.target.value);
    draw();
});

focalLengthSlider.addEventListener('input', (e) => {
    focalLength = parseInt(e.target.value);
    draw();
});

draw();
