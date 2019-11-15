// Adiciona uma nova falha no localStorage
let addFailure = (payload) => {
    let failures = window.localStorage.getItem("failures") || '{"data": []}';
    failures = JSON.parse(failures);

    const { notification } = payload;
    let newFailure = {
        "container_name": notification.title.split("]")[0].substr(1),
        "date": getDate(),
        "description": notification.body
    };

    failures.data.push(newFailure);
    window.localStorage.setItem('failures', JSON.stringify(failures));

    updateList();
};

// Atualiza (visualmente) a lista de falhas
let updateList = () => {
    console.log("[Failures] Update List...");
    
    const ul = document.getElementById("failures-list");

    let failures = window.localStorage.getItem("failures") || '{"data": []}';
    failures = JSON.parse(failures);

    if (failures.data.length == 0) {
        let warning = "<h4 class='text-center text-success'>Nenhuma falha ocorreu na sua rede, ainda :)</h4>";
        ul.insertAdjacentHTML("beforeend", warning);
    } else {
        ul.innerHTML = "";
    
        failures.data.forEach(failure => {
            let newLi = `
                <li class="media">
                    <img src="img/warning.png" class="mr-3" alt="Ícone de alerta">
                    <div class="media-body">
                        <h4 class="mt-0 mb-1">
                            ${failure.container_name} <br>
                            <small class="text-muted">Em <i>${failure.date}.</i></small>
                        </h4>
                        <p class="text-justify">
                            ${failure.description}
                        </p>
                        <hr>
                    </div>
                </li>
            `;
    
            ul.insertAdjacentHTML("beforeend", newLi);
        });
    }
};

updateList();

// Registra o serviceWorker para permitir o funcionamento offline
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('service-worker.js')
    .then(reg => console.log("[ServiceWorker] Registered..."))
    .catch(err => console.log("[ServiceWorker] Erro ao registrar:", err));
}