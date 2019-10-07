import socket
import pickle

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



def RecebePedidoDoCliente():
    pass

if __name__ == "__main__":
    RecebePedidoDoCliente()