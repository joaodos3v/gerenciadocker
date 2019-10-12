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
                        "url(" + require("./assets/img/login.jpg") + ")"
                    }}
                  >
                    <p className="blockquote blockquote-info">
                      "Over the span of the satellite record, Arctic sea ice has
                      been declining significantly, while sea ice in the
                      Antarctichas increased very slightly" <br></br>
                      <br></br>
                      <small>-NOAA</small>
                    </p>
                  </div>
                  <div
                    className="image-container"
                    style={{
                      backgroundImage:
                        "url(" + require("./assets/img/bg3.jpg") + ")"
                    }}
                  ></div>
                </Col>
                <Col md="5">
                  <div
                    className="image-container image-right"
                    style={{
                      backgroundImage:
                        "url(" + require("./assets/img/bg1.jpg") + ")"
                    }}
                  ></div>
                  <h3>
                    So what does the new record for the lowest level of winter
                    ice actually mean
                  </h3>
                  <p>
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens with climate change. Even if the
                    Arctic continues to be one of the fastest-warming regions of
                    the world, it will always be plunged into bitterly cold
                    polar dark every winter. And year-by-year, for all kinds of
                    natural reasons, there’s huge variety of the state of the
                    ice.
                  </p>
                  <p>
                    For a start, it does not automatically follow that a record
                    amount of ice will melt this summer. More important for
                    determining the size of the annual thaw is the state of the
                    weather as the midnight sun approaches and temperatures
                    rise. But over the more than 30 years of satellite records,
                    scientists have observed a clear pattern of decline,
                    decade-by-decade.
                  </p>
                  <p>
                    The Arctic Ocean freezes every winter and much of the
                    sea-ice then thaws every summer, and that process will
                    continue whatever happens with climate change. Even if the
                    Arctic continues to be one of the fastest-warming regions of
                    the world, it will always be plunged into bitterly cold
                    polar dark every winter. And year-by-year, for all kinds of
                    natural reasons, there’s huge variety of the state of the
                    ice.
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
