import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate, useParams} from "react-router-dom";
import {CardTitle} from "react-bootstrap";
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CalendarComponent from "./Calendar.jsx";

const RegisterForm = () => {
    let navigate = useNavigate()

    const {id} = useParams()
    const RegisterOnEvent = (values) => {
        const date = new Date(values.birth);
        const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

        const data = {
            fullName: values.fullName,
            email: values.email,
            date_of_birth: formattedDate,
            know_from: values.source,
            event_id: id,
        };

         axios.post(`https://events-registration-server.vercel.app/participants/:${id}`, data)
            .then((response) => {
                console.log(response)
                navigate(-1)
            }).catch((error) => {
                console.error(error)
         })
    }

    const initialValues = {
        fullName: '',
        email: '',
        birth: '',
        source: '',
    };

    const validationSchema = Yup.object({
        fullName: Yup.string().required('Full name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        birth: Yup.string().required('Date of birth is required'),
        source: Yup.string().required('Please select where you heard about us'),
    });

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={RegisterOnEvent}
            validationSchema={validationSchema}
        >
            {(formik) => (
                <Form className="p-5" onSubmit={formik.handleSubmit}>
                    <CardTitle>Form registration</CardTitle>
                    <div className="mb-3">
                        <label htmlFor="fullName" className="form-label">
                            Full name
                        </label>
                        <Field
                            type="text"
                            id="fullName"
                            name="fullName"
                            placeholder="Enter full name"
                            className="form-control"
                        />
                        <ErrorMessage name="fullName" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email address
                        </label>
                        <Field
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            className="form-control"
                        />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="birth" className="form-label">
                            Date of birth
                        </label>
                        <Field
                            type="text"
                            id="birth"
                            name="birth"
                            placeholder="Date of birth"
                            className="form-control"
                        />
                        <CalendarComponent
                            handleChange={(selectedDate) => formik.setFieldValue('birth', selectedDate)}
                        />
                        <ErrorMessage name="birth" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Where did you hear about us?</label>
                        <div className="d-flex gap-2">
                            <label>
                                <Field type="radio" name="source" value="Social media" />
                                Social media
                            </label>
                            <label>
                                <Field type="radio" name="source" value="Friends" />
                                Friends
                            </label>
                            <label>
                                <Field type="radio" name="source" value="Found myself" />
                                Found myself
                            </label>
                        </div>
                        <ErrorMessage name="source" component="div" className="text-danger" />
                    </div>

                    <Button type="submit" className="btn btn-primary">
                        Register
                    </Button>
                </Form>
            )}
        </Formik>
    );
}

export default RegisterForm;