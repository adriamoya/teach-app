import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { AuthenticationService } from '../_services/authentication.service';

@Component({
	selector: 'app-login-detail',
	templateUrl: './login-detail.component.html',
	styleUrls: ['./login-detail.component.css'],
})

export class LoginDetailComponent implements OnInit {

	req: any;
	title: string = "Login";
	endpoint: string = "http://127.0.0.1:8000/api/users/login/";
	usernameError: [any];
	passwordError: [any];
	nonFieldError: [any];

	constructor(
		public _router: Router, 
		public _http: Http,
		public _authenticationService: AuthenticationService) { };

	ngOnInit() {
		// reset login status
		this._authenticationService.logout();
	};

	login(event, username, password) {
		this.req = this._authenticationService.login(username, password)
			.subscribe(result => {
				if (result === true) {
					// login successful
					// this._authenticationService.sendMessage();
					this._router.navigate(['home']);
				} else {
					// login failed
					this.error = 'Username or password is incorrect';
				}
			});

	};

	signup(event) {
		this._router.navigate(['signup']);
	};

	ngOnDestroy(){
		this.req.unsubscribe();
	}

}


	// login(event, username, password) {
	// 	event.preventDefault();
	// 	let body = JSON.stringify({ username, password });
	// 	this.req = this._http.post(this.endpoint, body, { headers: contentHeaders})
	// 		.subscribe(
	// 			response => {
	// 				// get the token
	// 				// console.log(response);
	// 				localStorage.setItem('token', response.json().token);
	// 				localStorage.setItem('username', response.json().username);
	// 				this._router.navigate(['home']);
	// 				window.location.reload();
	// 			},
	// 			error => {
	// 				console.log(error.text());
	// 				let registerError = error.json();

	// 				if (registerError.username) {
	// 					this.usernameError = registerError.username;
	// 				} else {
	// 					this.usernameError = null;
	// 				}

	// 				if (registerError.password) {
	// 					this.passwordError = registerError.password;
	// 				} else {
	// 					this.passwordError = null;
	// 				}

	// 				if (registerError.non_field_errors) {
	// 					this.nonFieldError = registerError.non_field_errors;
	// 				} else {
	// 					this.nonFieldError = null;
	// 				}
	// 			}
	// 		);
	// };

	// signup(event) {
	// 	event.preventDefault();
	// 	this._router.navigate(['signup']);
	// };

	// ngOnDestroy(){
	// 	this.req.unsubscribe();
	// }