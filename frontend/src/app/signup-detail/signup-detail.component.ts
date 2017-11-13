import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
	selector: 'app-signup-detail',
	templateUrl: './signup-detail.component.html',
	styleUrls: ['./signup-detail.component.css']
})
export class SignupDetailComponent implements OnInit {

	title: string = "Signup";

	constructor(public _router: Router, public _http: Http) {};

	ngOnInit() {
	};


	signup(event, username, password) {
		event.preventDefault();
		let body = JSON.stringify({ username, password });
		// this._http.post('http://localhost:3001/users', body, { headers: contentHeaders })
		// 	.subscribe(
		// 		response => {
		// 			localStorage.setItem('id_token', response.json().id_token);
		// 			this.router.navigate(['home']);
		// 		},
		// 		error => {
		// 			alert(error.text());
		// 			console.log(error.text());
		// 		}
		// 	);
	};

	login(event) {
		event.preventDefault();
		this._router.navigate(['login']);
	};

}