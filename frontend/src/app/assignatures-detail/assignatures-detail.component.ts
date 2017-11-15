import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Provider that allows us to work and get parameters from the route given
import { SlicePipe } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { AssignaturesService } from '../_services/assignatures.service';
import { ProvesService } from '../_services/proves.service';
import { AuthenticationService } from '../_services/authentication.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-assignatures-detail',
  templateUrl: './assignatures-detail.component.html',
  styleUrls: ['./assignatures-detail.component.css'],
  providers: [AssignaturesService, ProvesService]
})

export class AssignaturesDetailComponent implements OnInit, OnDestroy {

	// CREATE A NEW COMPONENT FOR THE LINECHART

	// GET PROVES PROMIG BY JOINING alumnes-detail with proves-detail.

	public routeSub: any;
	public subscription: Subscription;
	public reqAssignatures: any;
	public reqProves: any;
	assignatura: any;
	proves_assignatura: any;
	id: string;

	constructor(
		public _route: ActivatedRoute,
		public _router: Router,
		public _assignatures: AssignaturesService, 
		public _proves: ProvesService,
		public _authenticationService: AuthenticationService) { 
	};

	ngOnInit() {

		this.proves_assignatura = [];

		this.routeSub = this._route.params.subscribe(params => {
			this.id = params['id'];
			this.reqAssignatures = this._assignatures.get(this.id)
				.subscribe(
					data => {
						this.assignatura = data;
						this.reqProves = this._proves.get(this.assignatura.id, '*')
							.subscribe(p_data => {
								this.proves_assignatura = p_data;
							});
					},
					error => {
						// this routing should be based off of the error-status
						// possibly incorporated within the _service
						this._router.navigate(['login'])
					});
		});
	};

	// important to unsubscribe (destroy) after using subscribe ...
	ngOnDestroy() {
		this.routeSub.unsubscribe();
		// this.subscription.unsubscribe();
		this.reqAssignatures.unsubscribe();
		// this.reqProves.unsubscribe();
	};
}
