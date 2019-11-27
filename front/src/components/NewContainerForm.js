import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

class NewContainerForm extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      nomeContainer: '',
      distroMaquina: 'ubuntu',
    }

    this.updateInput = this.updateInput.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }
    
  updateInput(event){
    this.setState({nomeContainer : event.target.value})
  }

  handleSelect(event){
    this.setState({distroMaquina : event.target.value})
  }
  
  handleSubmit = event => {
    let address = 'https://f35b1078.ngrok.io'; //'http://localhost:5000'
    console.log("Distro: " + this.state.distroMaquina + ", Nome: " + this.state.nomeContainer);

    let resposta = {mensagem: "Ok"};
    fetch(address+'/container/iniciar', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome: this.state.nomeContainer,
        distro: this.state.distroMaquina,
        versao: 'adaptive-dsd',
        network: localStorage.getItem('@gerenciadocker/dockerNetworkId'),
      })
    })
    .then(response => response.json())
    .then(json => {
      console.log(json.mensagem);
    })
    .catch(err => { 
      console.error('Falha ao iniciar container', err); 
    });
  }

  render() {
    const {
      distroLabel,
      nomeLabel,
      children,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="text-center pb-4">
          <h4>Novo Container</h4>
        </div>
        <FormGroup>
          <Label for={nomeLabel}>{nomeLabel}</Label>
          <Input type="text" name="container" onChange={this.updateInput}/>
          <br/>
          <Label for={distroLabel}>{distroLabel}</Label>
          <Input type="select" name="select" onChange={this.handleSelect}>
            <option value="ubuntu">Ubuntu</option>
            <option value="debian">Debian</option>
            <option value="centos">CentOS</option>
            <option value="alpine">Alpine</option>
            <option value="flask">Flask</option>
            <option value="apache2">Apache</option>
            <option value="python">Python</option>
          </Input>
        </FormGroup>
        <hr />
        <Button
          size="lg"
          className="bg-gradient-theme-left border-0"
          block
          onClick={this.handleSubmit}>
          CRIAR
        </Button>
        {children}
      </Form>
    );
  }
}

NewContainerForm.propTypes = {
  distroLabel: PropTypes.string,
  nomeLabel: PropTypes.string,
};

NewContainerForm.defaultProps = {
  distroLabel: 'Distribuição',
  nomeLabel: 'Nome do Container',
};

export default NewContainerForm;
