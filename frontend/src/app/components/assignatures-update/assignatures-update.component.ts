import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Provider that allows us to work and get parameters from the route given

import { AssignaturesService } from '../../services/assignatures.service';
import { AssignaturesDataService } from '../../services/assignatures-data.service';


@Component({
	selector: 'app-assignatures-update',
	templateUrl: './assignatures-update.component.html',
	providers: []
})

export class AssignaturesUpdateComponent implements OnDestroy {

	private routeSub: any;
	private req: any;
	private assignatura: any;
	private id: string;

	menuSelection: string = "general";

	constructor(
		private route: ActivatedRoute, 
		private _assignatures: AssignaturesService,
		private _assignaturesData: AssignaturesDataService) {
		this.routeSub = this.route.params.subscribe(params => {
			this.id = params['id'];
			this.req = this._assignatures.get(this.id).subscribe(item => {
				this.assignatura = item;
				// console.log(item);
				this._assignaturesData.passAssignatura(item);
			});
		});
	};

	saveChanges(){
		let assignaturaSubmit = this._assignaturesData.getAssignatura();
		console.log(assignaturaSubmit);

	}

	// important to unsubscribe (destroy) after using subscribe ...
	ngOnDestroy() {
		this.routeSub.unsubscribe();
		this.req.unsubscribe();
	};
}
