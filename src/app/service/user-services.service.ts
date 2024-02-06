import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

 baseUrl = `https://jsonplaceholder.typicode.com/users`;


  constructor(private http: HttpClient) { }

getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

getUserById(userId: string): Observable<User> {
    const url = `${this.baseUrl}/${userId}`;
    return this.http.get<User>(url);
  }

create(params: any) {
    return this.http.post(this.baseUrl, params);
}

update(id: string, params: any) {
    return this.http.put(`${this.baseUrl}/${id}`, params);
}

delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
}
}
