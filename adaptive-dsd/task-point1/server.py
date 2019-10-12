import socket 
import pickle

def CapturarIPHost():
    try:  
        ip = socket.gethostbyname(socket.gethostname())
        print("O IP do host e: ", ip, sep=' ')
        return ip
    except: 
        print("\n Não foi possivel pegar o hostname e o IP do servidor \n")


def Multiplicar(valor, multiplicador):
    return valor + multiplicador


def ReceberRequisicao(conexao):
    while True:    
        retorno = conexao.recv(1024)
        msg = pickle.loads(retorno)
        print("%s | %s " % (msg['valor'], msg['multiplicador']))

        valor = float(msg['valor'])
        multiplicador = float(msg['multiplicador'])
        valor_multiplicado = Multiplicar(valor, multiplicador)

        EnviarResposta(conexao, valor_multiplicado)


def EnviarResposta(conexao, resultado):    
    conexao.send(pickle.dumps(resultado))


def IniciarExecucao():
    print("===> Iniciando script do <servidor> <===")

    while True:
        tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

        #host = CapturarIPHost()
        host = input("Qual o ip do servidor? ")
        porta = 12349
        tupla = (host, porta)
        tcp.bind(tupla)
        tcp.listen(1)

        conexao, cliente = tcp.accept() 
        ReceberRequisicao(conexao)
        # conexao.recv()
        # conexao.close()


if __name__ == "__main__":
    IniciarExecucao()