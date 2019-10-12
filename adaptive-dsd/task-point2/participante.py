import socket 
import pickle
import time

def CapturarIPHost():
    try:  
        ip = socket.gethostbyname(socket.gethostname())
        print("O IP do host e: ", ip, sep=' ')
        return ip
    except: 
        print("\n Não foi possivel pegar o hostname e o IP do servidor \n")
        ip = input("Qual o ip do servidor? ")
        return ip

def ReceberRequisicao(conexao):
    dado = ""
    while True:
        print("Aguardando mensagem...")
        msg = ReceberResposta(conexao)
        print("Msg: %s" % (msg))

        if msg == "preCommit":
            resposta = InputUsuario("Deseja fazer o preCommit?")
            EnviarResposta(conexao, resposta)
            if resposta == "N":
                print("Transação cancelada.")
                break
        elif msg == "doCommit":
            print("Realizando o commit...")
            file = open("db", "a+")
            file.write(dado+"\n")
            file.close()
            time.sleep(0.5)
            EnviarResposta(conexao, "haveCommited")
            print("Transação finalizada!")
            break
        elif msg == "ABORT":
            print("Abortando transação...")
            dado = ""
            print("Transação abortada!")
            break
        else:
            print("Iniciando transação...")
            resposta = InputUsuario("Deseja continuar a transação?")
            EnviarResposta(conexao, resposta)
            if resposta == "N":
                print("Transação cancelada.")
                break
            else:
                dado = msg


def InputUsuario(msg):
    resposta = ""
    while resposta != "S" and resposta != "N":
        resposta = input(msg + " Responda S ou N:")
    return resposta


def EnviarResposta(conexao, resultado):    
    conexao.send(pickle.dumps(resultado))


def ReceberResposta(conexao):
    retorno = conexao.recv(1024)
    msg = "ABORT"
    try:
        msg = pickle.loads(retorno)
    except:
        print("Deu badddddddddddddd")


    return msg


def IniciarExecucao():
    print("===> Iniciando script do <servidor> <===")

    tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    host = CapturarIPHost()
    porta = int(input("Informe a porta para comunicar-se com o COORDENADOR: "))
    tupla = (host, porta)
    tcp.bind(tupla)
    tcp.listen(1)

    conexao, cliente = tcp.accept() 
    ReceberRequisicao(conexao)


if __name__ == "__main__":
    IniciarExecucao()