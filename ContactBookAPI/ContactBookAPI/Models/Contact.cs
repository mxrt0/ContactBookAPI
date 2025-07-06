namespace ContactBookAPI.Models
{
    public class Contact
    {
        public Contact(string name, string email, string phone)
        {
            Name = name;
            Email = email;
            Phone = phone;
        }

        public string Name { get;  set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Id { get; set; } = Guid.NewGuid().ToString();


    }
}
