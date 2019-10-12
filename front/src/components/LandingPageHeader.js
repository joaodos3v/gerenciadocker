import React from "react";
import { Link } from 'react-router-dom';

// reactstrap components
import { Button, Container } from "reactstrap";

// core components

function LandingPageHeader() {
  let pageHeader = React.createRef();

  React.useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });
  return (
    <>
      <div className="page-header page-header-small">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("./../assets/img/header-background.jpg") + ")"
          }}
          ref={pageHeader}
        ></div>
        <div className="content-center">
          <Container>
            <h1 className="title">Gerencie <i>containers</i> facilmente.</h1>
            <div className="text-center">
              <Link to="/demonstration">
                <Button className="btn-round" color="info" size="lg">
                  <i className="fab fa-docker"></i> INICIAR
                </Button>
              </Link>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
}

export default LandingPageHeader;
