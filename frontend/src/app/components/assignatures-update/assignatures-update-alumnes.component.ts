import { Component, OnDestroy } from '@angular/core';

import { AssignaturesUpdateComponent } from './assignatures-update.component';

import { AssignaturesDataService } from '../../services/assignatures-data.service';
import { AlumnesService } from '../../services/alumnes.service';

@Component({
	selector: 'app-assignatures-update-alumnes',
	templateUrl: './assignatures-update-alumnes.component.html'
})

export class AssignaturesUpdateAlumnesComponent implements OnDestroy {

	private sub: any;
	private assignatura: any;
	private alumnes: any[] = [];
	private title: string = "Alumnes";

	constructor(
		private _alumnes: AlumnesService,
		private _assignaturesData: AssignaturesDataService) {
			this.assignatura = this._assignaturesData.getAssignatura();
			// this.alumnes = this._assignaturesData.get_distinct_alumnes();

			this.sub = this._alumnes.list().subscribe(alumnes => {
				for (let alumne of alumnes) {
					this._alumnes.get(alumne.id).subscribe(alumneData => {
						for (let assignatura of alumneData.assignatures) {
							if (assignatura == this.assignatura.id) {
								this.alumnes.push(alumneData);
								console.log(this.alumnes);
							}
						}
					})
				}
			})
	};

	getAlumnes(assignaturaId: string) {

	};

	ngOnDestroy() {
		this._assignaturesData.passAssignatura(this.assignatura);
		this.sub.unsubscribe();
	};

};

