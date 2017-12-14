import { Component, Injectable, TemplateRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// Services
import { AssignaturesService } from '../../services/assignatures.service';
import { AssignaturesDataService } from '../../services/assignatures-data.service';
import { ProvesService } from '../../services/proves.service';


// Main component
@Component({
	selector: 'app-assignatures-update-proves',
	templateUrl: './assignatures-update-proves.component.html'
})

export class AssignaturesUpdateProvesComponent implements OnDestroy {

	private reqDelete: any;
	private assignatura: any;
	private copiedAssignatura: any;
	private prova: any;
	private title: string = "Proves";
	private bsModalRef: BsModalRef;

	constructor(
		private _modalService: BsModalService,
		private _proves: ProvesService,
		private _assignatures: AssignaturesService,
		private _assignaturesData: AssignaturesDataService) {
		this.assignatura = this._assignaturesData.getAssignatura();

		// We want to filter out the prova_avalucio to prevent deleting
		this.copiedAssignatura = Object.assign({}, this.copiedAssignatura , this.assignatura );

		for (let avaluacio of this.copiedAssignatura.assignatura_avaluacions) {
			for (let prova of avaluacio.proves_avaluacio) {
				if (prova.nom == "Total avaluacio") {
					let index = avaluacio.proves_avaluacio.indexOf(prova);
					avaluacio.proves_avaluacio.splice(index, 1);
				}
			}
			// avaluacio = avaluacio.proves_avaluacio.filter((prova)=>prova.nom!="Total avaluacio")
		}

		console.log(this.copiedAssignatura);

	};


	openModal(event, template: TemplateRef<any>) {
		let id = event.target.parentElement.attributes.id.nodeValue;
		for (let avaluacio of this.assignatura.assignatura_avaluacions) {
			for (let prova of avaluacio.proves_avaluacio) {
				if (prova.id == id) {
					this.prova = prova;
				}
			} 
		}
		this.bsModalRef = this._modalService.show(template);
	};


	deleteProva(provaId) {
		console.log(provaId)
		this._proves.delete(provaId)
			.subscribe(
				response => {
					console.log('deleted');

					/*
					Retrieving the new assignatura with the Prova deleted changed

					// let assignaturaId = this.assignatura.id;
					// this.reqDelete = this._assignatures.get(assignaturaId).subscribe(item => {
					// 	this._assignaturesData.passAssignatura(item);
					// 	this.assignatura = item
					// });

					This however will discard the changes done in the general tab.
					Instead, we could just update the copy of the assignatura item in the
					data service by splicing the prova from the prova array attribute of the assignatura.
					*/

					// filter the prova and splice from assignatura image
					for (let avaluacio of this.assignatura.assignatura_avaluacions) {
						let index = avaluacio.proves_avaluacio.indexOf(this.prova);
						if (index) {
							avaluacio.proves_avaluacio.splice(index, 1);
						}
					}

					// pass assignatura image to data service
					this._assignaturesData.passAssignatura(this.assignatura);

					this.bsModalRef.hide()
				}
			);
	}

	ngOnDestroy() {
		this._assignaturesData.passAssignatura(this.assignatura);
	};

};







/*

import { Component, Injectable, TemplateRef, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// Services
import { AssignaturesDataService } from '../../services/assignatures-data.service';
import { ProvesService } from '../../services/proves.service';


// Service for passing data between component and modal component
@Injectable()
export class ModalDataService {

	private assignaturaId: string;
	private provaId: string;

	constructor() { }

	passIds(assignaturaId: string, provaId: string) { 
		this.assignaturaId = assignaturaId;
		this.provaId = provaId;
		console.log(this.assignaturaId);
	}

	getProvaId() { 
		return this.provaId;
	}

	getAssignaturaId() {
		return this.assignaturaId;
	}

}


// Main component
@Component({
	selector: 'app-assignatures-update-proves',
	templateUrl: './assignatures-update-proves.component.html'
})

export class AssignaturesUpdateProvesComponent implements OnInit, OnDestroy {

	private reqDelete: any;
	private routeSub: any;
	private assignatura: any;
	private prova: any;
	private title: string = "Proves";
	private bsModalRef: BsModalRef;

	constructor(
		private modalService: BsModalService,
		private _assignaturesData: AssignaturesDataService,
		private _modalDataService: ModalDataService) {
		this.assignatura = this._assignaturesData.getAssignatura();
	};

	openModal(template: TemplateRef<any>, id:any) {
		let proves = this.assignatura.proves_assignatura
		this.prova = proves.filter(proves => proves.id = id)[0];
		// this.modalRef = this.modalService.show(template);
		if (this.prova) {
			this._modalDataService.passIds(this.assignatura.id, this.prova.id);
			this.bsModalRef = this.modalService.show(ModalProvesUpdateDeleteComponent);
			this.bsModalRef.content.title = `Eliminar ${ this.prova.nom }`;
			this.bsModalRef.content.body = 'Segur que voleu eliminar aquesta prova?'
		}
	};

	ngOnDestroy() {
		this._assignaturesData.passAssignatura(this.assignatura);
		// this.reqDelete.unsubscribe();
	};

};



// Modal component 
@Component({
  selector: 'modal-proves-update-delete',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{ title }}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    	<div class="row">
    		<div class="col-12">
		      {{ body }}
		      <button type="button" class="btn btn-danger float-right" (click)="deleteProva()">Eliminar</button>  		
    	   	</div>
    	</div>
    </div>
  `
})
export class ModalProvesUpdateDeleteComponent {

  constructor(
  	private _route: ActivatedRoute
  	private _router: Router,
  	private _proves: ProvesService,
  	private _assignaturesData: AssignaturesDataService,
  	private _modalDataService: ModalDataService,
  	public bsModalRef: BsModalRef) { }

  deleteProva() {
  	// retrieving the id from the service
  	let provaId = this._modalDataService.getProvaId();
  	let assignaturaId = this._modalDataService.getAssignaturaId();
	this._proves.delete(provaId)
		.subscribe(
			response => {
				console.log('deleted');
				this.bsModalRef.hide()
				this._router.navigate(['assignatures', assignaturaId, 'edit', 'proves'])
			});
  }

}

*/