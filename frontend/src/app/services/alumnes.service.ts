import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired} from 'angular2-jwt';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Alumne } from '../interfaces/alumne.interface';

const ENDPOINT = 'http://127.0.0.1:8000/api/alumnes/'; // eventually run from '/api/assignatures/'

@Injectable()
export class AlumnesService {

	private token: string;
	private alumne: any;
	private alumnes: any;

	constructor(
		public _http: Http,
		public _router: Router) {

		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if (currentUser) {
			if (tokenNotExpired(undefined, currentUser['token'])) {
				this.token = currentUser['token'];
			} else {
				this.token = null;
			}
		} else {
			this.token = null;
		}
	};

	// list method: lists out all alumnes
	// ------------------------------------------------------
	list(){

		const headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'JWT ' + this.token)
		const options = new RequestOptions({headers: headers});

		return this._http.get(ENDPOINT, options)
						.map(response => response.json())
						.catch(this.handleError);
	};

	// get method: gets specific alumne with passed id
	// ------------------------------------------------------
	get(alumneId: string) {

		const headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'JWT ' + this.token)
		const options = new RequestOptions({headers: headers});

		return this._http.get(ENDPOINT + alumneId + '/', options)
						.map(
							response => {
								let data = response.json();
								this.alumne = data;
								return this.alumne;
							}
						)
						.catch(this.handleError);
	};


	update(alumne: Alumne) {

		let body = JSON.stringify(alumne);

		const headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'JWT ' + this.token)
		const options = new RequestOptions({headers: headers});

		return this._http.put(ENDPOINT + alumne.id + '/', body, options)
						.map(
							response => {
								console.log(response.json());
							}
						)
						.catch(this.handleError);
	}


	delete(alumneId: string) {

		const headers = new Headers();
		headers.append('Authorization', 'JWT ' + this.token);
		headers.append('Content-Type', 'application/json');
		const options = new RequestOptions({headers: headers});

		return this._http.delete(ENDPOINT + alumneId + '/', options); //.toPromise();
	};


	// Handling errors
	// ------------------------------------------------------
	public handleError(error:any, caught:any): any{
		// console.log(error, caught)
		if (error.status == 401) {
			console.log(error.json()['detail'])
			this._router.navigate(['/login']);
		}
	};

}
