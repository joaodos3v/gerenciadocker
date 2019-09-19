from flask import jsonify
from app import app
from app.models.container import Container

@app.route("/")
def index():
    return '<h3>O servidor está em execução</h3>'

@app.route("/container/iniciar")
def container_iniciar():
    container = Container('ubuntu')
    container.iniciar()
    return jsonify({"retorno":1})    
    
    