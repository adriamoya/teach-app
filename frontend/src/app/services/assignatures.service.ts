import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const endpoint = 'http://127.0.0.1:8000/api/assignatures/'; // eventually run from '/api/assignatures/'

@Injectable()
export class AssignaturesService {

	constructor(private _http: Http) { }

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

		// Authentication credentials were not provided.
		// let headers = new Headers({'Content-Type': 'application/json'});
		// let options = new RequestOptions({headers: headers});
		return this._http.get(endpoint + id + "/")
						.map(response=>{
							let data = response.json().filter(item => {
										if (item.id == id) {
											return item;
										}
							})
							if (data.length == 1) {
								return data[0];
							}
							return {};
						})
						.catch(this.handleError);
	};

	

	// Handling errors
	// ------------------------------------------------------
	private handleError(error:any, caught:any): any{
		console.log(error, caught)
	};

}
