import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Provider that allows us to work and get parameters from the route given
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { BsModalService } from 'ngx-bootstrap/modal';

// Services
import { AssignaturesService } from '../../services/assignatures.service';
import { AssignaturesDataService } from '../../services/assignatures-data.service';

// Modals
import { ModalSavedChangesComponent } from './modal-saved-changes.component';

@Component({
  selector: 'modal-assignatures-update',
  template: `
<div class="modal-header">
	<h4 class="modal-title pull-left">Guardar els canvis</h4>
	<button type="button" class="close pull-right" aria-label="Close" (click)="modalAssignaturesUpdateRef.hide()">
		<span aria-hidden="true">&times;</span>
	</button>
</div>
<div class="modal-body">
	<div class="row">
		<div class="col-12">
			<span>
				<strong>
					No s'han guardat els canvis.
				</strong>
			</span>
			<br>
			Què voleu fer?
			<button type="button"class="btn btn-outline-danger float-right" (click)="modalAssignaturesUpdateRef.hide()">Descartar</button>
			<button type="button" style="margin-right: 10px;"  class="btn btn-outline-success float-right" (click)="saveChangesModal()">Guardar</button>
		</div>
	</div>
</div>
  `
})
export class ModalAssignaturesUpdateComponent {

	// title: string;
	private assignaturaSubmit: any;
	private modalSavedChanges: BsModalRef;

	constructor(
		public _modalService: BsModalService,
		public _assignatures: AssignaturesService,
		public _assignaturesData: AssignaturesDataService,
		public modalAssignaturesUpdateRef: BsModalRef) {
		this.assignaturaSubmit = this._assignaturesData.getAssignatura()

	}

	// CANDEACTIVATE use a service here to prevent from ngOnDestroy

	// discardChanges() {
	// 	this._router.navigate(['/assignatures', this.assignaturaSubmit.id, 'edit'])
	// 	this._assignaturesData.passAssignatura(this.assignaturaSubmit);
	// 	this.bsModalRef.hide();
	// }

	saveChangesModal(){
		// let assignaturaSubmit = this._assignaturesData.getAssignatura();
		console.log(this.assignaturaSubmit);
		this._assignatures.update(this.assignaturaSubmit)
			.subscribe(
				response => {
					console.log('changes saved ...');
					console.log(response);
					this._assignaturesData.passChangesSaved(true);
					this.modalAssignaturesUpdateRef.hide();
					setTimeout(() => {
						this.modalSavedChanges = this._modalService.show(ModalSavedChangesComponent);
					}, 250);
				}
			)
		// save changes here
	}

}
