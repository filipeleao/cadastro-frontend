import {HttpHeaders, HttpClient} from '@angular/common/http';

import {Injectable} from '@angular/core';
import {Person, PersonList} from './interfaces';
import {environment} from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  private get headers(): HttpHeaders {
    const httpHeaders = new HttpHeaders({Authorization: environment.auth});
    return httpHeaders;
  }

  getAll() {
    return this.http.get<PersonList>(environment.endpoint + 'all', {
      headers: this.headers
    });
  }

  delete(cpf: string) {
    return this.http.delete<Response>(environment.endpoint + 'delete/' + cpf, {
      headers: this.headers
    });
  }

  save(person: Person) {
    return this.http.post<Response>(environment.endpoint + 'save', person, {
      headers: this.headers
    });
  }

  update(cpf: string, person: Person) {
    return this.http.put<Response>(environment.endpoint + 'update/' + cpf, person, {
      headers: this.headers
    });
  }
}
