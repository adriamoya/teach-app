import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';


@Component({
	selector: 'app-login-detail',
	templateUrl: './login-detail.component.html',
	styleUrls: ['./login-detail.component.css']
})

export class LoginDetailComponent implements OnInit {

	title: string = "Login";

	constructor(public _router: Router, public _http: Http) { };

	ngOnInit() {
	};

	login(event, username, password) {
		event.preventDefault();
		let body = JSON.stringify({ username, password });
		// this._http.post
	};

	signup(event) {
		event.preventDefault();
		this._router.navigate(['signup']);
	};

}
