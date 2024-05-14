import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

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