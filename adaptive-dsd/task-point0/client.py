import socket
from threading import Thread
import glob
import time
import pickle
import subprocess
import os
import operator
from time import sleep


def EnviaRequisicao(cliente, valorA, valorB):
    global valores
    infos = {'valor': valorA, 'multiplicador': valorB}        
    cliente.send(pickle.dumps(infos))
    try:
        retorno = cliente.recv(1024)
        valor = float(pickle.loads(retorno))
        print("AQUI E O VALOR: %s" % valor)
        valores.append(valor)
        # cliente.close()
    except Exception as e:
        print("========> Erro: % s" % e)


def TratarResposta(opcao):

    print(valores)

    if opcao == 1:
        votacao = {}
        for i in range(len(valores)):
            if votacao.get(valores[i]) > 0:
                votacao.update(valores[i], votacao.get(valores[i]) + 1)
            else:
                votacao.update(valores[i], 1)
        valor = max(votacao.items(), key=operator.itemgetter(1))[0]
        print("Resultado: ", valor)
    elif opcao == 2:
        print("Resultado: ", valores[0])
    else:
        media = 0.0
        for i in range(len(valores)):
            media = media + valores[i]
        media = media / len(valores)
        print("Resultado: ", media)



def IniciarExecucao():
    # host = ['192.168.0.0', '192.168.0.0', '192.168.0.0']
    hosts = ['servidor1', 'servidor2', 'servidor3']
    porta = 12348
    global valores

    conexoes = []
    for ip in hosts:
        cliente = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        cliente.connect((ip, porta))
        conexoes.append(cliente)

    while True:
        valorA = float(input('Digite o primero valor para a multiplicacao (0 para sair): '))
        if(valorA == 0): break
        valorB = float(input('Digite o multiplicador: '))

        valores = []
        threads = []
        for conexao in conexoes:
            enviando = Thread(target=EnviaRequisicao, args=(conexao,valorA,valorB,))
            threads.append(enviando)
            enviando.start()
            enviando.join()

            
        opcao = int(input('Metodo de escolha: \n1 - Votacao\n2 - Primeira resposta\n3 - Media\nOpcao: '))
        TratarResposta(opcao)
        

valores = []
if __name__ == "__main__":
    IniciarExecucao()
