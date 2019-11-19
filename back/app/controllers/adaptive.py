from app import app
from app.models.network import Network
from app.models.adaptive import Adaptive

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
        ipv4_e_porta = "%s:%s" % (ipv4[:index_separador], 5001)
        containers_ipv4.append(ipv4_e_porta)
    adaptive = Adaptive(containers_ipv4)
    adaptive.iniciar_conexao()

    return '1'