import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'

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

					// Add assignatura to alumnes
					for (let alumne of this.alumnes) {
						if (alumne.included) {
							this._alumnes.get(alumne.id)
								.subscribe(
									response => {
										let alumneUpdate = response;
										// console.log(alumne);
										if (alumneUpdate.assignatures.length > 0) {
											alumneUpdate.assignatures.push(this.assignaturaId);
										} else {
											alumneUpdate.assignatures = [this.assignaturaId];
										}
										this.updateAlumne(alumneUpdate);
									}
								)
						}
					}
					// Add assignatura to classes
					for (let classe of this.classes) {
						if (classe.included) {
							this._classes.get(classe.id)
								.subscribe(
									response => {
										let classeUpdate = response;
										// console.log(classeUpdate);
										if (classeUpdate.assignatures.length > 0) {
											classeUpdate.assignatures.push(this.assignaturaId);
										} else {
											classeUpdate.assignatures = [this.assignaturaId];
										}
										this.updateClasse(classeUpdate);
									})
						}
					}
					this._router.navigate(['/assignatures']);
				}
			);
	};

	updateAlumne(alumne: Alumne) {
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
