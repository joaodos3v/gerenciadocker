from flask import jsonify, request
import json
from app import app
from app.models.container import Container
from app.models.network import Network
from app.models.adaptive import Adaptive
from app.models.notificacao import Notificacao

states = []

@app.route("/")
def index():
    return '<h3>O servidor está em execução</h3>'

@app.route("/container/iniciar", methods=['POST'])
def container_iniciar():
    nome    = None
    distro  = None
    versao  = None
    network = None
    
    json = request.get_json()

    if not json:
        return jsonify({
            "status": 0,
            "mensagem": "Nenhum informação recebida"
        })

    try:
        nome    = json['nome']
        distro  = json['distro']
        versao  = json['versao']
        network = json['network']
    except:
        return jsonify({
            "status": 0,
            "mensagem": 'O json deve possuir os campos "distro", "versão" e "network"'
        })   

    container = Container()
    container.nome    = nome
    container.distro  = distro
    container.versao  = versao
    container.network = network
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

@app.route("/container/retomar", methods=['POST'])
def container_retomar():
    container_id = None

    json = request.get_json()

    if not json:
        return jsonify({
            "status": 0,
            "mensagem": "Não foi possível retomar o container"
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
    container_retomado = container.retomar()
    
    if container_retomado == 1:
        mensagem = "Container retomado"
    else:
        mensagem = "Não foi possível retomar o container"
    
    return jsonify({
        "status": container_retomado,
        "mensagem": mensagem
    })

@app.route("/container/remover", methods=['POST'])
def container_remover():
    container_id = None

    json = request.get_json()

    if not json:
        return jsonify({
            "status": 0,
            "mensagem": "Não foi possível remover o container"
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
    container_removido = container.remover()
    
    if container_removido == 1:
        mensagem = "Container removido"
    else:
        mensagem = "Não foi possível remover o container"
    
    return jsonify({
        "status": container_removido,
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
    # Status:
    # 0 -> parado
    # 1 -> normal
    # 2 -> falho

    global states   
    network    = Network()
    network.id = network_id    
    containers = []
    json_infos_network = network.consultar()
    json_containers = json_infos_network[0]['Containers']
    for container_id in json_containers:
        atributos    = json_containers[container_id]        
        container    = Container()
        container.id = container_id
        container_informacoes      = container.consultar()

        if not container_informacoes:
            continue

        list_container_informacoes = container_informacoes.split(" ")
        container_inpecionado      = container.inspecionar()

        if not container_inpecionado:
            continue

        estados_do_container = container_inpecionado["State"]
        status_atual = 0 if estados_do_container["Paused"] else 1

        # sobrescrever o status atual se ele estiver rodando
        # print(states)
        if status_atual > 0: # rodando
            for s in range(len(states)):
                state = states[s]
                if state["container_id"] == container_id:
                    if state["status"] == "FALHO":
                        status_atual = 2
                        if state["notificar"] == 1:                            
                            notificacao_falha = Notificacao("[%s]" % atributos['Name'], "Uma falha inesperada foi detectada.")
                            if notificacao_falha.enviar():
                                states[s]["notificar"] = 0
                            

        # if float(list_container_informacoes[1][:list_container_informacoes[1].index('%')]) >= 90: # cpu
        #     notificacao_cpu = Notificacao("Excesso de consumo de processamento", "O container está consumindo uma quantidade alta de CPU.")
        #     notificacao_cpu.enviar()
        
        # if float(list_container_informacoes[2][:list_container_informacoes[2].index('MiB')]) >= 90: # ram
        #     notificacao_ram = Notificacao("Excesso de consumo de memória", "O container está consumindo uma quantidade alta de RAM.")
        #     notificacao_ram.enviar()

        dict_container_informacoes = {
            "id"        : container_id,
            "nome"      : atributos['Name'],
            "ipv4"      : atributos['IPv4Address'],
            "macaddress": atributos['MacAddress'],
            "cpu"       : list_container_informacoes[1],
            "ram"       : list_container_informacoes[2],
            "status"    : status_atual
        }
        containers.append(dict_container_informacoes)

    return jsonify({
        "status":1,
        "mensagem": "Informações localizadas",
        "containers": containers
    })

# Momentaneamente ficará aqui mesmo hehe
@app.route("/adaptive/iniciar/<network_id>", methods=['GET'])
def adaptive_iniciar(network_id):    
    network = Network()
    network.id = network_id
    containers = network.consultar("Containers")
    containers_ipv4 = []
    for container_id in containers:
        container = containers[container_id]
        ipv4 = container['IPv4Address']
        index_separador = ipv4.index('/')
        # ipv4_e_porta = "%s:%s" % (ipv4[:index_separador], 5001)
        dicionario = {
            "container_id": container_id,
            "ipv4": ipv4[:index_separador],
            "porta": 5001,
            "status": None
        }
        containers_ipv4.append(dicionario)

    adaptive = Adaptive(containers_ipv4)
    global states
    states = adaptive.iniciar_conexao()

    if states:
        return jsonify({
            "status": 1,
            "mensagem": "O Adaptive foi executado com sucesso"
        })

    return jsonify({
        "status": 0,
        "mensagem": "Não foi possível capturar informações dos estados dos containers"
    })