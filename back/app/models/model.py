import subprocess

class Model:    
    def executar_comando(self, comando):
        retorno = None
        try:
            retorno = subprocess.check_output(comando, shell=True).decode('utf-8').strip()
        except:
            pass
        return retorno    