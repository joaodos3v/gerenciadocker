from app.models.model import Model

class Container(Model):
    id      = ''
    distro  = ''
    versao  = ''
    network = ''

    def iniciar(self):
        comando = 'docker run -dit --network %s %s:%s' % (self.network, self.distro, self.versao)
        container_id = self.executar_comando(comando)
        return container_id

    def parar(self):
        comando = 'docker stop %s' % self.id
        container_id = self.executar_comando(comando)
        if container_id:
            return 1
        return 0

    def remover(self):
        comando = 'docker rm %s -f'
        container_id = self.executar_comando(comando)
        return container_id

    def consultar(self):
        comando = "docker stats --no-stream --format 'table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}' %s | grep %s | awk '{ print $1, $2, $3 }'" % (self.id, self.id)
        informacoes = self.executar_comando(comando)
        if informacoes:
            return informacoes