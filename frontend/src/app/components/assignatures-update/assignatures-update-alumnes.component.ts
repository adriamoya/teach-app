import { Component, TemplateRef, OnDestroy } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { AssignaturesUpdateComponent } from './assignatures-update.component';

// Services
import { AssignaturesService } from '../../services/assignatures.service';
import { AssignaturesDataService } from '../../services/assignatures-data.service';
import { AlumnesService } from '../../services/alumnes.service';

@Component({
	selector: 'app-assignatures-update-alumnes',
	templateUrl: './assignatures-update-alumnes.component.html'
})

export class AssignaturesUpdateAlumnesComponent implements OnDestroy {

	private sub: any;
	private assignatura: any;
	private alumne: any;
	private alumnes: any[] = [];
	private title: string = "Alumnes";
	private bsModalRef: BsModalRef;

	constructor(
		private _modalService: BsModalService,
		private _alumnes: AlumnesService,
		private _assignatures: AssignaturesService,
		private _assignaturesData: AssignaturesDataService) {
			this.assignatura = this._assignaturesData.getAssignatura();
			// this.alumnes = this._assignaturesData.get_distinct_alumnes();

			this.sub = this._alumnes.list().subscribe(alumnes => {
				for (let alumne of alumnes) {
					this._alumnes.get(alumne.id).subscribe(alumneData => {
						console.log(alumneData);
						for (let assignatura of alumneData.assignatures) {
							if (assignatura == this.assignatura.id) {
								this.alumnes.push(alumneData);
								// console.log(this.alumnes);
							}
						}
					})
				}
			})
	};


	openModal(event, template: TemplateRef<any>) {
		let id = event.target.parentElement.attributes.id.nodeValue;
		this.alumne = this.alumnes.filter( (alumne) => alumne.id == id)[0];
		console.log(this.alumne);
		this.bsModalRef = this._modalService.show(template);
	};

	deleteAlumneFromAssignatura() { // deleteAlumneFromAssignatura

		let alumne = this.alumne;
		let assignatures = this.alumne.assignatures;

		let index = assignatures.indexOf(this.assignatura.id);
		this.alumne.assignatures.splice(index, 1)

		let index = this.alumnes.indexOf(this.alumne);
		this.alumnes.splice(index, 1);

		this._alumnes.update(this.alumne)
			.subscribe(
				response => {
					console.log('updated');
					console.log(response);
				}
			);

		this.bsModalRef.hide();
		// post new data to api
	}

	/*
	deleteAlum
	ne(alumneId) {
		this._alumnes.delete(alumneId)
			.subscribe(
				response => {
					console.log('deleted');
					let assignaturaId = this.assignatura.id;
					this.reqDelete = this._assignatures.get(assignaturaId).subscribe(item => {
						this._assignaturesData.passAssignatura(item);
						this.assignatura = item
					});
					this.bsModalRef.hide()
				}
			);
	};
	*/

	ngOnDestroy() {
		this._assignaturesData.passAssignatura(this.assignatura);
		this.sub.unsubscribe();
	};

};

