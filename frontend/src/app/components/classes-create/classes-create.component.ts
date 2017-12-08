import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// Services
import { ClassesService } from '../../services/classes.service';
import { AlumnesService } from '../../services/alumnes.service';

// Interfaces
import { Classe } from '../../interfaces/classe.interface';
import { Alumne } from '../../interfaces/alumne.interface';

@Component({
  selector: 'app-classes-create',
  templateUrl: './classes-create.component.html'
})
export class ClassesCreateComponent implements OnDestroy {

	private classe: Classe = {
		nom: "",
		curs: null
	};
	private alumne: Alumne;
	private alumnes: [any];
	private newAlumne: any = {
		fullName: "",
		included: false
	};
	private subAlumnes: any;
	private cursos: string[] = ['2017', '2018', '2019', '2020', '2021'];
	private ready: boolean = false;

	constructor(
		private _router: Router,
		private _classes: ClassesService,
		private _alumnes: AlumnesService) {
		this.subAlumnes = this._alumnes.list()
			.subscribe(
				response => {
					// console.log(response);
					this.alumnes = response;
					for (let alumne of this.alumnes) {
						alumne.included = false;
						alumne.fullName = alumne.nom + ' ' + alumne.primer_cognom + ' ' + alumne.segon_cognom;
					};
					this.ready = true;
				}
			)
	}

	onChange(id: string, selectedValue: string) {
		// refreshes any change done in form (even if submit is not triggered)
		console.log(id);
		console.log(selectedValue);
	};

	addAlumne() {
		console.log(this.newAlumne);
		this.alumnes.push(this.newAlumne);
		this.newAlumne = {
			fullName: "",
			included: false
		};
	}

	test() {
		console.log(this.alumnes);
	}

	newClasse() {

		this.classe.curs = Number(this.classe.curs);
		let classe = this.classe;

		// Validation
		let includedCount: number = 0;
		for (let alumne of this.alumnes) {
			if (alumne.included == true) {
				includedCount += 1;
			}
		};
		if (includedCount == 0) {
			alert("no alumnes included")
			return false
		};

		// console.log(classe);

		// Create classe and get its id to subsequently add it to each alumne included
		this._classes.add(classe)
			.subscribe(
				response => {
					this.classe.id = response.id;
					// Use classe.id to update or create alumnes associated to that classe
					this.newAlumnes();
					// Navigate to /alumnes
					this._router.navigate(['/alumnes']);
				}
			)

		return true;
	};

	newAlumnes() {
		for (let alumne of this.alumnes) {
			if (alumne.included) {
				if (alumne.id) {
					// Already known alumnes
					this._alumnes.get(alumne.id)
						.subscribe(
							data => {
								this.alumne = data;
								// Validation
								// If we are adding a classe to an existing alumne
								// this means that we are possibly modifying their existing classe
								this.alumne.classe = this.classe.id;
								this._alumnes.update(this.alumne)
									.subscribe(
										response => {
											// console.log(response);
										}
									);
							}
						)
				} else {
					// New alumnes

					let fullNameArray: [string] = alumne.fullName.split(' ');
					if (fullNameArray[0]) {
						alumne.nom = fullNameArray[0];
					} else {
						alumne.nom = '';
					}
					if (fullNameArray[1]) {
						alumne.primer_cognom = fullNameArray[1];
					} else {
						alumne.primer_cognom = '';
					}
					if (fullNameArray[2]) {
						alumne.segon_cognom = fullNameArray[2];
					} else {
						alumne.segon_cognom = '';
					}

					delete alumne.fullName;
					delete alumne.included;

					alumne.classe = this.classe.id;

					this._alumnes.add(alumne)
						.subscribe(
							response => {
								// console.log(response);
							})
				}
			}
		}
	}

	ngOnDestroy() {
		this.subAlumnes.unsubscribe();
	}

}














