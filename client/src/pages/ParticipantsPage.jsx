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
import Button from "react-bootstrap/Button";
import useAxios from "../hooks/useAxios.js";
import LoadingComponent from "../components/LoadingComponent.jsx";
import resetIcon from '../assets/reset-icon.png'

const ParticipantsPage = () => {
    const [participants, setParticipants] = useState([]);
    const [search, setSearch] = useState({ email: '', fullName: '' });
    const [modal, setModal] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

    const {id} = useParams()
    const {data, loading, error, fetchData} = useAxios(`http://localhost:3000/participants/${id}`);

    useEffect(() => {
        if (data) {
            setParticipants(data.participants);
        }
    }, [data]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 988);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const searchParticipants = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/participants/${id}/search?name=${search.fullName}&email=${search.email}`);
            setParticipants(response.data.participants);
        } catch (error) {
            console.error(error.message);
        }
    }

    const participantsRegData = participants?.map(item => item.registration_date);

    return (
        <div className='p-5'>
                <div className='d-flex justify-content-between align-items-center'>
                    <BackButton/>
                    <BurgerMenu showModal={() => setModal(!modal)}/>
                </div>
                {participants?.length > 0 &&
                    (
                        <div className='d-flex justify-content-between'>
                                <SearchParticipants
                                    search={search}
                                    setSearch={setSearch}
                                    onSearch={searchParticipants}
                                    fetchData={fetchData}
                                />
                            {!isMobile && (
                                <ParticipantChart participantsRegData={participantsRegData} />
                            )}
                        </div>
                    )
                }
            <div className='d-flex justify-content-center flex-wrap gap-4 overflow-y-auto'>
                {!loading ? (
                    participants?.map((participant) => (
                        <Card style={{ width: '18rem' }} key={participant._id}>
                            <Card.Body>
                                <Card.Title>{participant.fullName}</Card.Title>
                                <Card.Title>{participant.email}</Card.Title>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                        <LoadingComponent/>
                )}
            </div>
            <div>
                <ModalComponent showModal={modal} setShowModal={setModal} title='Registration per day chart'>
                    <ParticipantChart participantsRegData={participantsRegData} />
                </ModalComponent>
            </div>
        </div>
    );
}

const SearchParticipants = ({search, setSearch, onSearch, fetchData}) => {

    const handleChange = (e, key) => {
        setSearch({ ...search, [key]: e.target.value });
    }
    const resetSearch = async () => {
        await setSearch({ email: '', fullName: '' });
        fetchData()
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
                    value={search.email}
                    onChange={(e) => handleChange(e, 'email')}
                />
            </InputGroup>

            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Participant's full name"
                    aria-label="Participant's full name"
                    aria-describedby="basic-addon2"
                    value={search.fullName}
                    onChange={(e) => handleChange(e, 'fullName')}
                />
            </InputGroup>
            <div className='d-flex gap-2 align-items-center'>
                <Button onClick={onSearch}>Search</Button>
                <Button variant="info" onClick={resetSearch}>
                    <img
                        src={resetIcon}
                        alt='reset button'
                        style={{width:20, height:20}}
                    />
                </Button>
            </div>
        </div>
    )
}


export default ParticipantsPage;