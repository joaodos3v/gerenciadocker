import React from 'react';

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col
} from "reactstrap";

// core components
import DefaultNavbar from "./components/DefaultNavbar.js";
import LandingPageHeader from "./components/LandingPageHeader.js";
import DefaultFooter from "./components/DefaultFooter.js";

function LandingPage() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("landing-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  return (
    <>
      <DefaultNavbar />
      <div className="wrapper">
        <LandingPageHeader />

        {/* SEÇÃO - QUEM NÓS SOMOS? */}
        <div className="section section-about-us">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className="title">Quem nós somos?</h2>
                <h5 className="description">
                  O <span className="font-weight-bold">Gerenciadocker</span> é uma plataforma criada
                  com o intuito de facilitar o uso do conceito de conteinerização. Como, atualmente,
                  a tecnologia mais utilizada para colocar esse conceito em prática é o Docker, essa
                  ferramenta permite que os <i>containers</i> sejam gerenciados de uma forma fácil,
                  através de uma interface simples e intuitiva.
                </h5>
              </Col>
            </Row>
            <div className="separator separator-primary"></div>
            <div className="section-story-overview">
              <Row>
                <Col md="6">
                  <div
                    className="image-container image-left"
                    style={{
                      backgroundImage:
                        "url(" + require("./assets/img/img-background3.jpg") + ")"
                    }}
                  >
                    <p className="blockquote blockquote-info">
                      "O <span className="font-weight-bold">Gerenciadocker</span>, me
                      ajudou a orquestrar meus <i>containers</i>, dividir a
                      responsabilidade de cada ferramenta e, então,
                      finalmente vencer Os Selvagens." <br></br>
                      <br></br>
                      <small>- JON SNOW</small>
                    </p>
                  </div>
                  <div
                    className="image-container"
                    style={{
                      backgroundImage:
                        "url(" + require("./assets/img/img-background1.jpg") + ")"
                    }}
                  ></div>
                </Col>
                <Col md="5">
                  <div
                    className="image-container image-right"
                    style={{
                      backgroundImage:
                        "url(" + require("./assets/img/img-background2.jpg") + ")"
                    }}
                  ></div>
                  <h3>Então, quais as vantagens de utilizar a nossa ferramenta?</h3>
                  <p>
                    Já chega de ter dores de cabeça todas as vezes
                    que um novo desenvolvedor é contratado na equipe
                    e ele precisa configurar o ambiente para dar sequência
                    ao projeto. Já chega de ter problemas ao colocar a 
                    aplicação em produção porque a versão de uma biblioteca
                    estava errada. Já chega de se preocupar com qual
                    <i> framework </i> você tem instalado no seu computador.
                  </p>
                  <p>
                    O conceito de conteinerização chegou para resolver esse
                    problema e permitir que ambientes inteiros e funcionais
                    de uma aplicação ganhem em mobilidade e praticidade, já
                    que com alguns poucos comandos, você consegue exportá-los
                    e importá-los, por exemplo. Mas e se, ao
                    invés de ter que aprender esses comandos, você simplesmente
                    clicasse em um botão?
                  </p>
                  <p>
                    Essa é a ideia do <span className="font-weight-bold">Gerenciadocker</span>,
                    tornar mais fácil o uso dessa ferramenta tão poderosa que é o <i>docker</i>.
                    Com nossa aplicação, você consegue orquestrar todos os seus <i>containers </i>
                    por meio de uma interface minimalista e simples, que fornece todas as opções
                    necessárias para implantar esse tecnologia recente e inovadora na sua empresa!
                  </p>
                </Col>
              </Row>
            </div>
          </Container>
        </div>

        {/* SEÇÃO - TIME */}
        <div className="section section-team text-center">
          <Container>
            <h2 className="title">Esse é o nosso time</h2>
            <div className="team">
              <Row>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("./assets/img/joao.jpeg")}
                    ></img>
                    <h4 className="title">João Vitor Veronese Vieira</h4>
                    <p className="category text-info">Desenvolvedor</p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="https://github.com/joao-vieira"
                      target="_blank"
                    >
                      <i className="fab fa-github"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="https://twitter.com/VeroneseVitor"
                      target="_blank"
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="https://www.linkedin.com/in/jo%C3%A3o-vitor-veronese-vieira/"
                      target="_blank"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </Button>
                  </div>
                </Col>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("./assets/img/kelwinzao.jpeg")}
                    ></img>
                    <h4 className="title">Kelwin Komka</h4>
                    <p className="category text-info">Desenvolvedor</p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="https://github.com/KelwinKomka"
                      target="_blank"
                    >
                      <i className="fab fa-github"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="https://twitter.com/ahmok08"
                      target="_blank"
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="https://www.linkedin.com/in/kelwin-k-08623b101/"
                      target="_blank"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </Button>
                  </div>
                </Col>
                <Col md="4">
                  <div className="team-player">
                    <img
                      alt="..."
                      className="rounded-circle img-fluid img-raised"
                      src={require("./assets/img/vinao.jpeg")}
                    ></img>
                    <h4 className="title">Vinicius Emanoel Andrade</h4>
                    <p className="category text-info">Desenvolvedor</p>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="https://github.com/viniciusandd"
                      target="_blank"
                    >
                      <i className="fab fa-github"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="https://twitter.com/vinauun"
                      target="_blank"
                    >
                      <i className="fab fa-twitter"></i>
                    </Button>
                    <Button
                      className="btn-icon btn-round"
                      color="info"
                      href="https://www.instagram.com/viniciusandd/"
                      target="_blank"
                    >
                      <i className="fab fa-instagram"></i>
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>

        <DefaultFooter />
      </div>
    </>
  );
}

export default LandingPage;
