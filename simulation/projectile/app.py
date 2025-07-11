from flask import Flask, render_template, jsonify, request
import numpy as np

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/calculate', methods=['POST'])
def calculate():
    data = request.get_json()
    v0 = float(data['v0'])
    angle = float(data['angle'])
    
    g = 9.8 
    angle_rad = np.deg2rad(angle)
    
    t_flight = (2 * v0 * np.sin(angle_rad)) / g
    
    t = np.linspace(0, t_flight, num=500)
    x = v0 * np.cos(angle_rad) * t
    y = v0 * np.sin(angle_rad) * t - 0.5 * g * t**2
    
    range_val = (v0**2 * np.sin(2 * angle_rad)) / g
    max_height = (v0**2 * (np.sin(angle_rad))**2) / (2 * g)
    
    return jsonify({
        'x': x.tolist(),
        'y': y.tolist(),
        'range': range_val,
        'max_height': max_height,
        't_flight': t_flight
    })

if __name__ == '__main__':
    app.run(debug=True)