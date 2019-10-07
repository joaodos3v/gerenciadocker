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
    infos = {'valor': valorA, 'multiplicador': valorB}        
    cliente.send(pickle.dumps(infos))
    try:
        retorno = cliente.recv(1024)
        valor = float(pickle.loads(retorno))
        print("Resultado da transação: %s" % valor)
    except Exception as e:
        print("========> Erro: % s" % e)

def IniciarExecucao():
    ip = 'localhost'
    porta = 12348

    cliente = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    cliente.connect((ip, porta))

    while True:
        valorA = float(input('Digite o primero valor para a multiplicacao (0 para sair): '))
        if(valorA == 0): break
        valorB = float(input('Digite o multiplicador: '))

        enviando = Thread(target=EnviaRequisicao, args=(cliente,valorA,valorB,))
        enviando.start()
        enviando.join()
        

if __name__ == "__main__":
    IniciarExecucao()
