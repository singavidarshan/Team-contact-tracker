import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', notes: '' });
  const [editId, setEditId] = useState(null);

  const fetchContacts = async () => {
    const res = await axios.get('https://your-backend.onrender.com/api/contacts'); // UPDATE this
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`https://your-backend.onrender.com/api/contacts/${editId}`, form); // UPDATE
    } else {
      await axios.post('https://your-backend.onrender.com/api/contacts', form); // UPDATE
    }
    setForm({ name: '', email: '', phone: '', company: '', notes: '' });
    setEditId(null);
    fetchContacts();
  };

  const handleEdit = (contact) => {
    setForm(contact);
    setEditId(contact._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://your-backend.onrender.com/api/contacts/${id}`); // UPDATE
    fetchContacts();
  };

  return (
    <>
      <div className="container">
        <h1>📇 Employee Contact Manager</h1>
        <form onSubmit={handleSubmit}>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Name" required />
          <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" />
          <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone" />
          <input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company" />
          <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Notes"></textarea>
          <button type="submit">{editId ? 'Update Contact' : 'Add Contact'}</button>
        </form>
      </div>

      <div className="cards-container">
        {contacts.map((contact) => (
          <div className="contact-card" key={contact._id}>
            <strong>{contact.name}</strong> <span>({contact.company})</span>
            <p>📞 {contact.phone}</p>
            <p>✉ {contact.email}</p>
            {contact.notes && <p>📝 {contact.notes}</p>}
            <div>
              <button onClick={() => handleEdit(contact)}>Edit</button>
              <button onClick={() => handleDelete(contact._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
