import { Bar } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const ParticipantChart = ({participantsRegData}) => {
// Assuming participantsRegData is an array of registration timestamps
    const regData = participantsRegData.reduce((acc, timestamp) => {
        const date = new Date(timestamp).toISOString().split('T')[0]; // Extract date part
        acc[date] = (acc[date] || 0) + 1; // Increment count for the date
        return acc;
    }, {});

    const registrationsData = Object.keys(regData).map(date => ({
        date: date,
        count: regData[date]
    }));

    // Extracting dates and counts
    const dates = registrationsData.map(entry => entry.date);
    const counts = registrationsData.map(entry => entry.count);

    // Data for the chart
    const data = {
        labels: dates,
        datasets: [
            {
                label: 'Registrations per Day',
                data: counts,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                type: 'bar', // Bar type for this dataset
            },
        ],
    };

    // Options for the chart
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Registrations per Day',
            },
        },
    };

    return (
        <div className='overflow-y-auto'>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ParticipantChart;