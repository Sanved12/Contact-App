import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html'
})
export class ProfileComponent implements OnInit {
  user: any = { name: '', email: '', password: '' };

  constructor(private api: ApiService) {}

  ngOnInit() {
    const data = localStorage.getItem('loggedUser');
    if (data) this.user = JSON.parse(data);
  }

  // 3. Rename this method exactly to 'onUpdateProfile' to match your HTML
  onUpdateProfile() {
    this.api.updateUser(this.user.id, this.user).subscribe({
      next: (res: any) => {
        localStorage.setItem('loggedUser', JSON.stringify(res));
        alert("Profile Updated successfully!");
      },
      error: (err: any) => console.error("Update failed", err)
    });
  }
}