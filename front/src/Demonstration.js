import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// reactstrap components
import { 
  Button,
  Container,
  Row,
  Col 
} from "reactstrap";

function Demonstration() {
  const [maquinas, setMaquinas] = useState([]);
  const [networkId, setNetworkId] = useState('');
  const nomeNetwork = 'dockerNetwork';
  const driver = '?';
  const address = 'localhost:5000';

  useEffect(() => {
    let resposta = {status: 1, network_id: 1};
    // fetch(address+'/network/criar', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     nome: {containerId},
    //     driver: {driver}
    //   })
    // })
    // .then(response => response.json())
    // .then(json => resposta = json);
    console.log(resposta.mensagem);

    // fetch(address+'/container/consultar/network/'+networkId)
    // .then(response => response.json())
    // .then(json => setMaquinas(json.containers))

    if (resposta.status == 1) {
      setNetworkId(resposta.network_id);
      const intervalId = setInterval(() => {
        atualizaMaquinas();
      }, 5000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);

  const atualizaMaquinas = () => {
    // fetch(address+'/container/consultar/network/'+networkId)
    // .then(response => response.json())
    // .then(json => setMaquinas(json.containers))

    const maquinasNovas = [
      {
        id: "1",
        nome: "Postgres",
        status: 0,
        mensagem: "Informações localizadas",
        cpu: "90%",
        ram: "1024MB"
      },
      {
        id: "2",
        nome: "Apache",
        status: 1,
        mensagem: "Informações localizadas",
        cpu: "50%",
        ram: "4096MB"
      },
      {
        id: "3",
        nome: "Oracle",
        status: 1,
        mensagem: "Informações localizadas",
        cpu: "10%",
        ram: "512MB"
      },
      {
        id: "4",
        nome: "Python",
        status: 2,
        mensagem: "Informações localizadas",
        cpu: "60%",
        ram: "2048MB"
      },
      {
        id: "5",
        nome: "AppServer",
        status: 0,
        mensagem: "Informações localizadas",
        cpu: "99%",
        ram: "8000MB"
      }];
    setMaquinas(maquinasNovas);
  }

  const handleCriarClick = (distroMaquina, versaoMaquina) => {
    console.log("Distro: " + distroMaquina + ", Versão: " + versaoMaquina);
    let nomeContainer = prompt('Informa um nome para o container');

    let resposta = {mensagem: "Ok"};
    fetch(address+'/container/iniciar', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: nomeContainer,
        distro: distroMaquina,
        versao: versaoMaquina,
        network: nomeNetwork,
      })
    })
    .then(response => response.json())
    .then(json => resposta = json);
    alert(resposta.mensagem);
    console.log(resposta.mensagem);
  }

  const handlePararClick = (containerId) => {
    console.log("Parar container: " + containerId);
    let resposta = {mensagem: "Teste"};
    fetch(address+'/container/parar', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        container_id: containerId,
      })
    })
    .then(response => response.json())
    .then(json => resposta = json);

    alert(resposta.mensagem);
    console.log(resposta.mensagem);
  }

  const handleRemoverClick = (containerId) => {
    console.log("Remover container: " + containerId);
    let resposta = {};
    fetch(address+'/container/remover', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        container_id: containerId,
      })
    })
    .then(response => response.json())
    .then(json => resposta = json);

    alert(resposta.mensagem);
    console.log(resposta.mensagem);
  }

  return (
    <>
      <div className="text-center">
        <h1>Demonstração</h1>
      </div>
      <div className="text-center">
        <Container>
          <Row>
          {maquinas && maquinas.map(maquina => {
            return (
              <Col md="4" key={maquina.id}>
                <div className="blockquote blockquote-info">
                  <p>
                    <span className="font-weight-bold">
                      Nome: {maquina.nome}<br/>
                      Status: {maquina.status === 1 ? 'Normal' : maquina.status === 2 ? 'FALHO' : 'Parado'}<br/>
                      Uso de CPU: {maquina.cpu}<br/>
                      Uso de memória: {maquina.ram}
                    </span>
                  </p>
                  <Button className="btn-round" color="secondary" onClick={() => handlePararClick(maquina.id)}>
                    Parar
                  </Button>
                  <Button className="btn-round" color="secondary" onClick={() => handleRemoverClick(maquina.id)}>
                    Remover
                  </Button>
                </div>
              </Col>
            )
          })}
          </Row>
        </Container>
      </div>
      <footer className="footer footer-default">
        <div >
          <Link to="/">
            <Button className="btn-round" color="secondary">
              Voltar
            </Button>
          </Link>
          <Button className="btn-round" color="secondary" onClick={() => handleCriarClick("ubuntu", "18.04")}>
            Criar Ubuntu 18.04
          </Button>
          <Button className="btn-round" color="secondary" onClick={() => handleCriarClick("win", "10")}>
            Criar Windows 10
          </Button>
          <Button className="btn-round" color="secondary" onClick={() => handleCriarClick("ubuntu", "16.10")}>
            Criar Ubuntu 16.10
          </Button>
        </div>
      </footer>
    </>
  );
}

export default Demonstration;