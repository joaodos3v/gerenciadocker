let failures = window.localStorage.getItem('failures') || '{"data": []}';
failures = JSON.parse(failures);

// Código que lista todas as falhas
// # code here

// Registra o serviceWorker para permitir o funcionamento offline
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
    .register('service-worker.js')
    .then(reg => console.log("[ServiceWorker] Registered..."))
    .catch(err => console.log("[ServiceWorker] Erro ao registrar:", err));
}