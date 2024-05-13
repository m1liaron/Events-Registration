import {useEffect, useState} from 'react';
import axios from "axios";
import { useParams} from "react-router-dom";
import Card from "react-bootstrap/Card";
import BackButton from "../components/BackButton.jsx";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ParticipantChart from "../components/Participant/ParticipantChart.jsx";
import BurgerMenu from "../components/BurgerMenu.jsx";
import ModalComponent from "../components/Modals/Modal.jsx";

const ParticipantsPage = () => {
    const [participants, setParticipants] = useState([]);
    const [search, setSearch] = useState({ email: '', fullName: '' });
    const [searchedParticipants, setSearchedParticipants] = useState([]);
    const [modal, setModal] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

    const {id} = useParams()

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 988);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            await axios.get(`http://localhost:3000/participants/${id}`).then(response => {
                setParticipants(response.data.participants)
            }).catch(error => {
                console.error(error.message)
            })
        }

        fetchEvents()
    }, []);

    useEffect(() => {
        // Filter participants based on search criteria
        const filteredParticipants = participants.filter(participant => {
            return (
                participant.email.toLowerCase().includes(search.email.toLowerCase()) &&
                participant.fullName.toLowerCase().includes(search.fullName.toLowerCase())
            );
        });

        setSearchedParticipants(filteredParticipants);
    }, [search, participants]);

    const handleSearch = () => {
        setSearchedParticipants(participants.filter(participant => {
            return (
                participant.email.toLowerCase().includes(search.email.toLowerCase()) &&
                participant.fullName.toLowerCase().includes(search.fullName.toLowerCase())
            );
        }))
    }

    const participantsRegData = participants.map(item => item.registration_date);

    return (
        <div className='p-5'>
                <div className='d-flex justify-content-between align-items-center'>
                    <BackButton/>
                    <BurgerMenu showModal={() => setModal(!modal)}/>
                </div>
                {participants.length > 0 &&
                    (
                        <div className='d-flex justify-content-between'>
                            <SearchParticipants search={search} setSearch={setSearch}/>
                            {!isMobile && (
                                <ParticipantChart participantsRegData={participantsRegData} />
                            )}
                        </div>
                    )
                }
            <div className='d-flex justify-content-center flex-wrap gap-4 overflow-y-auto'>
                {participants.length ? (
                    searchedParticipants.map((participant) => (
                        <Card style={{ width: '18rem' }} key={participant._id}>
                            <Card.Body>
                                <Card.Title>{participant.fullName}</Card.Title>
                                <Card.Title>{participant.email}</Card.Title>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <div>
                        <h2>No participants</h2>
                        <img src="https://media3.giphy.com/media/mlvseq9yvZhba/giphy.gif?cid=6c09b95280iwtpntiyh6u2jkwanu6xiink315hegg08ldc0k&ep=v1_gifs_search&rid=giphy.gif&ct=g"/>
                    </div>
                )}
            </div>
            <ModalComponent showModal={modal} setShowModal={setModal} title='Registration per day chart'>
                <ParticipantChart participantsRegData={participantsRegData} />
            </ModalComponent>
        </div>
    );
}

const SearchParticipants = ({search, setSearch}) => {

    const handleChange = (e, key) => {
        setSearch({ ...search, [key]: e.target.value });
    }

    return (
        <div className='p-2' >
            <h4>Search</h4>
            <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <Form.Control
                    placeholder="Email"
                    aria-label="Email"
                    aria-describedby="basic-addon1"
                    onChange={(e) => handleChange(e, 'email')}
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Participant's full name"
                    aria-label="Participant's full name"
                    aria-describedby="basic-addon2"
                    onChange={(e) => handleChange(e, 'fullName')}
                />
            </InputGroup>
        </div>
    )
}


export default ParticipantsPage;