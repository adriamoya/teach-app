import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired} from 'angular2-jwt';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const endpoint = 'http://127.0.0.1:8000/api/assignatures/'; // eventually run from '/api/assignatures/'

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
	get(assignaturaId, provaId){

		// assignaturaId or '*': specific assignatura or all assignatures
		// provaId or '*': specific prova or all proves
		
		/* We get the data from static JSONs within /assets/json.
		   We will eventually direct the endpoint to our API. */
		let fileName = 'proves-detail.json';
		return this._http.get(endpoint+fileName)
						.map(response=>{
							let data = response.json()

							// Assignatura filter
							// ------------------------------
							.filter(item => {
								// All assignatures
								if (assignaturaId == '*'){
									return item;
								} 
								// Specific assignatura
								else {
									if (item.assignatura.id == assignaturaId) {
										return item;
									}
								}
							})

							// Prova filter
							// ------------------------------
							.filter(item => {
								// All proves
								if (provaId == '*') {
									return item;
								} 
								// Specific prova
								else {
									if (item.id == provaId) {
										return item;
									}
								}
							})

							if (data.length == 1) {
								return data[0];
							}
							return data;
						})
						.catch(this.handleError);
	};

	

	// Handling errors
	// ------------------------------------------------------
	private handleError(error:any, caught:any): any{
		console.log(error, caught)
	};

}
