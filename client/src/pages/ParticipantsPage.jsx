import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useParams} from "react-router-dom";
import Card from "react-bootstrap/Card";
import LoadingComponent from "../components/LoadingComponent.jsx";
import BackButton from "../components/BackButton.jsx";
import {CardTitle} from "react-bootstrap";

const ParticipantsPage = () => {
    const [participants, setParticipants] = useState([]);

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

    console.log(participants)

    return (
        <div className='p-5'>
            <BackButton/>
            <div className='d-flex justify-content-center flex-wrap'>
                {participants.length ? (
                    participants.map((participant) => (
                        <Card style={{ width: '18rem' }} key={participant._id}>
                            <Card.Body>
                                <Card.Title>{participant.fullName}</Card.Title>
                                <Card.Title>{participant.email}</Card.Title>
                            </Card.Body>
                        </Card>
                    ))
                ) : (
                    <CardTitle>No participants</CardTitle>
                )}
            </div>
        </div>
    );
}

export default ParticipantsPage;