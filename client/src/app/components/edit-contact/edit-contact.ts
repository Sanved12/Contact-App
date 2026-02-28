import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-edit-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-contact.html',
  styleUrls: ['./edit-contact.css']
})
export class EditContact implements OnInit {
  contact: any = { contactName: '', phone: '', email: '', work: '' };
  contactId!: number;
  loaded: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.contactId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Edit Contact ID:', this.contactId);
    
    // Fetch the contact from the backend to prefill the form
    this.api.getContact(this.contactId).subscribe({
      next: (c: any) => {
        console.log('Contact loaded:', c);
        this.contact = c;
        this.loaded = true;
        // explicitly trigger change detection in case it's not automatic
        this.cd.detectChanges();
        console.log('loaded flag now', this.loaded);
      },
      error: (err) => {
        console.error('Failed to load contact', err);
        let msg = 'Unable to load contact details.';
        if (err && err.error) {
          if (typeof err.error === 'string') msg = err.error;
          else if (err.error.error) msg = err.error.error;
        }
        console.log('Showing alert:', msg);
        alert(msg);
        this.router.navigate(['/dashboard']);
      },
      complete: () => {
        console.log('Contact fetch completed');
      }
    });
  }

  onUpdate() {
    if (!this.contact.contactName.trim()) {
      alert('Contact name is required.');
      return;
    }
    if (!/^[0-9]{10}$/.test(this.contact.phone)) {
      alert('Phone number must be exactly 10 digits.');
      return;
    }

    this.api.updateContact(this.contactId, this.contact).subscribe({
      next: () => {
        alert('Contact updated successfully!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Update failed', err);
        let msg = 'Update failed';
        if (err.error && err.error.error) msg = err.error.error;
        alert(msg);
      }
    });
  }
}