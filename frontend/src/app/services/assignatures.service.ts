import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired} from 'angular2-jwt';

// Interfaces
// import { Assignatura } from '../interfaces/assignatura.interface';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const ENDPOINT = 'http://127.0.0.1:8000/api/assignatures/'; // eventually run from '/api/assignatures/'

@Injectable()
export class AssignaturesService {

	private token: string;
	private assignatura: any;
	private proves: any;
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


	add(assignatura: any){

		const body = JSON.stringify(assignatura);

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


	get(assignaturaId){

		const headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'JWT ' + this.token)
		const options = new RequestOptions({headers: headers});

		return this._http.get(ENDPOINT + assignaturaId + '/', options)
						.map(
							response=>{
								let data = response.json();
								this.assignatura = data;
								return data;
							}
						)
						.catch(this.handleError);
	};


	update(assignatura: any) {

		let body = JSON.stringify(assignatura);

		const headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'JWT ' + this.token)
		const options = new RequestOptions({headers: headers});

		return this._http.put(ENDPOINT + assignatura.id + '/', body, options)
						.map(
							response => {
								return response.json();
							}
						)
						.catch(this.handleError);
	};
	

	delete(assignaturaId: string) {

		const headers = new Headers();
		headers.append('Authorization', 'JWT ' + this.token);
		headers.append('Content-Type', 'application/json');
		const options = new RequestOptions({headers: headers});

		return this._http.delete(ENDPOINT + assignaturaId + '/', options); //.toPromise();
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


// headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
// headers.append('Access-Control-Allow-Credentials', 'true');
