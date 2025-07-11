from flask import Flask, render_template, send_from_directory
import os

app = Flask(__name__)

# Define the directory where your 3D models are located
FIGURES_DIR = os.path.join(os.path.dirname(__file__), 'figures-3D')

@app.route('/')
def landing_page():
    return render_template('index.html')

@app.route('/ar/<model_name>')
def ar_experience(model_name):
    return render_template('digestive.html', model_name=model_name)

@app.route('/figures-3D/<path:filename>')
def serve_figures(filename):
    return send_from_directory(FIGURES_DIR, filename)

if __name__ == '__main__':
    app.run(debug=True)