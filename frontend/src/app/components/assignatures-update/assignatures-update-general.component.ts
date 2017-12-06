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
	private cursos: string[] = ['2016', '2017', '2018', '2019', '2020', '2021'];
	private changesSaved: boolean;


	constructor(
		private _router: Router,
		private _modalService: BsModalService,
		private _assignatures: AssignaturesService,
		private _assignaturesData: AssignaturesDataService) {
			this.changesSaved = this._assignaturesData.getChangesSaved();
			this.assignatura = this._assignaturesData.getAssignatura();
	};


	openModal(event, template: TemplateRef<any>) {
		this.bsModalRef = this._modalService.show(template);
	};

 
	changesMade(event) {
		// Tracks the any change made and passes to the service a flag to show the modal before exit
		// if changes no saved
		// console.log(event);
		if (this.changesSaved) {
			this.changesSaved = false;
			this._assignaturesData.passChangesSaved(this.changesSaved);
		}
	};


	onChange(id: string, selectedValue: string) {
		// refreshes any change done in form (even if submit is not triggered)
		if (id == "nom-assignatura") {
			this.assignatura.nom = selectedValue;
			// validation!
		} else if (id == "curs-assignatura") {
			this.assignatura.curs = parseInt(selectedValue);
			// validation!
		} else if (id == "bio-assignatura") {
			this.assignatura.bio = selectedValue;
			// validation!
		};
	};


	saveGeneral(formGeneral: NgForm){
		// Only triggered when submit method in form
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
 
