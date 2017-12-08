import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'

// Services
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
	private cursos: string[] = ['2017', '2018', '2019', '2020', '2021'];
	private subClasses: any;
	private classes: Classe[];
	private alumnes: Alumne[] = [];

	constructor(
		private _router: Router,
		private _classes: ClassesService,
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
					console.log(response.id);
					this._router.navigate(['/assignatures']);
				}
			);
	};

	test() {
		console.log(this.classes);
		console.log(this.alumnes);
	}

	ngOnDestroy(){
		this.subClasses.unsubscribe();
	}

}
