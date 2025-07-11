import numpy as np
import matplotlib.pyplot as plt
from io import BytesIO
from flask import Flask, render_template, request, jsonify
import math
import base64

app = Flask(__name__)

# Dot product function
def dot_product(a, b):
    return np.dot(a, b)

# Angle between vectors function (in degrees)
def angle_between_vectors(a, b):
    dot_prod = np.dot(a, b)
    magnitude_a = np.linalg.norm(a)
    magnitude_b = np.linalg.norm(b)
    cos_theta = dot_prod / (magnitude_a * magnitude_b)
    # Clamp cos_theta to avoid out-of-range errors due to floating point precision issues
    cos_theta = max(-1.0, min(1.0, cos_theta))
    return math.degrees(math.acos(cos_theta))

# Projection of vector b onto a
def projection(a, b):
    return (np.dot(a, b) / np.dot(a, a)) * a

# Generate plot of vectors and projection
def generate_plot(a, b, proj_b_on_a):
    fig, ax = plt.subplots()

    # Plot Vector A
    ax.quiver(0, 0, a[0], a[1], angles='xy', scale_units='xy', scale=1, color='r', label="Vector A")
    
    # Plot Vector B
    ax.quiver(0, 0, b[0], b[1], angles='xy', scale_units='xy', scale=1, color='b', label="Vector B")
    
    # Plot Projection of B onto A
    ax.quiver(0, 0, proj_b_on_a[0], proj_b_on_a[1], angles='xy', scale_units='xy', scale=1, color='g', label="Projection of B on A")

    # Dynamically adjust the plot limits to fit the vectors
    all_vectors = np.array([a, b, proj_b_on_a])
    x_limits = [np.min(all_vectors[:, 0]), np.max(all_vectors[:, 0])]
    y_limits = [np.min(all_vectors[:, 1]), np.max(all_vectors[:, 1])]

    # Expand limits a little to ensure all vectors fit comfortably in the plot
    margin = 0.5
    ax.set_xlim([min(x_limits[0], 0) - margin, max(x_limits[1], 0) + margin])
    ax.set_ylim([min(y_limits[0], 0) - margin, max(y_limits[1], 0) + margin])

    # Ensure the aspect ratio is equal to avoid distorted vectors
    ax.set_aspect('equal', 'box')

    # Add grid and labels
    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.axhline(0, color='black',linewidth=1)
    ax.axvline(0, color='black',linewidth=1)
    ax.legend()
    plt.grid(True)

    # Save the plot to a BytesIO object and return it
    img_stream = BytesIO()
    plt.savefig(img_stream, format='png')
    img_stream.seek(0)
    plt.close(fig)
    return img_stream

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Get vector inputs from the form
        a_x = float(request.form['a_x'])
        a_y = float(request.form['a_y'])
        b_x = float(request.form['b_x'])
        b_y = float(request.form['b_y'])
        
        # Define the vectors
        a = np.array([a_x, a_y])
        b = np.array([b_x, b_y])

        # Calculate dot product, angle, and projection
        dot_prod = dot_product(a, b)
        angle = angle_between_vectors(a, b)
        proj_b_on_a = projection(a, b)
        
        # Generate plot
        img_stream = generate_plot(a, b, proj_b_on_a)

        # Convert the image to base64
        img_base64 = base64.b64encode(img_stream.getvalue()).decode('utf-8')

        # Render the results
        return render_template('index.html', dot_prod=dot_prod, angle=angle, image=img_base64)

    return render_template('index.html')

@app.route('/update_vectors', methods=['POST'])
def update_vectors():
    # Get data from AJAX request
    data = request.get_json()
    a_x = data['a_x']
    a_y = data['a_y']
    b_x = data['b_x']
    b_y = data['b_y']

    # Define the vectors
    a = np.array([a_x, a_y])
    b = np.array([b_x, b_y])

    # Calculate dot product, angle, and projection
    dot_prod = dot_product(a, b)
    angle = angle_between_vectors(a, b)
    proj_b_on_a = projection(a, b)

    # Generate plot
    img_stream = generate_plot(a, b, proj_b_on_a)

    # Convert the image to base64
    img_base64 = base64.b64encode(img_stream.getvalue()).decode('utf-8')

    # Return the results as JSON
    return jsonify({
        'dot_prod': dot_prod,
        'angle': angle,
        'image': img_base64
    })

if __name__ == '__main__':
    app.run(debug=True)
