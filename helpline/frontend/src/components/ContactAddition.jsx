import React, { useState } from 'react';
import './stylesheets/ContactAddition.css';

const ContactAdditionForm = () => {
  // State to hold contacts and form input values
  const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem('contacts')) || []);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  // Add new contact to the list
  const addContact = () => {
    const newContacts = [...contacts, { name, phoneNumber, email }];
    setContacts(newContacts);
    localStorage.setItem('contacts', JSON.stringify(newContacts));
    // Reset input fields
    setName('');
    setPhoneNumber('');
    setEmail('');
  };

  // Remove contact from the list
  const removeContact = (index) => {
    const newContacts = contacts.filter((_, i) => i !== index);
    setContacts(newContacts);
    localStorage.setItem('contacts', JSON.stringify(newContacts));
  };

  return (
    <div className="contact-form-container">
      <h2>Add Contact</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Contact Name"
        className="input-field"
        required
      />
      <input
        type="tel"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Contact Phone Number"
        className="input-field"
        required
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Contact Email"
        className="input-field"
        required
      />
      <button onClick={addContact} className="add-button">Add Contact</button>
      <ul className="contact-list">
        {contacts.map((contact, index) => (
          <li key={index} className="contact-item">
            {contact.name} ({contact.phoneNumber}) - {contact.email}
            <button onClick={() => removeContact(index)} className="remove-button">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactAdditionForm;