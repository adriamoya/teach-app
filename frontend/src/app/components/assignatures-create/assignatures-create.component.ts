import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';

// Services
import { AlumnesService } from '../../services/alumnes.service';
import { AssignaturesService } from '../../services/assignatures.service';
import { ClassesService } from '../../services/classes.service';

// Interfaces
import { Alumne } from '../../interfaces/alumne.interface';
import { Assignatura } from '../../interfaces/assignatura.interface';
import { Classe } from '../../interfaces/classe.interface';

@Component({
  selector: 'app-assignatures-create',
  templateUrl: './assignatures-create.component.html'
})
export class AssignaturesCreateComponent implements OnDestroy {

	private assignatura: Assignatura = {
		nom: '',
		curs: '2017',
		bio: ''
	};
	private assignaturaId: string;
	private cursos: string[] = ['2017', '2018', '2019', '2020', '2021'];
	private subClasses: any;
	private classes: Classe[];
	private alumnes: Alumne[] = [];

	constructor(
		private _router: Router,
		private _classes: ClassesService,
		private _alumnes: AlumnesService,
		private _assignatures: AssignaturesService) {
		this.subClasses = this._classes.list()
			.subscribe(
				response => {
					// console.log(response);
					this.classes = response;
				}
			)
	};

	onChange(id: string, selectedValue: string) {
		// refreshes any change done in form (even if submit is not triggered)
		// console.log(id);
		// console.log(selectedValue);

		this.subClasses = this._classes.get(id)
			.subscribe(
				response => {
					if (response.alumne_classe.length > 0) {
						
						// Add alumnes
						if (selectedValue) {
							for (let alumne of response.alumne_classe) {
								alumne.included = true;
								this.alumnes.push(alumne);
							}
						}
						// Delete alumnes
						else {
							for (let alumne of response.alumne_classe) {
								let index = 0;
								for (let alumneIncluded of this.alumnes) {
									index += 1;
									if (alumne.id == alumneIncluded.id) {
										this.alumnes.splice(index-1, 1)
									}

								}			
							}
						}
					}
				}
			);
	};

	newAssignatura(){
		console.log(this.assignatura);
		this._assignatures.add(this.assignatura)
			.subscribe(
				response => {
					this.assignaturaId = response.id;
					console.log(this.assignaturaId);

					let getAlumnesObservables: Observable<any>[] = [];
					for (let alumne of this.alumnes) {
						if (alumne.included) {
							getAlumnesObservables.push(this._alumnes.get(alumne.id));
						}
					}

					Observable.forkJoin(getAlumnesObservables)
						.subscribe(dataArray => {

							let updateAlumnesObservables: Observable<any>[] = [];

							console.log(dataArray);

							for (let alumne of dataArray) {

								if (alumne.assignatures.length > 0) {
									alumne.assignatures.push(this.assignaturaId);
								} else {
									alumne.assignatures = [this.assignaturaId];
								}

								updateAlumnesObservables.push(this._alumnes.update(alumne));
							}

							Observable.forkJoin(updateAlumnesObservables)
								.subscribe();


					let getClassesObservables: Observable<any>[] = [];
					for (let classe of this.classes) {
						if (classe.included) {
							getClassesObservables.push(this._classes.get(classe.id));
						}
					}

					Observable.forkJoin(getClassesObservables)
						.subscribe(dataArray => {

							let updateClassesObservables: Observable<any>[] = [];

							console.log(dataArray);

							for (let classe of dataArray) {

								if (classe.assignatures.length > 0) {
									classe.assignatures.push(this.assignaturaId);
								} else {
									classe.assignatures = [this.assignaturaId];
								}

								updateClassesObservables.push(this._classes.update(classe));
							}

							Observable.forkJoin(updateClassesObservables)
								.subscribe();


						this._router.navigate(['/assignatures']);

						// All observables in `observables` array have resolved and `dataArray` is an array of result of each observable
					});






					// Add assignatura to alumnes
					// for (let alumne of this.alumnes) {
					// 	if (alumne.included) {
					// 		this._alumnes.get(alumne.id)
					// 			.subscribe(
					// 				response => {
					// 					let alumneUpdate = response;
					// 					// console.log(alumne);
					// 					if (alumneUpdate.assignatures.length > 0) {
					// 						alumneUpdate.assignatures.push(this.assignaturaId);
					// 					} else {
					// 						alumneUpdate.assignatures = [this.assignaturaId];
					// 					}
					// 					this.updateAlumne(alumneUpdate);
					// 				}
					// 			)
					// 	}
					// }
					// // Add assignatura to classes
					// for (let classe of this.classes) {
					// 	if (classe.included) {
					// 		this._classes.get(classe.id)
					// 			.subscribe(
					// 				response => {
					// 					let classeUpdate = response;
					// 					// console.log(classeUpdate);
					// 					if (classeUpdate.assignatures.length > 0) {
					// 						classeUpdate.assignatures.push(this.assignaturaId);
					// 					} else {
					// 						classeUpdate.assignatures = [this.assignaturaId];
					// 					}
					// 					this.updateClasse(classeUpdate);
					// 				})
					// 	}
					// }

					// setTimeout(() => {
					// 	this._router.navigate(['/assignatures']);
					// }, 1000);
				};
			);
	};

	updateAlumne(alumne: Alumne) {
		console.log(alumne);
		this._alumnes.update(alumne)
			.subscribe(
				response => {
					// console.log(alumne);
					// console.log(alumne.nom, ' updated')
					// console.log(response);
				})
	};

	updateClasse(classe: Classe) {
		console.log(classe);
		this._classes.update(classe)
			.subscribe(
				response => {
					// console.log(classe);
					// console.log(classe.nom, ' updated')
					// console.log(response);
				})
	};

	ngOnDestroy(){
		this.subClasses.unsubscribe();
	};

}
