const fs = require('fs/promises')
const { v4: uuidv4 } = require('uuid')

const listContacts = async () => {
  try {
    const data = await fs.readFile('./model/contacts.json')
    return JSON.parse(data)
  } catch (err) {
    console.log(err)
  }
}

const getContactById = async (contactId) => {
  try {
    const data = await fs.readFile('./model/contacts.json')
    return JSON.parse(data).find(contact => contact.id === contactId)
  } catch (err) {
    console.log(err)
  }
}

const removeContact = async (contactId) => {
  try {
    const data = await fs.readFile('./model/contacts.json')
    const newContactsList = JSON.parse(data).filter(contact => contact.id !== contactId)
    fs.writeFile('./model/contacts.json', JSON.stringify(newContactsList))
    return newContactsList
  } catch (err) {
    console.log(err)
  }
}

const addContact = async (body) => {
  try {
    const data = await fs.readFile('./model/contacts.json')
    const newContact = [{ id: uuidv4(), ...body }]
    const newContactsList = JSON.parse(data).concat(newContact)
    fs.writeFile('./model/contacts.json', JSON.stringify(newContactsList))
    return newContactsList
  } catch (err) {
    console.log(err)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const data = await fs.readFile('./model/contacts.json')

    const contactToUpdate = JSON.parse(data).find(contact => contact.id === contactId)
    const updatedContact = { ...contactToUpdate, ...body }
    const updatedContactList = JSON.parse(data).map(contact => contact.id === contactId ? updatedContact : contact)

    await fs.writeFile('./model/contacts.json', JSON.stringify(updatedContactList))

    return contactToUpdate.id ? updatedContact : null
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
