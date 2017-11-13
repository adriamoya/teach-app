import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const endpoint = 'assets/json/'; // yourdomain.com/api/...

@Injectable()
export class AssignaturesService {

	constructor(private _http: Http) { }

	// list method: lists out all assignatures
	// ------------------------------------------------------
	list(){
		/* We get the data from static JSONs within /assets/json.
		   We will eventually direct the endpoint to our API. */
		let fileName = 'assignatures-list.json';
		return this._http.get(endpoint+fileName)
						.map(response=>response.json())
						.catch(this.handleError);
	};

	// get method: gets specific assignatura with passed id
	// ------------------------------------------------------
	get(id){
		/* We get the data from static JSONs within /assets/json.
		   We will eventually direct the endpoint to our API. */
		let fileName = 'assignatures-detail.json';
		return this._http.get(endpoint+fileName)
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
