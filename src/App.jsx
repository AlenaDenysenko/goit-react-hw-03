import { useEffect, useState } from 'react';
import ContactForm from './Componets/ContactForm/ContactForm';
import SearchBox from './Componets/SearchBox/SearchBox';
import ContactList from './Componets/ContactList/ContactList';
import styles from './App.module.css';

const App = () => {
    const [contacts, setContacts] = useState([
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const savedContacts = localStorage.getItem('contacts');
        if (savedContacts) {
            setContacts(JSON.parse(savedContacts));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    const addContact = (contact) => {
        setContacts(prevContacts => [...prevContacts, contact]);
    };

    const deleteContact = (contactId) => {
        setContacts(prevContacts => prevContacts.filter(contact => contact.id !== contactId));
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <h1>Phonebook</h1>
            <ContactForm addContact={addContact} />
            <SearchBox value={filter} onChange={handleFilterChange} />
            <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
        </div>
    );
};

export default App;


