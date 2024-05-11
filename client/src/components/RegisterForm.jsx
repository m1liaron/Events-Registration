import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import {CardTitle} from "react-bootstrap";

const RegisterForm = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [birth, setBirth] = useState('');
    const [source, setSource] = useState('');

    let navigate = useNavigate()

    const navigateBack = () => {
        navigate('/')
    }

    const {id} = useParams()

    const RegisterOnEvent = () => {
        const data = {
            fullName,
            email,
            date_of_birth: birth,
            know_from: source,
            event_id: id
        }
         axios.post(`http://localhost:3000/participants`, data)
            .then((response) => {
                console.log(response)
                navigateBack()
            }).catch((error) => {
                console.eror(error)
         })
    }

    return (
        <Form className='p-5' onSubmit={RegisterOnEvent}>
            <CardTitle>Form registration</CardTitle>
            <Form.Group className="mb-3" controlId="formBasicEmail">

                <Form.Label>Full name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    onChange={(e) => setFullName(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDate">
                <Form.Label>Date of birth</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Date of birth"
                    onChange={(e) => setBirth(e.target.value)}
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Label>Where did you hear about us?</Form.Label>
                <div className="d-flex gap-2">
                    <Form.Check
                        type="radio"
                        label="Social media"
                        name="source"
                        value="Social media"
                        onChange={e => setSource(e.target.value)}
                    />
                    <Form.Check
                        type="radio"
                        label="Friends"
                        name="source"
                        value="Friends"
                        onChange={e => setSource(e.target.value)}
                    />
                    <Form.Check
                        type="radio"
                        label="Found myself"
                        name="source"
                        value="Found myself"
                        onChange={e => setSource(e.target.value)}
                    />
                </div>
            </Form.Group>

            <Button variant="primary" type="submit">
                Register
            </Button>
        </Form>
    );
}

export default RegisterForm;