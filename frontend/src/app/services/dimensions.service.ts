import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired} from 'angular2-jwt';

// Interfaces
import { Dimensio } from '../interfaces/dimensio.interface';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const ENDPOINT = 'http://127.0.0.1:8000/api/dimensions/'; // eventually run from '/api/assignatures/'

@Injectable()
export class DimensionsService {

	private token: string;

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


	add(dimensio: Dimensio){

		const body = JSON.stringify(dimensio);

		const headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'JWT ' + this.token)
		const options = new RequestOptions({headers: headers});

		return this._http.post(ENDPOINT + 'add/', body, options)
						.map(
							response=>{
								return response.json()
							}
						)
						.catch(this.handleError);
	};


	get(dimensioId){

		const headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'JWT ' + this.token)
		const options = new RequestOptions({headers: headers});

		return this._http.get(ENDPOINT + dimensioId + '/', options)
						.map(response=>{
							let data = response.json()
							return data;
							}
						)
						.catch(this.handleError);
	};


	delete(dimensioId) {

		const headers = new Headers();
		headers.append('Authorization', 'JWT ' + this.token);
		headers.append('Content-Type', 'application/json');
		const options = new RequestOptions({headers: headers});

		return this._http.delete(ENDPOINT + dimensioId + '/', options); //.toPromise();
	};


	// Handling errors
	// ------------------------------------------------------
	private handleError(error:any, caught:any): any{
		console.log(error, caught)
	};

}
