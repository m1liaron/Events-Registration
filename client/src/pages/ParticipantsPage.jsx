import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useParams} from "react-router-dom";
import Card from "react-bootstrap/Card";
import BackButton from "../components/BackButton.jsx";
import {CardTitle} from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ParticipantChart from "../components/Participant/ParticipantChart.jsx";

const ParticipantsPage = () => {
    const [participants, setParticipants] = useState([]);
    const [search, setSearch] = useState({ email: '', fullName: '' });
    const [searchedParticipants, setSearchedParticipants] = useState([]);

    const {id} = useParams()

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
            <BackButton/>
                {participants.length > 0 &&
                    (
                        <div className='d-flex justify-content-between'>
                            <SearchParticipants search={search} setSearch={setSearch}/>
                            <ParticipantChart participantsRegData={participantsRegData}/>
                        </div>
                    )
                }
            <div className='d-flex justify-content-center flex-wrap gap-4'>
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
                        <img
                            src="https://media3.giphy.com/media/mlvseq9yvZhba/giphy.gif?cid=6c09b95280iwtpntiyh6u2jkwanu6xiink315hegg08ldc0k&ep=v1_gifs_search&rid=giphy.gif&ct=g"/>
                    </div>
                )}
            </div>
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