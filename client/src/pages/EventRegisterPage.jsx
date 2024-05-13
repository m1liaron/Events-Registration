import RegisterForm from "../components/Form/RegisterForm.jsx";
import BackButton from "../components/BackButton.jsx";

const EventRegisterPage = () => {
    return (
        <div className='p-5'>
            <BackButton/>
            <RegisterForm/>
        </div>
    );
}

export default EventRegisterPage;