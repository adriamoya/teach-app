import { Component, OnDestroy } from '@angular/core';

import { AssignaturesUpdateComponent } from './assignatures-update.component';

import { AssignaturesDataService } from '../../services/assignatures-data.service';


@Component({
	selector: 'app-assignatures-update-general',
	templateUrl: './assignatures-update-general.component.html'
})

export class AssignaturesUpdateGeneralComponent implements OnDestroy {

	assignatura: any;
	title: string = "General";

	constructor(
		private _assignaturesData: AssignaturesDataService) {
			this.assignatura = this._assignaturesData.getAssignatura();
			// console.log(this.assignatura);
	};

	ngOnDestroy() {
		this._assignaturesData.passAssignatura(this.assignatura);
	};

};

