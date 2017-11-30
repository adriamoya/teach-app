import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AssignaturesUpdateComponent } from './assignatures-update.component';

import { AssignaturesDataService } from '../../services/assignatures-data.service';


@Component({
	selector: 'app-assignatures-update-general',
	templateUrl: './assignatures-update-general.component.html'
})

export class AssignaturesUpdateGeneralComponent implements OnDestroy {

	assignatura: any;
	title: string = "General";

	cursos: string[] = ['2016', '2017', '2018', '2019', '2020', '2021']

	constructor(
		private _assignaturesData: AssignaturesDataService) {
			this.assignatura = this._assignaturesData.getAssignatura();
			// console.log(this.assignatura);
	};

	saveGeneral(formGeneral: NgForm){
		// post the new info to the server
		// console.log(formGeneral.value);
		let changedAssignatura = this.assignatura;
		changedAssignatura.nom = formGeneral.value['nom-assignatura'];
		changedAssignatura.curs = formGeneral.value['curs-assignatura'];
		changedAssignatura.bio = formGeneral.value['bio-assignatura'];
		this._assignaturesData.passAssignatura(changedAssignatura);
	}

	ngOnDestroy() {
		// post the new info to the server
		this._assignaturesData.passAssignatura(this.assignatura);
	};

};

