import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Provider that allows us to work and get parameters from the route given
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// Services
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
	private copiedAssignatura: any;
	private id: string;
	private changesSaved: boolean = true;
	private bsModalRef: BsModalRef;


	menuSelection: string = "general";

	constructor(
		private _modalService: BsModalService,
		private _route: ActivatedRoute, 
		private _router: Router,
		private _assignatures: AssignaturesService,
		private _assignaturesData: AssignaturesDataService) {
		this._assignaturesData.passChangesSaved(this.changesSaved);
		this.routeSub = this._route.params.subscribe(params => {
			this.id = params['id'];
			this.req = this._assignatures.get(this.id).subscribe(item => {
				this.assignatura = item;
				// pass assignatura image to the data service
				this._assignaturesData.passAssignatura(item);
				// create a copy of the assignatura so that there is no data-binding (breadcrumb)
				this.copiedAssignatura = Object.assign({}, this.copiedAssignatura , item );
			});
		});
	};

	// Here we open a modal before exiting just in case the user
	// has not saved changes. Instead of showing the modal from the TemplateRef,
	// here we are using a modal from another component that is not triggered by any DOM
	// from the template (instead by the ngOnDestroy method).
	openModalWithComponent() {
		// const list = [
		// 	'Open a modal with component',
		// 	'Pass your data',
		// 	'Do something else',
		// 	'...'
		// ];
		this.bsModalRef = this._modalService.show(ModalAssignaturesUpdateComponent);
		// this.bsModalRef.content.title = 'Modal with component';
		// this.bsModalRef.content.list = list;
		// setTimeout(() => {
		// 	list.push('PROFIT!!!');
		// }, 2000);
	};

	saveChanges(){
		let assignaturaSubmit = this._assignaturesData.getAssignatura();
		console.log(assignaturaSubmit);
		// save changes here
		this.changesSaved = true;
	}

	ngOnDestroy() {
		// this._router.navigate(['/assignatures', this.id, 'edit'])
		this.routeSub.unsubscribe();
		this.req.unsubscribe();

		this.changesSaved = this._assignaturesData.getChangesSaved();
		// if changes not saved, show warning message
		if (this.changesSaved == false) {
			this.openModalWithComponent();
		};
	};
}




@Component({
  selector: 'modal-content',
  template: `
<div class="modal-header">
	<h4 class="modal-title pull-left">Guardar els canvis</h4>
	<button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
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
			<button type="button"class="btn btn-outline-danger float-right" (click)="bsModalRef.hide()">Descartar</button>
			<button type="button" style="margin-right: 10px;"  class="btn btn-outline-success float-right" (click)="saveChangesModal()">Guardar</button>
		</div>
	</div>
</div>
  `
})
export class ModalAssignaturesUpdateComponent {

	// title: string;
	private assignaturaSubmit: any;

	constructor(
		public _router: Router,
		public _assignatures: AssignaturesService,
		public _assignaturesData: AssignaturesDataService,
		public bsModalRef: BsModalRef) {
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
					console.log(response);
					this.changesSaved = true;
				}
			)
		// save changes here
		console.log('changes saved ...')
		this.bsModalRef.hide();
	}

}



/*
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <ul *ngIf="list.length">
        <li *ngFor="let item of list">{{item}}</li>
      </ul>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">Close</button>
    </div>
  `
 */