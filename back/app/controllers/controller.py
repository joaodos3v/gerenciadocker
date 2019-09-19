from flask import jsonify
from app import app

@app.route("/")
def index():
    return '<h3>O servidor está em execução</h3>'