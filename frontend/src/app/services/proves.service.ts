import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired} from 'angular2-jwt';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const endpoint = 'http://127.0.0.1:8000/api/proves/'; // eventually run from '/api/assignatures/'

@Injectable()
export class ProvesService {

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


	// get method
	// ------------------------------------------------------
	get(provaId){

		const headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'JWT ' + this.token)
		const options = new RequestOptions({headers: headers});

		return this._http.get(endpoint + provaId + '/', options)
						.map(response=>{
							let data = response.json()
							if (data.continguts) {
								let continguts = data.continguts.split(',');
								data.continguts = continguts;
							}
							return data;
							}
						)
						.catch(this.handleError);
	};


	delete(provaId) {

		const headers = new Headers();
		headers.append('Authorization', 'JWT ' + this.token);
		headers.append('Content-Type', 'application/json');
		const options = new RequestOptions({headers: headers});

		return this._http.delete(endpoint + provaId + '/', options); //.toPromise();
	};


	// Handling errors
	// ------------------------------------------------------
	private handleError(error:any, caught:any): any{
		console.log(error, caught)
	};

}
