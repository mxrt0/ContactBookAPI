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
        public IActionResult AddContact([FromBody] Contact contact)
        {   
            _repo.AddContact(contact);
            return Ok();
        }

        [HttpPut("update/{id}")]
        public IActionResult UpdateContact(string id, [FromBody] Contact updatedContact)
        {
            if (!_repo.UpdateContact(id, updatedContact))
            {
                return NotFound();
            }
            return Ok(updatedContact);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteContact(string id)
        {
            if (_repo.DeleteContact(id))
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }


    }
}
