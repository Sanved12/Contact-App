import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {
  user: any = { name: '', email: '', password: '' };

  constructor(private api: ApiService) {}

  ngOnInit() {
    const data = localStorage.getItem('loggedUser');
    if (data) {
      this.user = JSON.parse(data);
    }
  }

  // RENAME THIS METHOD: Matches (ngSubmit)="onUpdateProfile()" in HTML
  onUpdateProfile() {
    if (this.user.id) {
      this.api.updateUser(this.user.id, this.user).subscribe({
        next: (res: any) => {
          // Update the session storage with new details
          localStorage.setItem('loggedUser', JSON.stringify(res));
          alert("Profile updated successfully!");
        },
        error: (err: any) => {
          console.error("Update failed", err);
          alert("Failed to update profile. Check backend connection.");
        }
      });
    }
  }
}