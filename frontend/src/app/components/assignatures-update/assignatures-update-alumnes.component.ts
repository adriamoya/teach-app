import { Component, TemplateRef, OnDestroy } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';


// Services
import { AssignaturesService } from '../../services/assignatures.service';
import { AssignaturesDataService } from '../../services/assignatures-data.service';
import { AlumnesService } from '../../services/alumnes.service';
import { ClassesService } from '../../services/classes.service';

// Interfaces
import { Classe } from '../../interfaces/classe.interface';


@Component({
	selector: 'app-assignatures-update-alumnes',
	templateUrl: './assignatures-update-alumnes.component.html'
})

export class AssignaturesUpdateAlumnesComponent implements OnDestroy {

	private sub: any;
	private subClasses: any;
	private assignatura: any;
	private alumne: any;
	private alumnes: any[] = [];
	private newAlumnes: any[] = [];
	private classes: Classe[];
	private classesAlumnes: any[] = [];
	private title: string = "Alumnes";
	private bsModalRef: BsModalRef;

	constructor(
		private _modalService: BsModalService,
		private _alumnes: AlumnesService,
		private _classes: ClassesService,
		private _assignatures: AssignaturesService,
		private _assignaturesData: AssignaturesDataService) {

		// Assignatura
		// --------------------------------------------------------------------
		this.assignatura = this._assignaturesData.getAssignatura();

		// Classes
		// --------------------------------------------------------------------
		this.subClasses = this._classes.list()
		.subscribe(
			response => {
				// console.log(response);
				this.classes = response;
				for (let classe of this.classes) {
					classe.included = false;
					for (let assignaturaId of classe.assignatures) {
						if (assignaturaId == this.assignatura.id) {
							classe.included = false;
						}
					}
				};
			});

		// Alumnes
		// --------------------------------------------------------------------
		this.sub = this._alumnes.list().subscribe(alumnes => {
			let getAlumnesObservables: Observable<any>[] = [];
			for (let alumne of alumnes) {
				getAlumnesObservables.push(this._alumnes.get(alumne.id));
			}

			Observable.forkJoin(getAlumnesObservables)
				.subscribe(
					alumnesArray => {
						for (let alumne of alumnesArray) {
							for (let assignatura of alumne.assignatures) {
								if (assignatura == this.assignatura.id) {
									alumne.included = true;
									alumne.disabled = true;
									this.alumnes.push(alumne);
									// this.newAlumnes.push(alumne);
								}
							}
						}
					this.buildClassesAlumnes();
					}
				)
			})


	};


	buildClassesAlumnes() {
		this.classesAlumnes = this.classes;
		for (let classe of this.classes) {
			classe.alumnes = [];
			for (let alumne_classe of classe.alumne_classe) {
				for (let alumne of this.alumnes) {
					if (alumne_classe == alumne.id) {
						classe.alumnes.push(alumne);
					}
				}
			}
		};
	}


	// New alumnes form
	// --------------------------------------------------------------------

	isCollapsed: boolean = true;
 
	collapsed(event: any): void {
		// console.log(event);
	}

	expanded(event: any): void {
		// console.log(event);
		// console.log(this.classes);
	}

	onChange(id: string, selectedValue: boolean) {
		console.log(selectedValue);
		for (let classe of this.classes) {
			if (classe.id == id) {
				classe.included = selectedValue;
			}
		}
		// refreshes any change done in form (even if submit is not triggered)
		console.log(id);
		console.log(selectedValue);
		this.subClasses = this._classes.get(id)
			.subscribe(
				response => {
					console.log(response);
					if (response.alumne_classe.length > 0) {
						
						// Add alumnes
						if (selectedValue) {
							// First check that alumnes from classes are not already included in the list
							let newAlumnesIds: string[] = [];
							for (let _alumne of this.newAlumnes) {
								newAlumnesIds.push(_alumne.id);
							}

							let alumnesIds: string[] = [];
							for (let _alumne of this.alumnes) {
								alumnesIds.push(_alumne.id);
							}

							for (let alumne of response.alumne_classe) {
								// If alumne from selected classe is not included in the list
								if (!newAlumnesIds.includes(alumne.id)) {
									alumne.included = true;
									if (alumnesIds.includes(alumne.id)) {
										alumne.disabled = true;
									}
									alumne.classe = response.id;
									this.newAlumnes.push(alumne);
								}
							}
						}

						// Delete alumnes
						else {
							for (let alumne of response.alumne_classe) {
								let index = 0;
								for (let alumneIncluded of this.newAlumnes) {
									index += 1;
									if (alumne.id == alumneIncluded.id) {
										this.newAlumnes.splice(index-1, 1)
									}

								}			
							}
						}
					}
				}
			);
	};

