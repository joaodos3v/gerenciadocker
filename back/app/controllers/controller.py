from flask import jsonify, request
from app import app
from app.models.container import Container

@app.route("/")
def index():
    return '<h3>O servidor está em execução</h3>'

@app.route("/container/iniciar", methods=['POST'])
def container_iniciar():
    distro = None
    versao = None
    
    json = request.get_json()

    if not json:
        return jsonify({
            "status": 0,
            "mensagem": "Nenhum informação recebida"
        })

    try:
        distro = json['distro']
        versao = json['versao']
    except:
        return jsonify({
            "status": 0,
            "mensagem": 'O json deve possuir os campos "distro" e "versão"'
        })   

    container = Container()
    container.distro = distro
    container.versao = versao
    container_id = container.iniciar()

    if container_id:
        return jsonify({
            "retorno": 1,
            "mensagem": "Container iniciado",
            "container_id": container_id
        })
    
    return jsonify({
        "status": 0,
        "mensagem": "Falha ao iniciar o container"
    })

@app.route("/container/parar", methods=['POST'])
def container_parar():
    container_id = None

    json = request.get_json()

    if not json:
        return jsonify({
            "status": 0,
            "mensagem": "Não foi possível parar o container"
        })
    
    try:
        container_id = json['container_id']
    except:
        return jsonify({
            "status": 0,
            "mensagem": 'O json deve possuir o campo "container_id"'
        })

    container = Container()
    container.id = container_id
    container_parado = container.parar()
    
    if container_parado == 1:
        mensagem = "Container parado"
    else:
        mensagem = "Não foi possível parar o container"
    
    return jsonify({
        "status": container_parado,
        "mensagem": mensagem
    })