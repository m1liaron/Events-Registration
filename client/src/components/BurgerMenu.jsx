import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const BurgerMenu = ({showModal}) => {
    return (
            <Navbar expand="lg" className="bg-body-tertiary" onClick={showModal}>
                <Container>
                    <Navbar.Brand href="#home"></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav"/>
                </Container>
            </Navbar>
    );
};

export default BurgerMenu;