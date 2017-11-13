import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserChangesService {

	username: string;
	token: string;

	constructor() {}

	get_username(): Observable<any> {
		this.username = localStorage.getItem('username')
		// console.log(this.username)
		return Observable.of(this.username);
	}

	get_token(): Observable<any> {
		this.token = localStorage.getItem('token')
		// console.log(this.token)
		return Observable.of(this.token);
	}

}