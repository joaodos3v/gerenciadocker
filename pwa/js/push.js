console.log("[PushNotification] Start - Push listening...");

// Retorna a data atual no formato "d/m/Y, Hhm"
let getDate = () => {
    let date = new Date();
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}, às ${date.getHours()}h${date.getMinutes()}`;
};

const messaging = firebase.messaging();

// Requisita um token para receber notificações
let getToken = () => {
    messaging.getToken()
        .then(currentToken => {
            if (currentToken) {
                console.log("[PushNotification] Token Atual: ", currentToken);
                return currentToken;
            } else {
                console.warn("[PushNotification] Nenhum id disponível!");
            }
        })
        .catch(err => console.warn("[PushNotification] Get Token Error: ", err));
}


// Solicita permissão ao usuário para exibir notificações
messaging.requestPermission()
    .then(() => {
        console.log("[PushNotification] Permission granted!");
        getToken();
    });


// "Escuta" mensagens locais (com o aplicativo aberto)
messaging.onMessage((payload) => {
    console.log("[PushNotification] Local Message: ", payload);
    addFailure(payload);
});
