import socket, json, pickle, time

class Adaptive:    
    def __init__(self, hosts):
        self.hosts = hosts

    def preparar_hosts(self):
        hosts = []
        for host in self.hosts:
            hosts.append("%s:%s" % (host["ipv4"], host["porta"]))
        return hosts

    def iniciar_conexao(self):
        hosts = self.preparar_hosts()
        json_hosts = json.dumps(hosts)

        if not hosts:
            return []

        cliente = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        cliente.connect((self.hosts[0]["ipv4"], self.hosts[0]["porta"]))
        cliente.send(pickle.dumps("info"))
        states = json.loads(pickle.loads(cliente.recv(1024)))
        print(states)

        time.sleep(1)

        cliente = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        cliente.connect((self.hosts[0]["ipv4"], self.hosts[0]["porta"]))
        cliente.send(pickle.dumps("start"))
        resposta = pickle.loads(cliente.recv(1024))
        cliente.send(pickle.dumps(json_hosts))        
        
        for i in range(len(states)):
            state = states[i]
            try:
                self.hosts[i]["status"] = state
            except:
                print("Container nao localizado")

        return self.hosts