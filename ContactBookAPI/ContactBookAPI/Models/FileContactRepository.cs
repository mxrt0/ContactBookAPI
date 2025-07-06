using ContactBookAPI.Models.Interfaces;
using System.Text.Json;

namespace ContactBookAPI.Models
{
        public class FileContactRepository : IContactRepository
        {
            private readonly string _filePath = "contacts.json";
            public void AddContact(Contact contact)
            {
                var contacts = GetContacts();
                contacts.Add(contact);
                var prettyPrint = new JsonSerializerOptions { WriteIndented = true };
                var contactsJSON = JsonSerializer.Serialize(contacts, prettyPrint);
                File.WriteAllText(_filePath, contactsJSON);
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
        }
}
