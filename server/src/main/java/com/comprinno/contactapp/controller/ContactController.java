package com.comprinno.contactapp.controller;

import com.comprinno.contactapp.model.Contact;
import com.comprinno.contactapp.model.User;
import com.comprinno.contactapp.repository.ContactRepository;
import com.comprinno.contactapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "http://127.0.0.1:4200") // Match the frontend URL exactly
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * POST /api/contacts/{userId}
     * Adds a new contact for a specific user.
     * Required for 'Third Page: Add contact form' specification.
     */
    @PostMapping("/{userId}")
    public ResponseEntity<Contact> addContact(@PathVariable Long userId, @Valid @RequestBody Contact contact) {
        return userRepository.findById(userId).map(user -> {
            contact.setUser(user); // Link contact to the User
            Contact savedContact = contactRepository.save(contact);
            return ResponseEntity.ok(savedContact);
        }).orElseThrow(() -> new RuntimeException("User not found with id " + userId));
    }

    /**
     * GET /api/contacts/user/{userId}?page={pageNumber}
     * Fetches paginated contacts for a specific user.
     * Supports 'Pagination enabled' and 'ListAllContact' requirements.
     */
    @GetMapping("/user/{userId}")
    public ResponseEntity<Page<Contact>> getContacts(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "0") int page) {
        // Page size set to 5 records per page
        return ResponseEntity.ok(contactRepository.findByUserId(userId, PageRequest.of(page, 5)));
    }

    /**
     * GET /api/contacts/{id}
     * Retrieve a single contact by its identifier.
     * Useful for pre‑filling the edit form.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable Long id) {
        return contactRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new RuntimeException("Contact not found with id " + id));
    }

    /**
     * PUT /api/contacts/{id}
     * Updates an existing contact record.
     * Required for 'Fourth Page: Edit Contact form' specification.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(@PathVariable Long id, @Valid @RequestBody Contact contactDetails) {
        return contactRepository.findById(id).map(contact -> {
            contact.setContactName(contactDetails.getContactName());
            contact.setPhone(contactDetails.getPhone());
            contact.setEmail(contactDetails.getEmail());
            contact.setWork(contactDetails.getWork());
            return ResponseEntity.ok(contactRepository.save(contact));
        }).orElseThrow(() -> new RuntimeException("Contact not found with id " + id));
    }

    /**
     * DELETE /api/contacts/{id}
     * Deletes a single contact by ID.
     * Required for 'Delete Button' specification on Dashboard.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable Long id) {
        contactRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    /**
     * DELETE /api/contacts/user/{userId}/all
     * Deletes every contact belonging to a specific user.
     * Required for 'Delete all the record button' specification.
     */
    @DeleteMapping("/user/{userId}/all")
    public ResponseEntity<?> deleteAllUserContacts(@PathVariable Long userId) {
        contactRepository.deleteByUserId(userId);
        return ResponseEntity.ok().build();
    }
}