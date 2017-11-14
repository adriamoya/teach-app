import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Provider that allows us to work and get parameters from the route given
import { SlicePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { AssignaturesService } from '../_services/assignatures.service';
import { ProvesService } from '../_services/proves.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-assignatures-detail',
  templateUrl: './assignatures-detail.component.html',
  styleUrls: ['./assignatures-detail.component.css'],
  providers: [AssignaturesService, ProvesService]
})

export class AssignaturesDetailComponent implements OnInit {

	// CREATE A NEW COMPONENT FOR THE LINECHART

	// GET PROVES PROMIG BY JOINING alumnes-detail with proves-detail.

	public routeSub: any;
	public subscription: Subscription;
	public reqAssignatures: any;
	public reqProves: any;
	token: string;
	assignatura: any;
	proves_assignatura: any;
	id: string;

	constructor(
		public _route: ActivatedRoute, 
		public _assignatures: AssignaturesService, 
		public _proves: ProvesService,
		public _authenticationService: AuthenticationService) { 
		this.subscription = this._authenticationService.getLoginStatus().subscribe(currentUser => {
			if (currentUser){
				this.token = currentUser['token'];
			}
		// this.reqToken = this._userChanges.get_token().subscribe(data => {
		// 	this.token = data;
		// 	// console.log(this.token);
		// });
		})

		

	}

	ngOnInit() {
		this.proves_assignatura = [];

		this.routeSub = this._route.params.subscribe(params => {

			this.id = params['id'];

			this.reqAssignatures = this._assignatures.get(this.id, this.token).subscribe(data => {
				this.assignatura = data;
				this.reqProves = this._proves.get(this.assignatura.id, '*').subscribe(data => {
					this.proves_assignatura = data;
				});
			});
		});
	};


	// important to unsubscribe (destroy) after using subscribe ...
	ngOnDestroy() {
		this.routeSub.unsubscribe();
		this.subscription.unsubscribe();
		this.reqAssignatures.unsubscribe();
		this.reqProves.unsubscribe();
	};
}
