import notFound from '../assets/not-found.webp';
import BackButton from '../components/BackButton.jsx';

const NotFoundPage = () => {
    return (
        <div className='container d-flex justify-content-center align-items-center vh-100'>
            <BackButton className='position-absolute top-0 start-0 m-3' />
            <div className='text-center'>
                <img src={notFound} alt='Not Found' className='img-fluid' style={{ maxWidth: '500px' }} />
                <h1 className='mt-4'>Page Not Found</h1>
            </div>
        </div>
    );
};

export default NotFoundPage;