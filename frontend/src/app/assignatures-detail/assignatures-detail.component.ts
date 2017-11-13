import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Provider that allows us to work and get parameters from the route given
import { SlicePipe } from '@angular/common';

import { AssignaturesService } from '../services/assignatures.service';
import { ProvesService } from '../services/proves.service';


@Component({
  selector: 'app-assignatures-detail',
  templateUrl: './assignatures-detail.component.html',
  styleUrls: ['./assignatures-detail.component.css'],
  providers: [AssignaturesService, ProvesService]
})
export class AssignaturesDetailComponent implements OnInit {

	// CREATE A NEW COMPONENT FOR THE LINECHART

	// GET PROVES PROMIG BY JOINING alumnes-detail with proves-detail.

	private routeSub: any;
	private reqAssignatures: any;
	private reqProves: any;
	assignatura: any;
	proves_assignatura: any;
	id: string;

	constructor(private route: ActivatedRoute, private _assignatures: AssignaturesService, private _proves: ProvesService) { }

	ngOnInit() {

		this.proves_assignatura = [];

		this.routeSub = this.route.params.subscribe(params => {

			this.id = params['id'];

			this.reqAssignatures = this._assignatures.get(this.id).subscribe(data => {
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
		this.reqAssignatures.unsubscribe();
		this.reqProves.unsubscribe();
	};
}
