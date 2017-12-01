import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { tokenNotExpired} from 'angular2-jwt';

// Interfaces
import { Assignatura } from '../interfaces/assignatura.interface';

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


	add(assignatura: Assignatura){

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

		return this._http.get(ENDPOINT)
						.map(response => response.json())
						.catch(this.handleError);
	};


	get(id){

		const headers = new Headers();
		headers.append('Accept', 'application/json');
		headers.append('Content-Type', 'application/json');
		headers.append('Authorization', 'JWT ' + this.token)
		const options = new RequestOptions({headers: headers});

		return this._http.get(ENDPOINT + id + '/', options)
						.map(
							response=>{
								let data = response.json();
								this.assignatura = data;
								return this.assignatura;
							}
						)
						.catch(this.handleError);
	};


	// Nota mitja de cada prova
	// ----------------------------------------------

	get_proves_promedio() {

		let proves = [];

		for (var i in this.assignatura.proves_assignatura) {

			var puntuacions = [];
			var prova = this.assignatura.proves_assignatura[i];
			for (var j in prova.notes_prova) {
				var puntuacio = prova.notes_prova[j]
				puntuacions.push(puntuacio.nota)
			}
			// Calcul nota promig
			var avg: any;
			if (puntuacions.length >0) {
				var sum = 0;
				for (var k = 0; k < puntuacions.length; k++) {
					sum += puntuacions[k];
				}
				avg = sum/puntuacions.length;
			} else {
				avg = null;
			}
			proves.push({
				"id": prova.id,
				"nom": prova.nom,
				"data": prova.data,
				"puntuacio_promig": avg,
				"puntuacio_total": prova.nota_total
			})
		}

		this.proves = proves;
		return this.proves;
	};


	// Select distinct de alumnes
	// ----------------------------------------------
	get_distinct_alumnes() {
		
		let alumnes = [];

		for (var i in this.assignatura.proves_assignatura) {
			var prova = this.assignatura.proves_assignatura[i];
			for (var j in prova.notes_prova) {
				var puntuacio = prova.notes_prova[j]
				alumnes.push({
					"id": puntuacio.alumne.id,
					"nom": puntuacio.alumne.nom + " " + puntuacio.alumne.primer_cognom + " " + puntuacio.alumne.segon_cognom,
					"url": puntuacio.alumne.url_detail,
					"puntuacio": puntuacio.nota
				});
			}
		};

		var select_distinct = function(array) {
		var flags = [], output = [];
		for (var i = 0; i < array.length; i++) {
			if (flags[array[i].id]) continue;
			flags[array[i].id] = true;
			output.push(array[i]);
		}
		return output;
		};

		this.alumnes = select_distinct(alumnes);
		return this.alumnes;
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
