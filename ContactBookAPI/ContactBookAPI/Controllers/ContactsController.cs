using ContactBookAPI.Models.Interfaces;
using ContactBookAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace ContactBookAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactsController : ControllerBase
    {
        private readonly IContactRepository _repo;

        public ContactsController(IContactRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetContacts()
        {
            var contacts = _repo.GetContacts();
            return Ok(contacts);
        }

        [HttpPost]
        public IActionResult AddContact([FromBody] Contact newContact)
        {
            _repo.AddContact(newContact);
            return Ok();
        }


    }
}
