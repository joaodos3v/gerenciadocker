import React from 'react';
import { Link } from 'react-router-dom';

// reactstrap components
import { Button } from "reactstrap";

class Sobre extends React.Component {
  render() {
    return (
      <div className="text-center">
          <h1>Página onde será feita a demonstração</h1>
          <Link to="/">
            <Button className="btn-round" color="secondary">
              VOLTAR
            </Button>
          </Link>
      </div>
    );
  }
}

export default Sobre;