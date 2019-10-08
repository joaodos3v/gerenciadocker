import socket
import pickle
from threading import Thread

# O comportamento do coordenador é o seguinte:
#   0) recebe pedido de requisição do cliente
#   1) envia pedido de transação a todos os participantes
#   2) recebe de volta os votos dos participantes dizendo se eles concordam ou não com o início da transação
#       2.1) caso algum participante não concorde, o coordenador aborta a transação (doAbort) 
#       2.2) caso todos participantes concordem, o coordenador inicia o pedido de gravação (preCommit)
#   3) coordenador, novamente, recebe e reúne os votos de todos os participantes (sobre)
#       3.1) se não houve falhas e todos votos foram em "sim", o coordenador envia o doCommit
#           3.1.1) recebe a resposta "haveCommited" dos participantes
#       3.2) caso contrário, o coordenador decide cancelar e envia doAbort a quem votou "sim"

# Mensagens ----------
#   Primeira: Valor
#   Segunda: preCommit
#   Terceira: doCommit
#   Em caso de falha: ABORT
#   Participante: S ou N

votos = []

def AguardaConexao():
    tcp = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    host = CapturarIPHost()
    print(host)
    porta = int(input("Informe a porta para comunicar-se com o CLIENTE: "))
    tupla = (host, porta)
    tcp.bind(tupla)
    tcp.listen(1)

    conexao, cliente = tcp.accept() 
    RecebePedidoDoCliente(conexao)


def CapturarIPHost():
    try:  
        ip = socket.gethostbyname(socket.gethostname())
        print("O IP do host e: ", ip, sep=' ')
        return ip
    except: 
        print("\n Não foi possivel pegar o hostname e o IP do servidor \n")
        ip = input("Qual o ip do servidor? ")
        return ip


def RecebePedidoDoCliente(conexao):
    retorno = conexao.recv(1024)
    msg = pickle.loads(retorno)
    print("[Mensagem Recebida do Cliente pelo Coordenador] %s | %s " % (msg['valor'], msg['multiplicador']))

    valor = float(msg['valor'])
    multiplicador = float(msg['multiplicador'])
    valor_multiplicado = Multiplicar(valor, multiplicador)
    # mensagem_final = str(valor) + "*" +  str(multiplicador) + "=" + str(valor_multiplicado)
    mensagem_final = "%s*%s=%s" % (valor, multiplicador, valor_multiplicado)
    Comunicacao(conexao, mensagem_final)


def Multiplicar(valor, multiplicador):
    return valor * multiplicador


def Comunicacao(conexao_cliente, mensagem):
    participantes = ['localhost']

    porta = int(input("Informe a porta para comunicar-se com os PARTICIPANTES: "))    
    conexoes = []
    for ip in participantes:
        cliente = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        cliente.connect((ip, porta))
        conexoes.append(cliente)

    votos_participantes = EnviarEReceber(conexoes, mensagem)
    print("-------- 1ª ETAPA (votos participantes)")
    if 'N' in votos_participantes:
        print("Caiu dentro do primeiro if")
        doAbort(conexao_cliente, conexoes)
    else:
        resposta_participantes = preCommit(conexoes)

        if 'N' in resposta_participantes:
            
            # envia doAbort para quem votou sim
            for i in range(len(resposta_participantes)):
                if resposta_participantes[i] == "S":
                    EnviarEReceber(conexoes[i], "ABORT")
        else:
            status_participantes = EnviarEReceber(conexoes, "doCommit")
            conexao_cliente.send(mensagem)


def doAbort(conexao_cliente, participantes):
    # Envia "sinal" para os participantes de que a transação foi cancelada
    EnviarEReceber(participantes, "ABORT")
    
    # Retorna a mensagem final ao cliente, informando que a transação não pôde ser finalizada
    conexao_cliente.send("Transação cancelada, pois um dos participantes não concordou com a solicitação!")

    
def preCommit(participantes):
    # Envia "sinal" para os participantes pedindo para iniciar a gravação
    resposta_participantes = EnviarEReceber(participantes, "preCommit")

    return resposta_participantes


def EnviarEReceber(conexoes, mensagem):
            
    # Zerando os votos
    global votos
    votos = []    
    for i in range(len(conexoes)):
        enviando = Thread(target=IniciarThreadEnvio, args=(conexoes[i],mensagem, i,))
        enviando.start()
        enviando.join()

    print("###### Votos dos participantes ########")
    print(votos)

    # A thread armazenará em uma global, no momento em que todas
    # as threads terminarem, eu retorno para a função Comunicacao()
    # os votos dos participantes

    return votos

def IniciarThreadEnvio(conexao, mensagem, index):    
    conexao.send(pickle.dumps(mensagem))
    print("Enviou a mensagem pro participante...")
    voto = pickle.loads(conexao.recv(1024))    
    print("Recebeu o voto: %s" % voto)
    votos.append(voto)

if __name__ == "__main__":
    AguardaConexao()