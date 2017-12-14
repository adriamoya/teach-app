import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired} from 'angular2-jwt';

// Interfaces
import { Avaluacio } from '../interfaces/curs.interface';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const ENDPOINT = 'http://127.0.0.1:8000/api/assignatures/avaluacio/'; // eventually run from '/api/assignatures/'

@Injectable()
export class AvaluacionsService {

	private token: string;
	private alumne: any;
	private alumnes: any;
	private avaluacio: Avaluacio;

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


	add(avaluacio: Avaluacio){

		const body = JSON.stringify(avaluacio);

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
