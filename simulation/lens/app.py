from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    lens_type = data.get('lens_type')
    object_distance = float(data.get('object_distance'))
    focal_length = float(data.get('focal_length'))

    if lens_type == 'convex':
        f = focal_length
    else: # concave
        f = -focal_length

    # Using the lens formula: 1/f = 1/v - 1/u
    # Object distance u is negative
    u = -object_distance
    
    # Avoid division by zero if object is at the focal point
    if (u + f) == 0:
        image_distance = float('inf') # Image at infinity
    else:
        # v = 1 / (1/f + 1/u) => v = (f*u)/(f+u)
        image_distance = (f * u) / (u + f)

    response = {
        'image_distance': image_distance,
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
