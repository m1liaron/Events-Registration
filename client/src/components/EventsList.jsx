import React, {useEffect, useState} from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Col, Dropdown, DropdownButton} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import LoadingComponent from "./LoadingComponent.jsx";

const EventsList = () => {
    const [events, setEvents] = useState([])
    const [sortBy, setSortBy] = useState('title');
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [haveMore, setHaveMore] = useState(false);

    const fetchMoreEvents = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/events?page=${page}&sortBy=${sortBy}`);
            const {events, haveMoreEvents} = response.data
            setEvents(events);
            setHaveMore(haveMoreEvents)
        } catch (error) {
            console.error('Error fetching more events:', error);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchMoreEvents()
    },[page, sortBy])

    // const sortEvents = async () => {
    //     setIsLoading(true);
    //     try {
    //         const response = await axios.get(`http://localhost:3000/events?sortBy=${sortBy}`);
    //         const {events} = response.data
    //         setEvents(events);
    //     } catch (error) {
    //         console.error('Error fetching more events:', error);
    //         setIsLoading(false);
    //     }
    // }

    const isBottomOfPage = () => { // check is user scrolled to bottom
        // Calculate the scroll position
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;

        // Check if user has scrolled to the bottom
        return scrollTop + clientHeight >= scrollHeight;
    }

    useEffect(() => {
        const handleScroll = async () => {
            if (isBottomOfPage() && haveMore) {
                setPage((page) => page + 1);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [haveMore]);

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

            <h3>{events.length}</h3>
            {events.length || isLoading ? (
                <div className="flex-wrap d-flex p-5 gap-5">
                    {events.map((event) => (
                        <Card style={{width: '18rem'}} key={event._id}>
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
                <LoadingComponent/>
            )}
        </div>
    );
}

export default EventsList;