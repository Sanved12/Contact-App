import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  contacts: any[] = [];
  currentUser: any = null;
  currentPage: number = 0;
  totalPages: number = 0;
  
  newContact = { contactName: '', phone: '', email: '', work: '' };

  // Router is now properly recognized as an injection token
  constructor(private api: ApiService, private router: Router, private cd: ChangeDetectorRef) {
    // Subscribe to router navigation events so contacts reload whenever
    // we navigate back to the dashboard (even if component isn't recreated)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      filter((event: any) => event.url === '/dashboard' || event.urlAfterRedirects === '/dashboard')
    ).subscribe(() => {
      console.log('Navigation to dashboard detected, reloading contacts...');
      this.loadContacts();
    });
  }

  ngOnInit() {
    const userData = localStorage.getItem('loggedUser');
    if (userData) {
      this.currentUser = JSON.parse(userData);
      console.log('Dashboard ngOnInit currentUser=', this.currentUser);
      this.loadContacts();
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadContacts() {
    if (this.currentUser) {
      console.log('loadContacts: requesting contacts for user', this.currentUser.id, 'page', this.currentPage);
      this.api.getContacts(this.currentUser.id, this.currentPage).subscribe({
        next: (res: any) => {
          console.log('loadContacts response:', res);
          // defensive: if the back end returns a Page-like object,
          // grab content array and totalPages; otherwise attempt to
          // treat the response itself as a list.
          if (res && Array.isArray(res.content)) {
            console.log('setting contacts to:', res.content);
            // use a new array reference to ensure change detection picks it up
            this.contacts = Array.from(res.content);
            this.totalPages = res.totalPages || 0;
            // ensure change detection runs immediately
            try { this.cd.detectChanges(); } catch (e) { /* noop */ }
          } else if (Array.isArray(res)) {
            this.contacts = res;
            this.totalPages = 1;
          } else {
            this.contacts = [];
            this.totalPages = 0;
          }
          console.log('after load: contacts.length=', this.contacts.length, 'totalPages=', this.totalPages);
        },
        error: (err: any) => console.error("Load Contacts Error:", err)
      });
    }
  }

  changePage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadContacts();
    }
  }

  logout() {
    localStorage.removeItem('loggedUser');
    this.router.navigate(['/login']);
  }

  onDelete(id: number) {
    if (confirm("Delete this contact?")) {
      this.api.deleteContact(id).subscribe(() => this.loadContacts());
    }
  }

  onDeleteAll() {
    if (confirm("Delete ALL records?")) {
      if (!this.currentUser || !this.currentUser.id) {
        alert('Unable to determine current user before deleting records.');
        return;
      }
      this.api.deleteAllContacts(this.currentUser.id).subscribe({
        next: () => this.loadContacts(),
        error: err => {
          console.error('deleteAll failed', err);
          alert('Failed to delete all contacts');
        }
      });
    }
  }

  onAddContact() {
    this.api.addContact(this.currentUser.id, this.newContact).subscribe({
      next: () => {
        this.newContact = { contactName: '', phone: '', email: '', work: '' };
        this.loadContacts();
      },
      error: (err: any) => console.error("Add Contact Error:", err)
    });
  }
}