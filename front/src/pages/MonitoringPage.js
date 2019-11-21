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
  const [network_id, setNetworkId] = useState(0);
  const nomeNetwork = 'dockerNetwork'; 
  const nomeDriver = 'bridge';
  const address = 'http://localhost:5000';

  useEffect(() => {
    let resposta = {status: 1, network_id: nomeNetwork};
    // fetch(address+'/network/criar', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     nome: nomeNetwork,
    //     driver: nomeDriver,
    //   })
    // })
    // .then(response => response.json())
    // .then(json => {
    //   console.log(json);
    //   resposta = json;
    // })
    // .catch(err => { 
    //   console.error('Falha ao iniciar rede', err); 
    // });
    console.log(resposta);

  //   const maquinasNovas = [
  //   {
  //     id: "1",
  //     nome: "Postgres",
  //     status: 0,
  //     mensagem: "Informações localizadas",
  //     cpu: "90%",
  //     ram: "1024MB"
  //   },
  //   {
  //     id: "2",
  //     nome: "Apache",
  //     status: 1,
  //     mensagem: "Informações localizadas",
  //     cpu: "50%",
  //     ram: "4096MB"
  //   },
  //   {
  //     id: "3",
  //     nome: "Oracle",
  //     status: 1,
  //     mensagem: "Informações localizadas",
  //     cpu: "10%",
  //     ram: "512MB"
  //   },
  //   {
  //     id: "4",
  //     nome: "Python",
  //     status: 2,
  //     mensagem: "Informações localizadas",
  //     cpu: "60%",
  //     ram: "2048MB"
  //   },
  //   {
  //     id: "5",
  //     nome: "AppServer",
  //     status: 0,
  //     mensagem: "Informações localizadas",
  //     cpu: "99%",
  //     ram: "8000MB"
  //   }];
  // setMaquinasInfo(maquinasNovas);

    if (resposta.status === 1) {
      setNetworkId(resposta.network_id);
      const intervalInfoId = setInterval(() => {
        fetch(address+'/container/consultar/network/'+resposta.network_id)
        .then(response => response.json())
        .then(json => {
          console.log(json);
          setMaquinasInfo(json.containers);
        })
        .catch(err => { 
          console.error('Falha ao receber dados', err); 
        });
      }, 5000);

      const intervalTestId = setInterval(() => {
        let resposta = "";
        fetch(address+'/adaptive/iniciar/'+resposta.network_id)
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

    alert(resposta.mensagem);
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

    alert(resposta.mensagem);
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

    alert(resposta.mensagem);
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
