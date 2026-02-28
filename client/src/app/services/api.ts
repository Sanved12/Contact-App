import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  // User Auth & Profile
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/login`, credentials);
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users/register`, user);
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}`, user);
  }

  // Contact Management
  getContacts(userId: number, page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/contacts/user/${userId}?page=${page}`);
  }

  addContact(userId: number, contact: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/contacts/${userId}`, contact);
  }

  updateContact(id: number, contact: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/contacts/${id}`, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/contacts/${id}`);
  }

  deleteAllContacts(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/contacts/user/${userId}/all`);
  }

  /**
   * Fetch a single contact by id for editing.
   */
  getContact(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/contacts/${id}`);
  }
}