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
        headers = {'Authorization': 'key=AAAAkzzank4:APA91bGNXhwsn9OeBSYvOUvMluQH5TBXxPo9XZUJdy78Kv12Q6w_OTGpDhG9-6GbTdcCXK83D4vIa2qao4cs-nTjKgH8uC_RZvY5svoo1cOMG8Jmfs1AzhrA9Z3ZqowJW9p9GF35txZc'}
        notificacao = {
            "to": "d0XqFNb7Xf8Q5xzLZSWpI1:APA91bHawRUL48YW4ZY4hFbzGukq4NvbHX9ZMBJYusOYS_VZX_gPM_Hp6XWkohlb_9e6r6-3H4Mky9cxNCB1bxMwJqrcMc5dsMDXxK7KRqxbYJT126GwKdUqrO0QuVNcOSZ61pBSf2kY",
            "notification": {
                "title": "%s" % self.titulo,
                "body": "%s" % self.mensagem,
         		"click_action": "http://localhost:8080",
 		        "icon": "http://localhost:8080/static/img/icons/android-chrome-512x512.png"
            }
        }
        r = requests.post(url, data=json.dumps(notificacao), headers=headers)
        print(r.text)