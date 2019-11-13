from flask import jsonify, request
from app import app
from app.models.network import Network

@app.route("/network/criar", methods=['POST'])
def network_criar():
    nome   = None
    driver = None

    json = request.get_json()

    if not json:
        return jsonify({
            "status": 0,
            "mensagem": "Nenhum informação recebida"
        })

    try:
        nome = json['nome']
    except:
        return jsonify({
            "status": 0,
            "mensagem": 'O json deve possuir o campo "nome"'
        })

    try:
        driver = json['driver']
    except:
        pass

    network = Network()
    network.nome = nome
    if driver:
        network.driver = driver
    network_id = network.criar()

    if network_id:
        return jsonify({
            "status": 1,
            "mensagem": "Network criada",
            "network_id": network_id
        })
    
    return jsonify({
        "status": 0,
        "mensagem": "Falha ao criar a network"
    })