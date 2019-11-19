
import React from 'react';
import NewContainerForm from 'components/NewContainerForm';
import {
  MdClearAll,
  MdAddToQueue
} from 'react-icons/md';
import {
  Button,
  Nav,
  Navbar,
  Modal,
  ModalBody,
} from 'reactstrap';
import bn from 'utils/bemnames';

const bem = bn.create('header');

class Header extends React.Component {
  state = {
    isOpenNotificationPopover: false,
    isNotificationConfirmed: false,
    isOpenUserCardPopover: false,
    show: false,
  };

  toggleNotificationPopover = () => {
    this.setState({
      isOpenNotificationPopover: !this.state.isOpenNotificationPopover,
    });

    if (!this.state.isNotificationConfirmed) {
      this.setState({ isNotificationConfirmed: true });
    }
  };

  toggleUserCardPopover = () => {
    this.setState({
      isOpenUserCardPopover: !this.state.isOpenUserCardPopover,
    });
  };

  toggleModal = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  handleSidebarControlButton = event => {
    event.preventDefault();
    event.stopPropagation();

    document.querySelector('.cr-sidebar').classList.toggle('cr-sidebar--open');
  };

  render() {
    const externalCloseBtn = (
      <button
        className="close"
        style={{
          position: 'absolute',
          top: '15px',
          right: '20px',
          fontSize: '3rem',
        }}
        onClick={this.toggleModal}>
        &times;
      </button>
    );

    return (
      <Navbar light expand className={bem.b('bg-white')}>
        <Nav navbar className="mr-2">
          <Button outline onClick={this.handleSidebarControlButton}>
            <MdClearAll size={25} />
          </Button>
        </Nav>
        <Nav navbar className={bem.e('nav-right')}>
          <Button outline onClick={this.toggleModal}>
            <MdAddToQueue size={25} /> &nbsp; NOVO CONTAINER
          </Button>
          <Modal
            isOpen={this.state.show}
            toggle={this.toggle}
            size="sm"
            backdrop="static"
            backdropClassName="modal-backdrop-light"
            external={externalCloseBtn}
            centered>
            <ModalBody>
              <NewContainerForm
                authState={this.state.authState}
                onChangeAuthState={this.handleAuthState}
              />
            </ModalBody>
          </Modal>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
