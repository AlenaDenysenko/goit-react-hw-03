import styles from './Contact.module.css';

const Contact = ({ id, name, number, deleteContact }) => {
    return (
        <li className={styles.contact}>
            <p>{name}: {number}</p>
            <button onClick={() => deleteContact(id)}>Delete</button>
        </li>
    );
};

export default Contact;

