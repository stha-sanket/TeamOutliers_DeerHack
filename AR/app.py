from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

# Define the directory where your 3D models are located
FIGURES_DIR = os.path.join(os.path.dirname(__file__), 'figures-3D')

@app.route('/')
def index():
    return render_template('digestive.html')

@app.route('/figures-3D/<path:filename>')
def serve_figures(filename):
    return send_from_directory(FIGURES_DIR, filename)

if __name__ == '__main__':
    app.run(debug=True)