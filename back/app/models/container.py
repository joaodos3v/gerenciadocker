import subprocess

class Container:

    id = 'xyz'
    distro = ''
    versao = ''

    def executar_comando(comando):        
        retorno = subprocess.check_output(comando, shell=True).decode('utf-8').strip()
        return retorno

    def iniciar(self):
        comando = 'docker run -dit %s:%s' % (self.distro, self.versao)
        container_id = self.executar_comando(comando)
        if container_id:
            return container_id
        return None         

    def parar(self):
        pass

    def retomar(self):
        pass