### Dependências e recomendações

1. Git
1. Docker
1. Python3
1. Nodejs (**opcional**)

**Observação:** De preferência testar em um ambiente com `Linux`. Não colocamos nenhum recurso que não exista suporte em ambiente com `Windows`, mas esse ambiente acabou não sendo testado em nenhum momento, ou seja, existe a possibilidade da aplicação não funcionar como esperado.

### Clonando o repositório
- `git clone https://github.com/joao-vieira/gerenciadocker.git`

### Sobre o projeto

- Utilizamos os conceitos de hooks abordados em aula, eles encontram-se no seguinte arquivo: `front/src/pages/MonitoringPage.js`

- Nesse arquivo possuem chamadas http que utilizam o **fetch**: `front/src/components/NewContainerForm.js`

- Os demais arquivos são componentes utilizados para estilizar a aplicação.

### Fazendo o download das imagens que serão utilizadas na demonstração

> Essa etapa é **opcional**, porém, realizá-la trará uma melhor experiência durante a demonstração, se não for realizada, a primeira vez que um container for inicializado, ele demorará uns segundos a mais por conta do `pull` que o próprio Docker fará.

1. docker pull viniciusandd/ubuntu:adaptive-dsd
1. docker pull viniciusandd/debian:adaptive-dsd
1. docker pull viniciusandd/alpine:adaptive-dsd
1. docker pull viniciusandd/centos:adaptive-dsd
1. docker pull viniciusandd/apache2:adaptive-dsd
1. docker pull viniciusandd/flask:adaptive-dsd
1. docker pull viniciusandd/python:adaptive-dsd

### Criando um ambiente virtual e instalando as dependências do backend

> O backend obrigatoriamente deve estar rodando no hospedeiro, lado-a-lado com o Docker. Para manter as dependências organizadas, abaixo tem um comando que cria um ambiente virtual (**virtualenv**).

1. `cd back`
1. `python3 -m venv .venv`
1. `source .venv/bin/activate`
1. `pip3 install -r requirements.txt`

### Executando o backend

- `python3 run.py`

A saída esperada é:

```
 * Serving Flask app "app" (lazy loading)
 * Environment: production
   WARNING: This is a development server. Do not use it in a production deployment.
   Use a production WSGI server instead.
 * Debug mode: on
 * Running on http://0.0.0.0:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 159-263-970

```

### Instalando as dependências do frontend

> Ao contrário do backend, o frontend pode ser executado tanto no hospedeiro quanto em um container. Abaixo, estão as duas opções, basta escolher uma.

#### Instalando no hospedeiro

1. `cd front`
1. `npm install`
1. `npm run start`

#### Buildando e executando em um container

1. Certifique-se que seu **bash** está na pasta `front`
1. `docker build -t gerenciadocker .`
1. `docker run -ti -p 3000:3000 gerenciadocker`

### Sobre o sistema e seus recursos

> O objetivo é monitorar os containers instanciados no hospedeiro, mostrando seu status atual (**se o Adaptive-DSD estiver rodando**), CPU, RAM e IPV4.

#### Home

Nela estão algunas informações sobre a aplicação, seu intuito é passar um aspecto de **Dashboard**.

#### Monitoramento

Os containers serão constantemente monitorados, devido à utilização dos Hooks. No canto superior direito está o botão `[NOVO CONTAINER]`, ele é responsável por enviar um `post` para a api, que por sua vez manda o Docker iniciar o container solicitado. Quando um container aparecer na tela, ele apresentará **3 ações**: `Pausar`, `Retomar` e `Excluir`. Vale a ressalva, um container só pode ser excluso de estiver pausado. **Um detalhe importante**, as ações `não são atualizadas imediatamente` na tela, pois só terá uma atualização de informações depois que o hook fizer uma nova chamada para a api (**são realizadas a cada 3 segundos**), ou seja, existe um pequeno delay entre o clique do usuário e a **resposta visual**.

#### Membros

Aqui estão os meliantes envolvidos nessa operação.

### Extra

> Nosso sistema possui uma PWA que recebe notificações da api sempre que um container estiver como `FALHO`. Para ela funcionar, é necessária uma intervenção manual. Abaixo, o passo-a-passo.

1. Abrir a [página com a PWA](https://joao-vieira.github.io/gerenciadocker/pwa/)
1. Aceitar a solicitação para mostrar as notificações
1. Abrir o console do js e copiar o `Token Atual` que aparecer
1. Abrir a classe `Notificacao` que está no seguinte caminho: `back/app/models/notificacao.py`
1. No método `enviar()`, mais precisamente no `dict` nomeado `notificacao`, substituir o atributo `to` pelo `Token Atual` copiado anteriormente.
1. Agora a PWA receberá notificações de falha (se as mesmas ocorrerem) se estiver em segundo plano, se estiver em primeiro plano, ela mostrará as notificações em um formato de lista. 