const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://JOBList:2005@cluster0.zlw9n.mongodb.net/contactManager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  company: String,
  notes: String,
});

const Contact = mongoose.model('Contact', contactSchema);

app.post('/api/contacts', async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.send(contact);
});

app.get('/api/contacts', async (req, res) => {
  const contacts = await Contact.find();
  res.send(contacts);
});

app.put('/api/contacts/:id', async (req, res) => {
  const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(contact);
});

app.delete('/api/contacts/:id', async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.send({ success: true });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});
