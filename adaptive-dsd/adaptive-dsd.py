import socket 
import pickle
import json
import time
import random

tested_up = []
state = []
maquinas = []
porta_host = 0
ip_host = ""

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
    print("Aguardando mensagem...")
    msg = ReceberResposta(conexao)

    if msg == "start":
        IniciarTeste(conexao)
    elif msg == "check":
        RealizarVerificacao(conexao)
    elif msg == "keepTest":
        ContinuarTeste(conexao)
    elif msg == "keepInfo":
        ManterInformacao(conexao)
    elif msg == "info":
        RetornaInformacao(conexao, False)


def IniciarTeste(conexao):
    global maquinas
    global tested_up
    global state

    EnviarResposta(conexao, "OK")
    json_maquinas = ReceberResposta(conexao)
    maquinas = json.loads(json_maquinas)

    tested_up = ["-1"] * len(maquinas)
    state = ["FALHO"] * len(maquinas)

    print("maquinas: " + str(maquinas))
    print("tested_up: " + str(tested_up))
    print("state: " + str(state))

    index = maquinas.index(ip_host+":"+str(porta_host))
    state[index] = "NORMAL"
    if index == len(maquinas)-1:
        index = 0
    TestarMaquina(index)


def TestarMaquina(index):
    global maquinas
    global tested_up
    global state
    global ip_host
    global porta_host

    index_maquina = maquinas.index(ip_host+":"+str(porta_host))
    while index < len(maquinas):
        if index_maquina != index and tested_up[index] != "X":
            host, porta = maquinas[index].split(":")
            time.sleep(0.5)
            maquina = CriarConexao(host, porta)

            msg = EnviarInformacao(maquina, "check")
            if msg == "OK":
                time.sleep(0.5)
                maquina = CriarConexao(host, porta)
                EnviarInformacao(maquina, "keepTest")

                tested_up[index_maquina] = str(index)
                state[index] = "NORMAL"

                json_maquinas = json.dumps(maquinas)
                json_tested = json.dumps(tested_up)
                json_state = json.dumps(state)
                
                EnviarInformacao(maquina, json_maquinas)
                EnviarInformacao(maquina, json_tested)
                EnviarInformacao(maquina, json_state)

                maquina.close()
                break
            else:
                print("maquina com falha: " + str(index))
                tested_up[index] = "X"
                state[index] = "FALHO"
                index = index + 1
        else:
            index = index + 1

    if index == len(maquinas):
        print("Iniciar segundo ciclo...")
        DistribuirInformacao()


def RealizarVerificacao(conexao):
    # se tem que fazer alguma coisa aqui
    erro = random.randint(0, 5)
    if erro == 1:
        print('Máquina com erro!')
        EnviarResposta(conexao, "ERROR")
    else: 
        print('Máquina funcionando.')
        EnviarResposta(conexao, "OK")


def ContinuarTeste(conexao):
    global maquinas
    global tested_up
    global state

    EnviarResposta(conexao, "OK")

    json_maquinas = ReceberResposta(conexao)
    maquinas = json.loads(json_maquinas)
    EnviarResposta(conexao, "OK")

    json_tested = ReceberResposta(conexao)
    tested_up = json.loads(json_tested)
    EnviarResposta(conexao, "OK")

    json_state = ReceberResposta(conexao)
    state = json.loads(json_state)
    EnviarResposta(conexao, "OK")

    index = 0
    segundo_ciclo = True
    while index < len(tested_up):
        if tested_up[index] == "-1":
            segundo_ciclo = False
            break
        index = index + 1

    if segundo_ciclo:
        print("Iniciar segundo ciclo...")
        DistribuirInformacao()
    else:
        index_maquina = maquinas.index(ip_host+":"+str(porta_host))
        if index_maquina == len(maquinas)-1:
            index_maquina = 0
        TestarMaquina(index_maquina)


def DistribuirInformacao():
    global maquinas
    global tested_up
    global ip_host
    global porta_host

    index = 0
    achou_maquina = False
    index_host = maquinas.index(ip_host+":"+str(porta_host))
    while index < len(tested_up):
        if state[index] == "NORMAL" and index_host != index:
            achou_maquina = True
            break
        index = index + 1

    if achou_maquina:
        tested_up[index_host] = str(index)
        time.sleep(0.5)
        host, porta = maquinas[index].split(":")
        print("Enviando informaçoes para maquina: " + host + ":" + porta)
        maquina = CriarConexao(host, porta)

        EnviarInformacao(maquina, "keepInfo")
        RetornaInformacao(maquina, True)
        maquina.close()
    else:
        print("Não há mais máquinas funcionando normalmente.")


def ManterInformacao(conexao):
    global tested_up
    global state
    global porta_host
    global ip_host
    EnviarResposta(conexao, "OK")

    json_tested = ReceberResposta(conexao)
    tested_up = json.loads(json_tested)
    EnviarResposta(conexao, "OK")

    json_state = ReceberResposta(conexao)
    state = json.loads(json_state)
    EnviarResposta(conexao, "OK")

    index_host = maquinas.index(ip_host+":"+str(porta_host))
    indexMaquina = int(tested_up[index_host])
    if index_host < len(maquinas)-1 and indexMaquina > index_host:
        time.sleep(0.5)
        host, porta = maquinas[int(indexMaquina)].split(":")
        maquina = CriarConexao(host, porta)

        EnviarInformacao(maquina, "keepInfo")
        RetornaInformacao(maquina, True)
        maquina.close()


def RetornaInformacao(conexao, verificacao):
    global tested_up
    global state

    json_tested = json.dumps(tested_up)
    json_state = json.dumps(state)

    if verificacao:
        EnviarInformacao(conexao, json_tested)
        EnviarInformacao(conexao, json_state)
    else:
        EnviarResposta(conexao, json_tested)
        EnviarResposta(conexao, json_state)
    conexao.close()


def CriarConexao(host, porta):
    tentativas = 0
    while tentativas < 3:
        try:
            print("Conexão com host: " + host + ", porta: " + porta)
            conexao = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            conexao.connect((host, int(porta)))
            tentativas = 3
            print("Conectado.")
        except:
            tentativas = tentativas + 1
            print("Erro ao conectar!")
    return conexao


def EnviarResposta(conexao, resultado):    
    conexao.send(pickle.dumps(resultado))


def ReceberResposta(conexao):
    try:
        retorno = conexao.recv(1024)
        msg = pickle.loads(retorno)
    except:
        print("Erro ao receber resposta!")
        msg = "!"
    print("msg: " + msg)
    return msg


def EnviarInformacao(conexao, informacao):
    EnviarResposta(conexao, informacao)

    tentativas = 0
    msg = ""
    while msg != "OK" and msg != "ERROR" and tentativas < 3:
        msg = ReceberResposta(conexao)
        tentativas = tentativas + 1
    return msg


def IniciarExecucao():    
    print("===> Iniciando script do <servidor> <===")
    global porta_host
    global ip_host

    ip_host = CapturarIPHost()
    porta_host = 5001

    while int(porta_host) > 0:
        print("\n\n\n")
        print("Aguardando conexão com socket...")
        tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        tupla = (ip_host, int(porta_host))
        tcp.bind(tupla)
        tcp.listen(1)

        conexao, cliente = tcp.accept() 
        ReceberRequisicao(conexao)


if __name__ == "__main__":
    IniciarExecucao()