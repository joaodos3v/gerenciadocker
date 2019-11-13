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