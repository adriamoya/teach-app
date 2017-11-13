import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { contentHeaders } from '../services/headers';


@Component({
	selector: 'app-login-detail',
	templateUrl: './login-detail.component.html',
	styleUrls: ['./login-detail.component.css']
})

export class LoginDetailComponent implements OnInit {

	title: string = "Login";
	endpointLogin: string = "http://127.0.0.1:8000/api/users/login/";

	constructor(public _router: Router, public _http: Http) { };

	ngOnInit() {
	};

	login(event, username, password) {
		event.preventDefault();
		let body = JSON.stringify({ username, password });
		this._http.post(this.endpointLogin, body, { headers: contentHeaders})
			.subscribe(
				response => {
					// get the token
					console.log(response);
					localStorage.setItem('token', response.json().token);
					this._router.navigate(['home']);
				},
				error => {
					alert(error.text());
					console.log(error.text());
				}
			);
	};

	signup(event) {
		event.preventDefault();
		this._router.navigate(['signup']);
	};

}
