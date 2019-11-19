import socket, json, pickle

class Adaptive:    
    def __init__(self, hosts):
        self.hosts = hosts

    def iniciar_conexao(self):
        json_hosts = json.dumps(self.hosts)
        cliente = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        cliente.connect((self.hosts[0][:self.hosts[0].index(':')], self.hosts[0][self.hosts[0].index(':')+1:]))
        cliente.send(pickle.dumps("start"))
        resposta = pickle.loads(cliente.recv(1024))
        cliente.send(pickle.dumps(json_hosts))
