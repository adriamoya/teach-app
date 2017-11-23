import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {

	public loading = false;
	username: string;

	constructor() { }

	ngOnInit() {
		let currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if (currentUser) {
			this.username = currentUser['username'];
		} else {
			this.username = null;
		}
	}

	ngOnDestroy() {	}

}
