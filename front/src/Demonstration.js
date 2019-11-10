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

  useEffect(() => {
    const maquinasNovas = [
      {
        id: "1",
        status: 0,
        mensagem: "Informações localizadas",
        cpu: "90%",
        ram: "1024MB"
      },
      {
        id: "2",
        status: 1,
        mensagem: "Informações localizadas",
        cpu: "50%",
        ram: "4096MB"
      },
      {
        id: "3",
        status: 1,
        mensagem: "Informações localizadas",
        cpu: "10%",
        ram: "512MB"
      },
      {
        id: "4",
        status: 1,
        mensagem: "Informações localizadas",
        cpu: "60%",
        ram: "2048MB"
      },
      {
        id: "5",
        status: 0,
        mensagem: "Informações localizadas",
        cpu: "99%",
        ram: "8000MB"
      }];
    // fetch('localhost:5000/container/lista')
    // .then(response => response.json())
    // .then(json => setMaquinas(json))
    setMaquinas(maquinasNovas);

    // const intervalId = setInterval(() => {
    //   atualizaMaquinas();
    // }, 5000);

    // return () => {
    //   clearInterval(intervalId);
    // };

  }, []);

  const atualizaMaquinas = () => {
    // const maquinasNovas = maquinas.map(maquina => {
    //     fetch('localhost:5000/container/consultar/'+maquina.id)
    //     .then(response => response.json())
    //     .then(json => maquina = json)
    //     return maquina
    // })
    
  }

  const handleCriarClick = (distroMaquina, versaoMaquina) => {
    console.log("Distro: " + distroMaquina + ", Versão: " + versaoMaquina);

    // let resposta = {};
    // fetch('localhost:5000/container/iniciar', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     distro: {distroMaquina},
    //     versao: {versaoMaquina},
    //   })
    // })
    // .then(response => response.json())
    // .then(json => resposta = json);


  }

  const handlePararClick = (containerId) => {
    console.log("Parar container: " + containerId);
    // let resposta = {};
    // fetch('localhost:5000/container/parar', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     container_id: containerId,
    //   })
    // })
    // .then(response => response.json())
    // .then(json => resposta = json);
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
                      ID: {maquina.id}<br/>
                      Status: {maquina.status === 1 ? 'Normal' : 'Falho'}<br/>
                      Mensagem: {maquina.mensagem}<br/>
                      Uso de CPU: {maquina.cpu}<br/>
                      Uso de memória: {maquina.ram}
                    </span>
                  </p>
                  <Button className="btn-round" color="secondary" onClick={() => handlePararClick(maquina.id)}>
                    Parar
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