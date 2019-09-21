import subprocess

class Container:

    id = 'xyz'
    distro = ''
    versao = ''

    def executar_comando(comando):
        container_id = None
        try:
            container_id = subprocess.check_output(comando, shell=True).decode('utf-8').strip()
        except:
            pass
        return container_id

    def iniciar(self):
        comando = 'docker run -dit %s:%s' % (self.distro, self.versao)
        return self.executar_comando(comando)

    def parar(self):
        comando = 'docker stop %s' % self.id
        container_id = self.executar_comando(comando)
        if container_id:
            return 1
        return 0