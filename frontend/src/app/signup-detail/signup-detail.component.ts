import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { contentHeaders } from '../services/headers';

@Component({
	selector: 'app-signup-detail',
	templateUrl: './signup-detail.component.html',
	styleUrls: ['./signup-detail.component.css']
})

export class SignupDetailComponent implements OnInit {

	req: any;
	title: string = "Sign up";
	endpoint: string = "http://127.0.0.1:8000/api/users/register/";
	usernameError: [any];
	emailError: [any];
	email2Error: [any];
	passwordError: [any];


	constructor(public _router: Router, public _http: Http) {};

	ngOnInit() {
	};

	signup(event, username, email, email2, password) {
		event.preventDefault();
		let body = JSON.stringify({ username, email, email2, password });
		// console.log(body);
		this.req = this._http.post(this.endpoint, body, { headers: contentHeaders})
			.subscribe(
				response => {
					this._router.navigate(['login']);
				},
				error => {
					let registerError = error.json();

					if (registerError.username) {
						this.usernameError = registerError.username;
					} else {
						this.usernameError = null;
					}

					if (registerError.email) {
						this.emailError = registerError.email;
					} else {
						this.emailError = null;
					}

					if (registerError.email2) {
						this.email2Error = registerError.email2;
					} else {
						this.email2Error = null;
					}

					if (registerError.password) {
						this.passwordError = registerError.password;
					} else {
						this.passwordError = null;
					}


				}
			);
	};

	login(event) {
		event.preventDefault();
		this._router.navigate(['login']);
	};

}