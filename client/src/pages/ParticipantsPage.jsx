import {useEffect, useState} from 'react';
import axios from "axios";
import { useParams} from "react-router-dom";
import Card from "react-bootstrap/Card";
import BackButton from "../components/BackButton.jsx";
import ParticipantChart from "../components/Participant/ParticipantChart.jsx";
import BurgerMenu from "../components/BurgerMenu.jsx";
import ModalComponent from "../components/Modals/Modal.jsx";
import useAxios from "../hooks/useAxios.js";
import LoadingComponent from "../components/LoadingComponent.jsx";
import noParticipantsIcon from '../assets/no_participants.webp'
import SearchParticipants from "../components/Participant/SearchParticipants.jsx";

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
                {participants?.length > 0 && (
                    <BurgerMenu showModal={() => setModal(!modal)}/>
                )}
            </div>
            {(participants?.length > 0 || (search.email !== '' || search.fullName !== '')) &&
                (
                    <div className='d-flex justify-content-between'>
                        <SearchParticipants
                            search={search}
                            setSearch={setSearch}
                            onSearch={searchParticipants}
                            fetchData={fetchData}
                        />
                        {!isMobile && (
                            <ParticipantChart participantsRegData={participantsRegData}/>
                        )}
                    </div>
                )
            }

            {participants?.length && !loading ? (
                <div className='d-flex justify-content-center flex-wrap gap-4 overflow-y-auto'>
                    {
                        participants?.map((participant) => (
                            <Card style={{width: '18rem'}} key={participant._id}>
                                <Card.Body>
                                    <Card.Title>{participant.fullName}</Card.Title>
                                    <Card.Title>{participant.email}</Card.Title>
                                </Card.Body>
                            </Card>
                        ))
                    }
                </div>
            ) : (
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <div>
                        <h1>No participants found</h1>
                        <img
                            src={noParticipantsIcon}
                            alt="No participants"
                            className='w-75'
                        />
                    </div>
                </div>
            )
            }
            {loading && <LoadingComponent/>}
            <h1 className='text-bg-danger'>{error}</h1>
            <div>
                <ModalComponent showModal={modal} setShowModal={setModal} title='Registration per day chart'>
                    <ParticipantChart participantsRegData={participantsRegData}/>
                </ModalComponent>
            </div>
        </div>
    );
}

export default ParticipantsPage;