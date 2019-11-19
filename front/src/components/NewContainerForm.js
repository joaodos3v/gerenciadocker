import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

class NewContainerForm extends React.Component {

  handleSubmit = event => {
    event.preventDefault();
    alert("Vsf Nelson");
  };

  render() {
    const {
      distroLabel,
      children,
    } = this.props;

    return (
      <Form onSubmit={this.handleSubmit}>
        <div className="text-center pb-4">
          <h4>Novo Container</h4>
        </div>
        <FormGroup>
          <Label for={distroLabel}>{distroLabel}</Label>
          <Input type="select" name="select">
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
};

NewContainerForm.defaultProps = {
  distroLabel: 'Distribuição'
};

export default NewContainerForm;
