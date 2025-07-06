using ContactBookAPI.Models.Interfaces;
using System.Text.Json;

namespace ContactBookAPI.Models
{
        public class FileContactRepository : IContactRepository
        {
            private readonly string _filePath = "contacts.json";
            private JsonSerializerOptions prettyPrint = new JsonSerializerOptions { WriteIndented = true };
        public void AddContact(Contact contact)
            {
                var contacts = GetContacts();
                
                contacts.Add(contact);
                
                var contactsJSON = JsonSerializer.Serialize(contacts, prettyPrint);
                File.WriteAllText(_filePath, contactsJSON);
            }

        public bool DeleteContact(string id)
        {
            var contacts = GetContacts();
            var contactToDelete = contacts.Find(c => c.Id == id);
            if (contactToDelete is not null)
            {
                contacts.Remove(contactToDelete);
                var contactsJSON = JsonSerializer.Serialize(contacts, prettyPrint);
                File.WriteAllText(_filePath, contactsJSON);
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<Contact> GetContacts()
            {
                if (!File.Exists(_filePath))
                {
                    return new List<Contact>();
                }
                var contacts = new List<Contact>();
                var contactsJSON = File.ReadAllText(_filePath);
                return JsonSerializer.Deserialize<List<Contact>>(contactsJSON) ?? new List<Contact>();
            }

        public bool UpdateContact(string id, Contact updatedContact)
        {
            var contacts = GetContacts();
            var contactToUpdate = contacts.Find(c => c.Id == id);
            if (contactToUpdate is not null)
            {
                contactToUpdate.Name = updatedContact.Name;
                contactToUpdate.Email = updatedContact.Email;
                contactToUpdate.Phone = updatedContact.Phone;
                var contactsJSON = JsonSerializer.Serialize(contacts, prettyPrint);
                File.WriteAllText(_filePath, contactsJSON);
                return true;
            }
            else
            {
                return false;
            }
            
        }
    }
}
