import React, {useEffect, useState} from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Col, Dropdown, DropdownButton} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import LoadingComponent from "./LoadingComponent.jsx";

const EventsList = () => {
    const [events, setEvents] = useState([])
    const [sortedEvents, setSortedEvents] = useState([]);
    const [sortBy, setSortBy] = useState('title');

    useEffect(() => {
        const fetchEvents = async () => {
            await axios.get('http://localhost:3000/events').then(response => {
                setEvents(response.data.events)
            }).catch(error => {
                console.error(error.message)
            })
        }

        fetchEvents()
    }, []);

    useEffect(() => {
        // Sort the events based on the selected criteria
        const sorted = [...events].sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return -1;
            if (a[sortBy] > b[sortBy]) return 1;
            return 0;
        });
        setSortedEvents(sorted);
    }, [events, sortBy]);

    const handleSortChange = (sort) => {
        setSortBy(sort);
    }

    const isDescLessOneHundred = (event) => {
        return event.description.length > 100 ? `${event.description.slice(0, 100)}...` : event.description
    }

    return (
        <div className="p-5">
            <DropdownButton id="dropdown-basic-button" title="Sort by">
                <Dropdown.Item onClick={() => handleSortChange('title')}>Title</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange('description')}>Description</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange('event_date')}>Event Date</Dropdown.Item>
                <Dropdown.Item onClick={() => handleSortChange('organizer')}>Organizer</Dropdown.Item>
                {/* Add more sorting options as needed */}
            </DropdownButton>

            {events.length ? (
                <div className="flex-wrap d-flex p-5 gap-5">
                    { sortedEvents.map((event) => (
                            <Card style={{ width: '18rem' }} key={event._id}>
                                <Card.Body>
                                    <Card.Title>{event.title}</Card.Title>
                                    <Card.Text>{isDescLessOneHundred(event)}</Card.Text>
                                    <Col className="justify-content-between d-flex">
                                        <NavLink to={`/register/${event._id}`}>
                                            <Button variant="primary">Register</Button>
                                        </NavLink>
                                        <NavLink to={`/participants/${event._id}`}>
                                            <Button variant="btn">View</Button>
                                        </NavLink>
                                    </Col>
                                </Card.Body>
                            </Card>
                        ))
                    }
                </div>
            ) : (
                <LoadingComponent />
            )}
        </div>
    );
}

export default EventsList;