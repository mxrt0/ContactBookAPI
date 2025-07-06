namespace ContactBookAPI.Models.Interfaces
{
    public interface IContactRepository
    {
        List<Contact> GetContacts();
        void AddContact(Contact contact);
    }
}
