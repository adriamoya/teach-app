import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';

import { UserChangesService } from '../services/user-changes.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [UserChangesService]
})
export class NavbarComponent {
	
	public isCollapsed = true;
	req_username: any;
	username: string;
	// response: string;
	// api: string;

	constructor(public _router: Router, public _userChanges: UserChangesService) { 
		this.req_username = this._userChanges.get_username().subscribe(data => {
			this.username = data;
		});
		// this.decodedJwt = this.jwt && window.jwt_decode(this.jwt);
	}

	ngOnInit(){ }

	ngOnDestroy() {
		this.req_username.unsubscribe();
	}

	logout() {
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		window.location.reload();
		this._router.navigate(['login']);
	}

}