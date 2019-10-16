import socket 
import pickle
import json

tested_up = []
state = []
maquinas = []

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
    print("json_maquinas: " + json_maquinas)
    maquinas = json.loads(json_maquinas)

    tested_up = ["-1"] * len(maquinas)
    state = ["FALHO"] * len(maquinas)
    
    state[1] = "NORMAL"

    print("maquinas: " + str(maquinas))
    print("tested_up: " + str(tested_up))
    print("state: " + str(state))

    index = 1
    TestarMaquina(index)


def TestarMaquina(index):
    global maquinas
    global tested_up
    global state
    while index < len(maquinas):
        host, porta = maquinas[index].split(":")
        print("host: " + host + ", porta: " + porta)
        maquina = CriarConexao(host, porta)

        EnviarResposta(maquina, "check")
        msg = ReceberResposta(maquina)
        if msg == "OK":
            EnviarInformacao(maquina, "keepTest")

            tested_up[index-1] = str(index)
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
            tested_up[index] = "X"
            state[index] = "FALHO"
            index = index + 1


def RealizarVerificacao(conexao):
    # se tem que fazer alguma coisa aqui
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
    while index < len(tested_up):
        if tested_up[index] == "-1":
            break
        index = index + 1

    if index == len(tested_up):
        DistribuirInformacao()
    else:
        TestarMaquina(index)


def DistribuirInformacao():
    global maquinas

    index = 0
    while index < len(tested_up):
        if state[index] == "NORMAL":
            break
        index = index + 1

    host, porta = maquinas[index].split(":")
    maquina = CriarConexao(host, porta)

    EnviarInformacao(maquina, "keepInfo")
    RetornaInformacao(maquina, True)


def ManterInformacao(conexao):
    global tested_up
    global state

    json_tested = ReceberResposta(conexao)
    tested_up = json.loads(json_tested)
    EnviarResposta(conexao, "OK")

    json_state = ReceberResposta(conexao)
    state = json.loads(json_state)
    EnviarResposta(conexao, "OK")

    index = 0
    while index < len(maquinas):
        if maquinas[index] == CapturarIPHost():
            break
        index = index + 1
    
    if index < len(maquinas)-1:
        indexMaquina = tested_up[index]

        host, porta = maquinas[index].split(":")
        maquina = CriarConexao(host, porta)

        EnviarInformacao(maquina, "keepInfo")
        RetornaInformacao(maquina, True)


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


def CriarConexao(host, porta):
    conexao = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    conexao.connect((host, int(porta)))
    return conexao


def EnviarResposta(conexao, resultado):    
    conexao.send(pickle.dumps(resultado))


def ReceberResposta(conexao):
    try:
        retorno = conexao.recv(1024)
        msg = pickle.loads(retorno)
    except:
        print("Erro ao receber resposta!")
        msg = "ERROR"
    print("msg: " + msg)
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
    print("===> Iniciando script do <servidor> <===")

    host = CapturarIPHost()
    porta = int(input("Informe a porta (0 para sair): "))

    while porta > 0:
        tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        tupla = (host, porta)
        tcp.bind(tupla)
        tcp.listen(1)

        conexao, cliente = tcp.accept() 
        ReceberRequisicao(conexao)


if __name__ == "__main__":
    IniciarExecucao()