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
            li.textContent = `${contact.name} | ${contact.email} | ${contact.phone}`;
            list.appendChild(li);
        });
    }
    catch (error) {
        console.error("Error loading contacts:", error);
    }
}