import { Component, OnDestroy } from '@angular/core';

import { AssignaturesUpdateComponent } from './assignatures-update.component';

import { AssignaturesDataService } from '../../services/assignatures-data.service';


@Component({
	selector: 'app-assignatures-update-alumnes',
	templateUrl: './assignatures-update-alumnes.component.html'
})

export class AssignaturesUpdateAlumnesComponent implements OnDestroy {

	assignatura: any;
	alumnes: any;
	title: string = "Alumnes";

	constructor(
		private _assignaturesData: AssignaturesDataService) {
			this.assignatura = this._assignaturesData.getAssignatura();
			this.alumnes = this._assignaturesData.get_distinct_alumnes();
	};

	ngOnDestroy() {
		this._assignaturesData.passAssignatura(this.assignatura);
	};

};

