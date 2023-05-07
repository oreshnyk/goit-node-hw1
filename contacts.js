const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");


const contactsPath = path.join(__dirname, "db", "contacts.json");


 
async function listContacts() {
     const data = await fs.readFile(contactsPath, "utf-8").then((data) => (data = JSON.parse(data))).catch((error) => console.log(error));
     return data;
};


async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find(contact => contact.id === contactId);
if (!contact) {
    return null;
  }
    return contact;
};


async function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex((contact) => contact.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [removedContact] = contacts.splice(idx, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contacts));

  return removedContact;
}

async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContact);
    
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}

const contactsAction = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};

module.exports = contactsAction;