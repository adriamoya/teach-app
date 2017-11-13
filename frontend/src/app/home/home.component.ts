import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';

import { UserChangesService } from '../services/user-changes.service';


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css'],
	providers: [UserChangesService]
})

export class HomeComponent implements OnInit {

	public loading = false;
	req_username: any;
	req_token: any;
	username: string;
	token: string;
	// response: string;
	// api: string;

	constructor(public _userChanges: UserChangesService) {}

	ngOnInit() {
		this.loading = true;
		this.req_username = this._userChanges.get_username().subscribe(data => {
			this.loading = false;
			this.username = data;
		});

		this.req_token = this._userChanges.get_token().subscribe(data => {
			this.loading = false;
			this.token = data;
		});
	}

	ngOnDestroy() {
		this.req_username.unsubscribe();
		this.req_token.unsubscribe();
	}

}
