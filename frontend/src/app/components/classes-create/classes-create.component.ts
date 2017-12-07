import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

// Services
import { AlumnesService } from '../../services/alumnes.service';

// Interfaces
import { Classe } from '../../interfaces/classe.interface';
import { Alumne } from '../../interfaces/alumne.interface';

@Component({
  selector: 'app-classes-create',
  templateUrl: './classes-create.component.html'
})
export class ClassesCreateComponent implements OnInit {

	private classe: Classe = {
		nom: "",
		curs: null,
		assignatures: [],
		alumnes: []
	};
	private alumnes: [any];
	private newAlumne: any = {
		fullName: "",
		included: true
	};
	private subAlumnes: any;
	private cursos: string[] = ['2017', '2018', '2019', '2020', '2021'];
	private ready: boolean = false;

	constructor(
		private _alumnes: AlumnesService) {
		this.subAlumnes = this._alumnes.list()
			.subscribe(
				response => {
					// console.log(response);
					this.alumnes = response;
					for (let alumne of this.alumnes) {
						alumne.included = false;
						alumne.fullName = alumne.nom + ' ' + alumne.primer_cognom + ' ' + alumne.segon_cognom;
					}
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
			included: true
		};
	}

	test() {
		console.log(this.alumnes);
	}

	ngOnInit() {
		console.log(this.alumnes);
	}

}
