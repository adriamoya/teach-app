import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Provider that allows us to work and get parameters from the route given

import { AssignaturesUpdateDetailComponent } from './assignatures-update-detail.component';

import { AssignaturesService } from '../services/assignatures.service';

@Component({
	selector: 'app-assignatures-update',
	templateUrl: './assignatures-update.component.html',
	styleUrls: ['./assignatures-update.component.css'],
	providers: [AssignaturesService]
})

export class AssignaturesUpdateComponent implements OnInit {

	private routeSub: any;
	private req: any;
	assignatura: any;
	id: string;

	menuSelection: string = "general";

	constructor(private route: ActivatedRoute, private _assignatures: AssignaturesService) { }

	ngOnInit() {

		this.routeSub = this.route.params.subscribe(params => {
			this.id = params['id'];
			this.req = this._assignatures.get(this.id).subscribe(item => {
				this.assignatura = item;
			});
		});
	};


	// important to unsubscribe (destroy) after using subscribe ...
	ngOnDestroy() {
		this.routeSub.unsubscribe();
		this.req.unsubscribe();
	};
}

