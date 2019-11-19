import json
from app.models.model import Model

class Network(Model):
    id     = ''
    nome   = ''
    driver = 'bridge' # é a default do próprio docker

    def criar(self):
        comando = 'docker network create --driver %s %s' % (self.driver, self.nome)
        return self.executar_comando(comando)
    
    def remover(self):
        comando = 'docker network rm %s' % self.id
        return self.executar_comando(comando)
    
    def consultar(self, atributo=None):
        comando = 'docker inspect %s' % self.id
        s_infos_network = self.executar_comando(comando)
        json_infos_network = json.loads(s_infos_network)
        if atributo == "Containers":
            return json_infos_network[0][atributo]
        return json_infos_network