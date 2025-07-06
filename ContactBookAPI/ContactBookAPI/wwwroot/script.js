document.addEventListener('DOMContentLoaded', () => {
    loadContacts();

    const form = document.getElementById('contactForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = form.elements['name'].value.trim();
        const email = form.elements['email'].value.trim();
        const phone = form.elements['phone'].value.trim();

        if (!name || !email || !phone) {
            alert("Please fill in all fields.");
            return;
        }

        const newContact = {name, email, phone};

        const response = await fetch('/contacts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newContact)
        });

        if (response.ok) {
            form.reset();
            loadContacts();
        }
        else {
            alert("Failed to add contact.");
        }
    });
});

async function loadContacts() {
    try {
        const response = await fetch('/contacts');
        const contacts = await response.json();

        const list = document.getElementById('contactsList');
        list.innerHTML = '';

        if (contacts.length === 0) {
            list.innerHTML = '<li>No contacts found.</li>';
            return;
        }

        contacts.forEach(contact => {
            const li = document.createElement('li');
            li.setAttribute('data-id', contact.id)
            const nameSpan = document.createElement('span');
            nameSpan.classList.add('contact-name');
            nameSpan.textContent = contact.name;

            const emailSpan = document.createElement('span');
            emailSpan.classList.add('contact-email');
            emailSpan.textContent = contact.email;

            const phoneSpan = document.createElement('span');
            phoneSpan.classList.add('contact-phone');
            phoneSpan.textContent = contact.phone;

            // Create buttons
            const editBtn = document.createElement('button');
            editBtn.classList.add('edit-btn');
            editBtn.textContent = 'Edit';

            const saveBtn = document.createElement('button');
            saveBtn.classList.add('save-btn');
            saveBtn.textContent = 'Save';
            saveBtn.style.display = 'none';

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.textContent = 'Delete';
            li.appendChild(deleteBtn);

            // Append all to li
            li.appendChild(nameSpan);
            li.appendChild(document.createTextNode(' | '));  // separator
            li.appendChild(emailSpan);
            li.appendChild(document.createTextNode(' | '));
            li.appendChild(phoneSpan);
            li.appendChild(document.createTextNode(' ')); // space before buttons
            li.appendChild(editBtn);
            li.appendChild(saveBtn);

            list.appendChild(li);
        });
            list.addEventListener('click', async (event) => {
        const target = event.target;

        if (target.classList.contains('edit-btn')) {
            const li = target.closest('li');
            toggleEdit(li, true);
        }

        if (target.classList.contains('save-btn')) {
            const li = target.closest('li');
            await saveContact(li);
            toggleEdit(li, false);
        }

        if (target.classList.contains('delete-btn')) {
            const li = target.closest('li');
            const id = li.getAttribute('data-id');
            if (confirm("Are you sure you want to delete this contact?")) {
                await deleteContact(id);
            }
        }
        });   
    }
    catch (error) {
        console.error("Error loading contacts: ", error);
    }
}
function toggleEdit(li, editing) {
  const nameSpan = li.querySelector('.contact-name');
  const emailSpan = li.querySelector('.contact-email');
  const phoneSpan = li.querySelector('.contact-phone');
  const editBtn = li.querySelector('.edit-btn');
  const saveBtn = li.querySelector('.save-btn');

  if (editing) {
    // Replace spans with inputs
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = nameSpan.textContent;
    nameInput.classList.add('edit-name');

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.value = emailSpan.textContent;
    emailInput.classList.add('edit-email');

    const phoneInput = document.createElement('input');
    phoneInput.type = 'text';
    phoneInput.value = phoneSpan.textContent;
    phoneInput.classList.add('edit-phone');

    li.replaceChild(nameInput, nameSpan);
    li.replaceChild(emailInput, emailSpan);
    li.replaceChild(phoneInput, phoneSpan);

    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
  } else {
    // Replace inputs back with spans
    const nameInput = li.querySelector('.edit-name');
    const emailInput = li.querySelector('.edit-email');
    const phoneInput = li.querySelector('.edit-phone');

    const newNameSpan = document.createElement('span');
    newNameSpan.classList.add('contact-name');
    newNameSpan.textContent = nameInput.value;

    const newEmailSpan = document.createElement('span');
    newEmailSpan.classList.add('contact-email');
    newEmailSpan.textContent = emailInput.value;

    const newPhoneSpan = document.createElement('span');
    newPhoneSpan.classList.add('contact-phone');
    newPhoneSpan.textContent = phoneInput.value;

    li.replaceChild(newNameSpan, nameInput);
    li.replaceChild(newEmailSpan, emailInput);
    li.replaceChild(newPhoneSpan, phoneInput);

    editBtn.style.display = 'inline-block';
    saveBtn.style.display = 'none';
  }
}
async function saveContact(li) {
  const id = li.getAttribute('data-id');
  const name = li.querySelector('.edit-name').value;
  const email = li.querySelector('.edit-email').value;
  const phone = li.querySelector('.edit-phone').value;

  const updatedContact = { name, email, phone };

  try {
    const response = await fetch(`/contacts/update/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedContact),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const updated = await response.json();
    console.log('Contact updated successfully:', updated);
  } catch (error) {
    console.error('Failed to update contact:', error);
    alert('Failed to update contact. Please try again.');
  }
}

async function deleteContact(id) {
    try {
        const response = await fetch(`/contacts/delete/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            const li = document.querySelector(`li[data-id="${id}"]`);
            if (li) li.remove();
            console.log("Contact deleted successfully.");
        } 
        else {
            console.log("Failed to delete contact.");
        }
    } 
    catch (error) {
        console.error('Error deleting contact:', error);
        alert("An error occurred while deleting the contact.");
    }        
}   