	test() {
		console.log(this.classes);
	}

	saveAlumnesChanges(){

		/*
		Checked alumnes are added to the current list of the assingatura's list of alumnes.
		Actually, the assignatura id is added to the assignatures list attribute of these alumnes.
		In addition, to the corresponding classes of these new alumnes is added the id of this assignatura.
		*/

		// Alumnes
		// --------------------------------------------------------------------

		let updateAlumnesObservables: Observable<any>[] = [];
		let alumneIds: string[] = [];
		let alumnesToAdd: any[] = [];

		// Current list of alumnes (ids) already included in this assignatura
		for (let _alumne of this.alumnes) {
			alumneIds.push(_alumne.id);
		}

		for (let alumne of this.newAlumnes){
			if (alumne.included) { // for checked new alumnes
				if (!alumneIds.includes(alumne.id)) { // if not already included in the official list
					if (alumne.assignatures) {
						if (alumne.assignatures.length > 0) {
							alumne.assignatures.push(this.assignatura.id); // adding the assignatura id to the alumne
						} else {
							alumne.assignatures = [this.assignatura.id]; // adding the assignatura id to the alumne
						}
					} else {
						alumne.assignatures = [this.assignatura.id]; // adding the assignatura id to the alumne
					}
					alumnesToAdd.push(alumne); // this list is used to be pushed into the official list of alumnes
					updateAlumnesObservables.push(this._alumnes.update(alumne)); // add to the queue an update request
				}
			}
		}
		// Making all the requests at once
		Observable.forkJoin(updateAlumnesObservables)
			.subscribe(
				response => {
					for (let newAlumneToAdd of alumnesToAdd) {
						newAlumneToAdd.disabled = true; // disabling checkbox from recently added alumnes in the panel below
						newAlumneToAdd.new = true;
						this.alumnes.push(newAlumneToAdd); // pushing added alumnes to the official list of alumnes
					}
				});

		// Classes
		// --------------------------------------------------------------------

		let updateClassesObservables: Observable<any>[] = [];

		// Check first if the classes to add do not already have the assignatura included
		for (let classe of this.classes) {
			if (classe.included) {
				if (classe.assignatures) {
					// if the assignatura is not already included, proceed to include
					if (!classe.assignatures.includes(this.assignatura.id)) {
						console.log('not included!')
						classe.assignatures.push(this.assignatura.id); // adding the assignatura to the classe
						updateClassesObservables.push(this._classes.update(classe)); // add to the queue an update request
					}
				} else {
					console.log('no assignatures')
					classe.assignatures = [this.assignatura.id];
					updateClassesObservables.push(this._classes.update(classe));
				}
			}
		}
		// Making all the requests at once
		Observable.forkJoin(updateClassesObservables)
			.subscribe();

		setTimeout(()=> {
			this.buildClassesAlumnes();
		}, 1000)

	};


	openModal(event, template: TemplateRef<any>) {
		let id = event.target.parentElement.attributes.id.nodeValue;
		this.alumne = this.alumnes.filter( (alumne) => alumne.id == id)[0];
		console.log(this.alumne);
		this.bsModalRef = this._modalService.show(template);
	};

	deleteAlumneFromAssignatura() { // deleteAlumneFromAssignatura

		/*
		Deletes alumne from current assignatura
		*/

		let alumne = this.alumne;
		let assignatures = this.alumne.assignatures;

		// deletes the assignatura id from the assignatures list of the alumne
		let index = assignatures.indexOf(this.assignatura.id);
		this.alumne.assignatures.splice(index, 1)

		// deletes the alumne from the list of alumnes in the top panel
		index = this.alumnes.indexOf(this.alumne);
		this.alumnes.splice(index, 1);

		// (subject to change) delete all alumnes in lower panel
		this.newAlumnes = [];
		for (let classe of this.classes) {
			classe.included = false;
		}

		// change status of alumne in lower panel
		for (let newAlumne of this.newAlumnes) {
			if (newAlumne.id == this.alumne.id) {
				newAlumne.included = false;
				newAlumne.disabled = false;
				// index = this.newAlumnes.indexOf(newAlumne);
				// this.newAlumnes.splice(index, 1);
			}
		}

		this._alumnes.update(this.alumne) // update request to backend
			.subscribe();

		this.buildClassesAlumnes();

		this.bsModalRef.hide(); // hide the modal
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
		this.subClasses.unsubscribe();
	};

};

