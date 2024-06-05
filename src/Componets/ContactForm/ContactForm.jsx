import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';

const ContactForm = ({ addContact }) => {
    const initialValues = {
        name: '',
        number: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Required')
            .min(3, 'Must be at least 3 characters')
            .max(50, 'Must be 50 characters or less'),
        number: Yup.string()
            .required('Required')
            .matches(/^\d{3}-\d{2}-\d{2}$/, 'Phone number is not valid'),
    });

    const onSubmit = (values, { resetForm }) => {
        const newContact = { ...values, id: nanoid() };
        addContact(newContact);
        resetForm();
    };

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form className={styles.form}>
                <div>
                    <label htmlFor="name">Name</label>
                    <Field type="text" id="name" name="name" />
                    <ErrorMessage name="name" component="div" className={styles.errorMessage} />
                </div>
                <div>
                    <label htmlFor="number">Number</label>
                    <Field type="text" id="number" name="number" />
                    <ErrorMessage name="number" component="div" className={styles.errorMessage} />
                </div>
                <button type="submit">Add Contact</button>
            </Form>
        </Formik>
    );
};

export default ContactForm;

