const path = require("path");
const fs = require('fs/promises');
const contactsPath = path.join(__dirname, "./db/contacts.json");
const {nanoid} = require('nanoid');


async function listContacts() {
    try {
        const contacts = await fs.readFile(contactsPath);
        return  JSON.parse(contacts);  
    } catch (error) {
        console.error(error);  
    }
}

async function getContactById(contactId) {
  try {
      const contacts = await listContacts();
      const contact = contacts.find((contact) => contact.id === contactId);
      if (!contact) {
          return null;
      }
      return contact;
  } catch (error) {
      console.error(error);
  }  
}

async function removeContact(contactId) {
    try {
        const contact = await listContacts();
        const idx = contact.findIndex(({ id }) => id === contactId);
        if (idx === -1) {
            return null;
        }
        const [removeContact] = contact.splice(idx, 1);
        await fs.writeFile(contactsPath, JSON.stringify(contact));
        return removeContact;

  } catch (error) {
      console.error(error);
  }  
}

async function addContact(name, email, phone) {
  try {
      const list = await listContacts();
      const newContact = { id: nanoid(), name, email, phone };
      list.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(list));
      return newContact;
  } catch (error) {
      console.error(error);
  }  
}

module.exports = {
    listContacts,
    addContact,
    removeContact,
    getContactById,
};
