import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";

const BackButton = () => {
    const navigate = useNavigate();
    return (
        <Button variant="primary" onClick={() => navigate(-1)}>
            Go back
        </Button>
    );
}

export default BackButton;