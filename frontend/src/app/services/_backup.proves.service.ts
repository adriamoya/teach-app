import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const endpoint = 'assets/json/'; // yourdomain.com/api/...

@Injectable()
export class ProvesService {

	constructor(private _http: Http) { }

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
