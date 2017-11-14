import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { Subscription } from 'rxjs/Subscription';

import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent {
	
	public isCollapsed = true;
	subscription: Subscription;
	username: string;

	constructor(
		public _router: Router, 
		private _authenticationService: AuthenticationService) { 
		this.subscription = this._authenticationService.getLoginStatus().subscribe(currentUser => {
			if (currentUser){
				this.username = currentUser['username'];
			}
		});
	}

	ngOnInit(){
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	logout() {
		this._authenticationService.logout();
		this._router.navigate(['login']);
	}

}