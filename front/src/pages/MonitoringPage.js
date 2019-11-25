import Page from 'components/Page';
import { IconWidget } from 'components/Widget';
import React, { useState, useEffect } from 'react';
import {
  Col,
  Row,
} from 'reactstrap';
import {
  MdVerifiedUser,
  MdWarning
} from 'react-icons/md';


function MonitoringPage() {
  const [maquinasInfos, setMaquinasInfo] = useState([]);
  const [maquinas, setMaquinas] = useState([]);
  const nomeNetwork = 'dockerNetwork'; 
  const nomeDriver = 'bridge';
  const address = 'https://f35b1078.ngrok.io'; //http://localhost:5000

  useEffect(() => {
    let resposta = {status: 1, network_id: nomeNetwork};
    if (!localStorage.getItem('@gerenciadocker/dockerNetworkId')) {
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
      .then(json => {
        console.log(json);
        if (json.status > 0) {
          resposta = json;
          localStorage.setItem('@gerenciadocker/dockerNetworkId', resposta.network_id);
        }
      })
      .catch(err => { 
        console.error('Falha ao iniciar rede', err); 
      });
    }
    console.log(localStorage.getItem('@gerenciadocker/dockerNetworkId'));

    if (resposta.status === 1) {
      let networkId = resposta.network_id;
      if (localStorage.getItem('@gerenciadocker/dockerNetworkId'))
        networkId = localStorage.getItem('@gerenciadocker/dockerNetworkId');
      const intervalInfoId = setInterval(() => {
        fetch(address+'/container/consultar/network/'+networkId)
        .then(response => response.json())
        .then(json => {
          console.log(json);
          setMaquinasInfo(json.containers);
        })
        .catch(err => { 
          console.error('Falha ao receber dados', err); 
        });
      }, 3000);

      const intervalTestId = setInterval(() => {
        fetch(address+'/adaptive/iniciar/'+networkId)
        .then(response => response.json())
        .then(json => {
          console.log(json);
        })
        .catch(err => { 
          console.error('Falha ao iniciar teste', err); 
        });
      }, 30000);

      return () => {
        clearInterval(intervalInfoId);
        clearInterval(intervalTestId);
      };
    }
  }, []);

  useEffect(() => {
    const maquinasNovas = maquinasInfos.map((maquina) => {
      let cpuPercentage = parseInt(maquina.cpu.replace("%", "/"));
      let ramPercentage = parseInt(maquina.ram.replace("%", "/"));
      return (
      {
        // Visuais
        bgColor: maquina.status === 2 ? 'danger' : 'success',
        icon: maquina.status === 2 ? MdWarning : MdVerifiedUser,
        inverse: false,
    
        // Da API
        name: maquina.nome,
        id: maquina.id,
        status: maquina.status === 2 ? 'Com Falha' : maquina.status === 0 ? 'Parado' : 'Funcionando',  
        message: 'Informações localizadas',
        progress: [
          {
            label: "CPU",
            value: maquina.cpu,
            percentage: String(cpuPercentage),
            color: cpuPercentage >= 75 ? "danger" : "success" // < 75 = success || > = danger
          },
          {
            label: "RAM",
            value: "1024MB",
            percentage: String(ramPercentage),
            color: ramPercentage >= 75 ? "danger" : "success" // < 75 = success || > = danger
          },
        ]
      });
    });
    setMaquinas(maquinasNovas);
  }, [maquinasInfos]);

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
    .then(json => {
      console.log("Parar container: " + json);
      resposta = json;
    })
    .catch(err => { 
      console.error('Falha ao para container', err); 
    });;
    console.log(resposta.mensagem);
  }

  const handleRetomarClick = (containerId) => {
    console.log("Retomar container: " + containerId);
    let resposta = {mensagem: "Teste"};
    fetch(address+'/container/retomar', {
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
    .then(json => {
      console.log("Retomar container: " + json);
      resposta = json;
    })
    .catch(err => { 
      console.error('Falha ao retomar container', err); 
    });;

    console.log(resposta.mensagem);
  }

  const handleRemoverClick = (containerId) => {
    console.log("Remover container: " + containerId);
    let resposta = {mensagem: "Teste"};
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
    .then(json => {
      console.log("Remover container: " + json);
      resposta = json;
    })
    .catch(err => { 
      console.error('Falha ao remover container', err); 
    });;

    console.log(resposta.mensagem);
  }

  return (
    <Page
      className="DashboardPage"
      title="Monitoramento"
    >

      <Row>
        {maquinas.map(
          ({ bgColor, icon, name, id, status, message, progress, ...restProps }, index) => (
            <Col key={index} lg={4} md={6} sm={6} xs={12} className="mb-3">
              <IconWidget
                bgColor={bgColor}
                icon={icon}
                name={name}
                status={status}
                message={message}
                progress={progress}
                handleParar={() => handlePararClick(id)}
                handleRemover={() => handleRemoverClick(id)}
                handleRetomar={() => handleRetomarClick(id)}
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
