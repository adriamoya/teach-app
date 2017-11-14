import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserChangesService {

	username: string;
	token: string;

	constructor() {}

	get_username(): Observable<any> {
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		return Observable.of(this.currentUser['username']);
	}

	get_token(): Observable<any> {
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		return Observable.of(this.currentUser['token']);
	}

}