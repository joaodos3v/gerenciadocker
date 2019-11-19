import Page from 'components/Page';
import { IconWidget } from 'components/Widget';
import { machines } from 'demos/widgetPage';
import React, { useState, useEffect } from 'react';
import {
  Col,
  Row,
} from 'reactstrap';


function MonitoringPage() {
  const [maquinas, setMaquinas] = useState([]);
  const nomeNetwork = 'dockerNetwork';
  const nomeDriver = 'bridge';
  const address = 'http://localhost:5000';

  useEffect(() => {
    let resposta = {status: 0, network_id: 44};
    fetch(address+'/network/criar', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: nomeNetwork,
        driver: nomeDriver,
      })
    })
    .then(response => response.json())
    .then(json => {resposta = json});
    console.log(resposta);

      /*
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
        id: "1",
        nome: "Postgres",
        status: 0,
        mensagem: "Informações localizadas",
        cpu: "90%",
        ram: "1024MB"
      },
      {
        id: "1",
        nome: "Postgres",
        status: 0,
        mensagem: "Informações localizadas",
        cpu: "90%",
        ram: "1024MB"
      },
      {
        id: "1",
        nome: "Postgres",
        status: 0,
        mensagem: "Informações localizadas",
        cpu: "90%",
        ram: "1024MB"
      },
      {
        id: "1",
        nome: "Postgres",
        status: 0,
        mensagem: "Informações localizadas",
        cpu: "90%",
        ram: "1024MB"
      },
      {
        id: "1",
        nome: "Postgres",
        status: 0,
        mensagem: "Informações localizadas",
        cpu: "90%",
        ram: "1024MB"
      },
      {
        id: "1",
        nome: "Postgres",
        status: 0,
        mensagem: "Informações localizadas",
        cpu: "90%",
        ram: "1024MB"
      },
      {
        id: "1",
        nome: "Postgres",
        status: 0,
        mensagem: "Informações localizadas",
        cpu: "90%",
        ram: "1024MB"
      },
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
      */

    if (resposta.status === 1) {
      const intervalId = setInterval(() => {
        fetch(address+'/container/consultar/network/'+resposta.network_id)
        .then(response => response.json())
        .then(json => setMaquinas(json.containers))
      }, 5000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, []);

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
    <Page
      className="DashboardPage"
      title="Monitoramento"
    >

      <Row>
        {machines.map(
          ({ bgColor, icon, name, status, message, progress, ...restProps }, index) => (
            <Col key={index} lg={4} md={6} sm={6} xs={12} className="mb-3">
              <IconWidget
                bgColor={bgColor}
                icon={icon}
                name={name}
                status={status}
                message={message}
                progress={progress}
                {...restProps}
              />
            </Col>
          )
        )}
      </Row>

    </Page>
  );
}

export default MonitoringPage;
