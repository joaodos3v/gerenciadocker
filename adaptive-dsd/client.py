import socket 
import pickle
import json


def CapturarIPHost():
    try:  
        ip = socket.gethostbyname(socket.gethostname())
        print("O IP do host e: ", ip, sep=' ')
        return ip
    except: 
        print("\n Não foi possivel pegar o hostname e o IP do servidor \n")
        ip = input("Qual o ip do servidor? ")
        return ip


def EnviaRequisicao(cliente, lista): 
    opcao = int(input("Qual opção? (0 - Iniciar, 1 - Receber informações)"))
    if opcao == 0:
        msg = EnviarInformacao(cliente, "start")
        print(msg)
        json_lista = json.dumps(lista)
        print("lista Json: " + json_lista)
        EnviarResposta(cliente, json_lista)
    elif opcao == 1:
        EnviarResposta(cliente, "info")
        json_tested = ReceberResposta(cliente)
        json_state = ReceberResposta(cliente)
        print("json_tested: " + json_tested)
        print("json_state: " + json_state)


def EnviarResposta(conexao, resultado):    
    conexao.send(pickle.dumps(resultado))


def ReceberResposta(conexao):
    try:
        retorno = conexao.recv(1024)
        msg = pickle.loads(retorno)
    except:
        print("Erro ao receber resposta!")
        msg = "ERROR"
    return msg


def EnviarInformacao(conexao, informacao):
    EnviarResposta(conexao, informacao)

    tentativas = 0
    msg = ""
    while msg != "OK" and tentativas < 3:
        msg = ReceberResposta(conexao)
        tentativas = tentativas + 1
    return msg


def IniciarExecucao():
    lista = [] 
    host = ""

    while host != "0":
        host = input("Digite o IP/porta de uma máquina na rede (0 para prosseguir): ")
        if host != "0":
            lista.append(host)

    print(lista)
    while True:
        ip = input("Informe o IP para conectar (0 para sair): ")
        if ip == "0":
            break
        porta = int(input("Informe a porta para conectar: "))

        cliente = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        cliente.connect((ip, porta))

        EnviaRequisicao(cliente, lista)
        

if __name__ == "__main__":
    IniciarExecucao()
