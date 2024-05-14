import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function CalendarComponent({handleChange}) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Get tomorrow's date
    const [selectedDate, setSelectedDate] = useState(new Date());

    const formatShortDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        handleChange(date)
    };

    return (
        <div className='m-2'>
            <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                formatShortDate={formatShortDate}
            />
        </div>
    );
}

export default CalendarComponent;