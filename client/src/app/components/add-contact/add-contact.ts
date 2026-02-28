import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-contact.html',
  styleUrls: ['./add-contact.css']
})
export class AddContact {
  // Model strictly matches the Java Entity fields
  contact = { 
    contactName: '', 
    phone: '', 
    email: '', 
    work: '' 
  };

  constructor(private api: ApiService, private router: Router) {}

  /**
   * Captures form data and sends a POST request to the backend.
   * On success, redirects to the Second Page (Dashboard).
   */
  saveContact() {
    // Basic client‑side validation to avoid obvious server errors
    if (!this.contact.contactName.trim()) {
      alert('Contact name is required.');
      return;
    }
    if (!/^[0-9]{10}$/.test(this.contact.phone)) {
      alert('Phone number must be exactly 10 digits.');
      return;
    }
    const userData = localStorage.getItem('loggedUser');
    
    if (userData) {
      const user = JSON.parse(userData);
      
      // Attempting POST to http://localhost:8080/api/contacts/{userId}
      this.api.addContact(user.id, this.contact).subscribe({
        next: (response) => {
          console.log("Contact Saved:", response);
          alert("Contact saved successfully!");
          // Redirect to display the new contact on the Dashboard
          this.router.navigate(['/dashboard']); 
        },
        error: (err) => {
          console.error("Server Error Observed:", err);
          // display server message if available
          let msg = 'Unable to save contact';
          if (err.error) {
            if (typeof err.error === 'string') msg = err.error;
            else if (err.error.error) msg = err.error.error;
            else if (err.error.phone) msg = err.error.phone; // field-specific
          }
          alert(msg);
        }
      });
    } else {
      alert("Session expired. Please login again.");
      this.router.navigate(['/login']);
    }
  }
}