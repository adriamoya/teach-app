import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired} from 'angular2-jwt';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Classe } from '../interfaces/classe.interface';

const ENDPOINT = 'http://127.0.0.1:8000/api/classes/'; // eventually run from '/api/assignatures/'

@Injectable()
export class ClassesService {

	private token: string;
	private classe: any;

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


	add(classe: Classe){

		const body = JSON.stringify(classe);

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


	get(classeId: string) {

		const headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'JWT ' + this.token)
		const options = new RequestOptions({headers: headers});

		return this._http.get(ENDPOINT + classeId + '/', options)
						.map(
							response => {
								let data = response.json();
								this.classe = data;
								return this.classe;
							}
						)
						.catch(this.handleError);
	};


	update(classe: Classe) {

		let body = JSON.stringify(classe);

		const headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'JWT ' + this.token)
		const options = new RequestOptions({headers: headers});

		return this._http.put(ENDPOINT + classe.id + '/', body, options)
						.map(
							response => {
								console.log(response.json());
							}
						)
						.catch(this.handleError);
	};


	delete(classeId: string) {

		const headers = new Headers();
		headers.append('Authorization', 'JWT ' + this.token);
		headers.append('Content-Type', 'application/json');
		const options = new RequestOptions({headers: headers});

		return this._http.delete(ENDPOINT + classeId + '/', options); //.toPromise();
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
