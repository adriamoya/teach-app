import { Component, TemplateRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// Services
import { AssignaturesService } from '../../services/assignatures.service';
import { AssignaturesDataService } from '../../services/assignatures-data.service';


@Component({
	selector: 'app-assignatures-update-general',
	templateUrl: './assignatures-update-general.component.html'
})

export class AssignaturesUpdateGeneralComponent implements OnDestroy {

	private sub: any;
	private assignatura: any;
	private title: string = "General";
	private bsModalRef: BsModalRef;
	private cursos: string[] = ['2016', '2017', '2018', '2019', '2020', '2021']

	constructor(
		private _router: Router,
		private _modalService: BsModalService,
		private _assignatures: AssignaturesService,
		private _assignaturesData: AssignaturesDataService) {
			this.assignatura = this._assignaturesData.getAssignatura();
			// console.log(this.assignatura);
	};

	openModal(event, template: TemplateRef<any>) {
		this.bsModalRef = this._modalService.show(template);
	};

	saveGeneral(formGeneral: NgForm){
		// post the new info to the server
		// console.log(formGeneral.value);
		let changedAssignatura = this.assignatura;
		changedAssignatura.nom = formGeneral.value['nom-assignatura'];
		changedAssignatura.curs = formGeneral.value['curs-assignatura'];
		changedAssignatura.bio = formGeneral.value['bio-assignatura'];
		this._assignaturesData.passAssignatura(changedAssignatura);
	};

	deleteAssignatura() {
		this.sub = this._assignatures.delete(this.assignatura.id)
			.subscribe(
				response => {
					console.log('deleted');
					console.log(response);
				}
			);
		this.sub.unsubscribe();
		this.bsModalRef.hide();
		this._router.navigate(['/assignatures']);
	};

	ngOnDestroy() {
		// post the new info to the server
		this._assignaturesData.passAssignatura(this.assignatura);
	};

};
 
