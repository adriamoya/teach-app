import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired} from 'angular2-jwt';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const endpoint = 'http://127.0.0.1:8000/api/assignatures/'; // eventually run from '/api/assignatures/'

@Injectable()
export class AssignaturesService {

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

	// list method: lists out all assignatures
	// ------------------------------------------------------
	list(){
		/* We get the data from static JSONs within /assets/json.
		   We will eventually direct the endpoint to our API. */
		return this._http.get(endpoint)
						.map(response => response.json())
							// console.log(response);
							// return response.json()
							// })
						.catch(this.handleError);
	};

	// get method: gets specific assignatura with passed id
	// ------------------------------------------------------
	get(id){
		/* We get the data from static JSONs within /assets/json.
		   We will eventually direct the endpoint to our API. */

		// Built-in JWT
		// return this._authHttp.get(endpoint + id + "/")
		// 	.map(
		// 		response => console.log(response.text()),
		// 		error => console.log(error.text())
		// 	);

		const headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'JWT ' + this.token)
		// headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
		// headers.append('Access-Control-Allow-Credentials', 'true');
		const options = new RequestOptions({headers: headers});

		return this._http.get(endpoint + id + '/', options)
						.map(
							response=>{
								let data = response.json();
								// if (data.length == 1){
								// 	return.data
								// } 
								return data;
							}
						)
						.catch(this.handleError);
	};

	// Handling errors
	// ------------------------------------------------------
	public handleError(error:any, caught:any): any{
		// console.log(error, caught)
		if (error.status == 401) {
			console.log(error.json()['detail']);
		}
	};

}
