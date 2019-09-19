import subprocess

class Container:

    def __init__(self, distribuicao):
        self.distribuicao = distribuicao

    def iniciar(self):
        comando = 'docker run -dit %s' % self.distribuicao
        retorno = subprocess.check_output(comando, shell=True)        
    
    def parar():
        pass

    def retomar():
        pass