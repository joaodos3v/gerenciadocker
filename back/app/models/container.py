import json
from app.models.model import Model

class Container(Model):
    id      = ''
    nome    = ''
    distro  = ''
    versao  = ''
    network = ''

    def iniciar(self):
        comando = 'docker run -dit --name %s --network %s %s:%s' % (self.nome, self.network, self.distro, self.versao)
        container_id = self.executar_comando(comando)
        return container_id

    def parar(self):
        comando = 'docker pause %s' % self.id
        container_id = self.executar_comando(comando)
        if container_id:
            return 1
        return 0
    
    def retomar(self):
        comando = 'docker unpause %s' % self.id
        container_id = self.executar_comando(comando)
        if container_id:
            return 1
        return 0        

    def remover(self):
        comando = 'docker rm %s -f' % self.id
        container_id = self.executar_comando(comando)
        if container_id:
            return 1
        return 0

    def consultar(self):
        comando = "docker stats --no-stream --format 'table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}' %s | grep %s | awk '{ print $1, $2, $3 }'" % (self.id, self.id)
        informacoes = self.executar_comando(comando)
        return informacoes if informacoes else None

    def inspecionar(self):
        comando = "docker inspect %s" % self.id
        informacoes = self.executar_comando(comando)
        return json.loads(informacoes)[0] if informacoes else None