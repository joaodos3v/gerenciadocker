import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

class NewContainerForm extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      nomeContainer: '',
      distroMaquina: '',
    }

    this.updateInput = this.updateInput.bind(this);
  }
    
    
  updateInput(event){
    this.setState({nomeContainer : event.target.value})
  }
  
  handleSubmit = event => {
    let nomeNetwork = 'dockerNetwork';
    let address = 'http://localhost:5000';
    console.log("Distro: " + this.state.distroMaquina + ", Nome: " + this.state.nomeContainer);

    let resposta = {mensagem: "Ok"};
    // fetch(address+'/container/iniciar', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     nome: this.state.nomeContainer,
    //     distro: this.state.distroMaquina,
    //     versao: 'Latest',
    //     network: nomeNetwork,
    //   })
    // })
    // .then(response => response.json())
    // .then(json => resposta = json);
    alert(resposta.mensagem);
    console.log(resposta.mensagem);
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
          <Input type="select" name="select" >
            <option>Distro 1</option>
            <option>Distro 2</option>
            <option>Distro 3</option>
            <option>Distro 4</option>
            <option>Distro 5</option>
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
