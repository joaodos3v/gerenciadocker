# https://fcm.googleapis.com/fcm/send
# Key = Authorization
# Value = key=AAAAkzzank4:APA91bGNXhwsn9OeBSYvOUvMluQH5TBXxPo9XZUJdy78Kv12Q6w_OTGpDhG9-6GbTdcCXK83D4vIa2qao4cs-nTjKgH8uC_RZvY5svoo1cOMG8Jmfs1AzhrA9Z3ZqowJW9p9GF35txZc
# {
# 	"to": "d0XqFNb7Xf8Q5xzLZSWpI1:APA91bHawRUL48YW4ZY4hFbzGukq4NvbHX9ZMBJYusOYS_VZX_gPM_Hp6XWkohlb_9e6r6-3H4Mky9cxNCB1bxMwJqrcMc5dsMDXxK7KRqxbYJT126GwKdUqrO0QuVNcOSZ61pBSf2kY",
# 	"notification": {
# 		"title": "Teste monstro",
# 		"body": "ALOUUUUUUUUUUUUUU",
# 		"click_action": "http://localhost:8080",
# 		"icon": "http://localhost:8080/static/img/icons/android-chrome-512x512.png"
# 	}
# }

import requests, json

class Notificacao:
    def __init__(self, titulo, mensagem):
        self.titulo = titulo
        self.mensagem = mensagem

    def enviar(self):
        url = "https://fcm.googleapis.com/fcm/send"
        headers = {
            'Content-Type': 'application/json',
            'Authorization': 'key=AAAAofhTans:APA91bH4loh0DwPxz3A_yQOp2ZVKP67coiYKvF6_ACUU_vcc6HmaWciDXl0j07xq9gJ6NkqaikId6X9Gj0YAA1phY-ZOCrzge_2Z7gYqFc-eE7MhZv8TjIB6UJfEHH887MIKeYrPKeOJ'
            }
        notificacao = {
            "to": "fTrkXafqkTICWYorL2DMCQ:APA91bHdlT72HcUBaa9DgWbPHOpBlDuYVsoErJySnnI9FJtVgWlL0osep8shbvUmpg5kceMG9f-wEepB_pPwIAn110j23H8kJNshuRU0ZgMOYREGR19PvyPT2x7GjpuGAKO7mv8kRL11",
            "notification": {
                "title": "%s" % self.titulo,
                "body": "%s" % self.mensagem,
         		"click_action": "https://joao-vieira.github.io/gerenciadocker/pwa/",
 		        "icon": "http://localhost:8080/static/img/icons/android-chrome-512x512.png"
            }
        }
        r = requests.post(url, data=json.dumps(notificacao), headers=headers)
        resposta = json.loads(r.text)
        # print(resposta)
        if resposta:
            if resposta['success'] == 1:
                return True        
        return False
