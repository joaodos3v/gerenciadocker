from flask import jsonify, request
import json
from app import app
from app.models.container import Container
from app.models.network import Network

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
            "status": 1,
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

@app.route("/container/remover", methods=['POST'])
def container_remover():
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

@app.route("/container/consultar/<container_id>", methods=['GET'])
def container_consultar(container_id):
    container = Container()
    container.id = container_id
    container_informacoes = container.consultar()
    list_container_informacoes = container_informacoes.split(" ")
    return jsonify({
        "status": 1,
        "mensagem": "Informações localizadas",
        "cpu": list_container_informacoes[1],
        "ram": list_container_informacoes[2]
    })

@app.route("/container/consultar/network/<network_id>", methods=['GET'])
def container_consultar_network(network_id):
    network = Network()
    network.id = network_id    
    containers = []
    json_infos_network = network.consultar()
    json_containers = json_infos_network[0]['Containers']
    for container_id in json_containers:
        atributos = json_containers[container_id]        
        container = Container()
        container.id = container_id
        container_informacoes = container.consultar()
        list_container_informacoes = container_informacoes.split(" ")
        dict_container_informacoes = {
            "id": container_id,
            "nome": atributos['Name'],
            "ipv4": atributos['IPv4Address'],
            "macaddress": atributos['MacAddress'],
            "cpu": list_container_informacoes[1],
            "ram": list_container_informacoes[2]
        }
        containers.append(dict_container_informacoes)

    return jsonify({
        "status":1,
        "mensagem": "Informações localizadas",
        "containers": containers
    })