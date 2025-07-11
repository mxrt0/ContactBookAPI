﻿namespace ContactBookAPI.Models.Interfaces
{
    public interface IContactRepository
    {
        List<Contact> GetContacts();
        void AddContact(Contact contact);
        bool UpdateContact(string id, Contact updatedContact);
        bool DeleteContact(string id);
    }
}
