import {useEffect, useState} from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Dropdown, DropdownButton} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import LoadingComponent from "./LoadingComponent.jsx";
import useAxios from "../hooks/useAxios.js";
import ModalComponent from "./Modals/Modal.jsx";
import CalendarComponent from "./Form/Calendar.jsx";
import resetIcon from '../assets/reset-icon.png'

import calendarIcon from '../assets/calendar-icon.png'
import {formatDate} from "../utills/formatDate.js";

const EventsList = () => {
    const [events, setEvents] = useState([])
    const [sortBy, setSortBy] = useState('title');
    const [filterDate, setFilterDate] = useState('');
    const [page, setPage] = useState(1);
    const [haveMore, setHaveMore] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const {data, loading, error, fetchData} = useAxios(`https://events-registration-83va.onrender.com/events?page=${page}&sortBy=${sortBy}&filterDate=${filterDate}`)


    // set data to events state
    useEffect(() => {
        setEvents(data.events);
        setHaveMore(data.haveMoreEvents);
    }, [data]);

    // get data if change page, sortBy and filterData, and also on first render😥
    useEffect(() => {
        fetchData()
    }, [page, sortBy, filterDate]);

    const isBottomOfPage = () => { // check is user scrolled to bottom
        // Calculate the scroll position
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;

        // Check if user has scrolled to the bottom
        return scrollTop + clientHeight >= scrollHeight;
    }

    const ifBottomPageAndMorePage = () => {
        if (isBottomOfPage() && haveMore) {
            setPage((page) => page + 1);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', ifBottomPageAndMorePage);

        return () => {
            window.removeEventListener('scroll', ifBottomPageAndMorePage);
        }
    }, [haveMore]);

    const handleSortChange = (sort) => {
        setSortBy(sort);
    }

    const isDescLessOneHundred = (event) => {
        return event.description.length > 100 ? `${event.description.slice(0, 100)}...` : event.description
    }

    const resetFilters = () => {
        setFilterDate('');
    }

    return (
        <div className="p-5">
            <div className='d-flex align-items-center gap-2'>
                <DropdownButton id="dropdown-basic-button" title="Sort by">
                    <Dropdown.Item onClick={() => handleSortChange('title')}>Title</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange('description')}>Description</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange('event_date')}>Event Date</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSortChange('organizer')}>Organizer</Dropdown.Item>
                </DropdownButton>
                <div className='d-flex align-items-center g-1'>
                    <Button variant="info" onClick={() => setModalVisible(true)}>
                        <img
                            alt='calendar'
                            src={calendarIcon}
                            style={{width: 20, height: 20}}
                        />
                    </Button>
                    {filterDate && (<p className='m-2'>{formatDate(filterDate.toString())}</p>)}
                </div>
                <Button variant="info" onClick={resetFilters}>
                    <img
                        src={resetIcon}
                        alt='reset button'
                        style={{width: 20, height: 20}}
                    />
                </Button>
                <h3 style={{textAlign: 'center'}}>Events: {events?.length}</h3>
            </div>

            {events && (
                <div className="flex-wrap d-flex p-5 gap-5">
                    {events?.map((event) => (
                        <Card style={{maxWidth: '19rem', minWidth:'15rem'}} key={event._id}>
                            <Card.Body>
                                <Card.Title>{event.title}</Card.Title>
                                <Card.Text>{isDescLessOneHundred(event)}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Card.Text style={{
                                    border: '1px solid rgba(0, 0, 0, 0.175)',
                                    padding: 3,
                                    borderRadius: 10,
                                    textAlign: 'center'
                                }}>{formatDate(event.event_date)}</Card.Text>
                                <div className="d-flex justify-content-between">
                                    <NavLink to={`/register/${event._id}`}>
                                        <Button variant="primary">Register</Button>
                                    </NavLink>
                                    <NavLink to={`/participants/${event._id}`}>
                                        <Button variant="btn">View</Button>
                                    </NavLink>
                                </div>
                            </Card.Footer>
                        </Card>))
                    }
                </div>
            )}

            {loading && <LoadingComponent/> }

            {filterDate && !events.length ? (
                <div>
                    <h4>Not found events by your filter, check another date.😊</h4>
                </div>
            ) : null}

            {error && (<h1 className='text-bg-danger'>{error}</h1>)}

            <ModalComponent showModal={modalVisible} setShowModal={setModalVisible} title='Filter by date'>
                <CalendarComponent handleChange={(data) => setFilterDate(data)}/>
            </ModalComponent>
        </div>
    );
}

export default EventsList;