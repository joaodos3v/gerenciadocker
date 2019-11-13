from app.models.model import Model

class Network(Model):
    nome   = ''
    driver = 'bridge'

    def criar(self):
        comando = 'docker network create --driver %s %s' % (self.driver, self.nome)
        self.executar_comando(comando)