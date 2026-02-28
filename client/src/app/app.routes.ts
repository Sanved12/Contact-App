import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddContact } from './components/add-contact/add-contact'; // Import this
import { EditContact } from './components/edit-contact/edit-contact';
import { ProfileComponent } from './components/profile/profile';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-contact', component: AddContact }, // Route for adding contacts
  { path: 'edit-contact/:id', component: EditContact },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];