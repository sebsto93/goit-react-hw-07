import React, { useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import SearchBox from "./components/SearchBox";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchContacts,
  addContact,
  deleteContact,
} from "./redux/contactsSlice";
import { setFilter } from "./redux/filterSlice";
import styles from "./App.module.css";

const App = () => {
  const {
    items: contacts,
    loading,
    error,
  } = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filters.name);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (name, number) => {
    dispatch(addContact({ name, number }));
  };

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <SearchBox value={filter} onChange={handleFilterChange} />
      {loading && <p>Loading contacts...</p>}
      {error && <p>Error: {error}</p>}
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
