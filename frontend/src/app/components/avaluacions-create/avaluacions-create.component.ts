import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// Services
import { CursosService } from '../../services/cursos.service';
import { AvaluacionsService } from '../../services/avaluacions.service';
import { AssignaturesService } from '../../services/assignatures.service';

// Interfaces
import { Curs } from '../../interfaces/curs.interface';
import { Avaluacio } from '../../interfaces/avaluacio.interface';
import { Assignatura } from '../../interfaces/assignatura.interface';

// Shared
import compareValues from '../../shared/compare-values';

@Component({
  selector: 'app-avaluacions-create',
  templateUrl: './avaluacions-create.component.html',
  styleUrls: ['./avaluacions-create.component.css']
})
export class AvaluacionsCreateComponent implements OnDestroy {

	private subCursos: any;
	private subAvaluacions: any;
	private subAssignatures: any;
	private cursId: number;
	private cursos: Curs[];
	private assignaturaId: number;
	private assignatures: Assignatura[];
	private assignaturesList: Assignatura[];
	private assignaturaSelected: Assignatura;
	private avaluacionsSelected: Avaluacio[];
	private avaluacio: Avaluacio = {
		nom: "",
		assignatura: null,
	};

	constructor(
		private _router: Router,
		private _cursos: CursosService,
		private _avaluacions: AvaluacionsService,
		private _assignatures: AssignaturesService) {
		this.subCursos = this._cursos.list().subscribe(cursos => {
			cursos = cursos.sort(compareValues('nom'));
			this.cursId = cursos[0]
			this.cursos = cursos
		})
		this.subAssignatures = this._assignatures.list().subscribe(assignatures => {
			assignatures = assignatures.sort(compareValues('nom'));
			this.assignaturesList = assignatures;
		});
	};


	toCurs() {
		this.assignatures = this.assignaturesList
			.filter((assignatura) => assignatura.curs == this.cursId)
	}

	// toAssignatura
	// -----------------------------------------------------
	/*
		Retrieves the assignaturaId from the ngModel (select option) and uses it to
		filter the assignatures data.
	*/
	toAssignatura(){
		// get current assignaturaId selected
		this.assignaturaId = +this.assignaturaId;

		// filter down corresponding assignatura
		this.assignatures.filter(item => {
			if (item.id == this.assignaturaId) {
				this.assignaturaSelected = item;
			};
		});

		// use AssignaturesServer to retrieve the alumnes list corresponding to the assignatura
		// we need to use the get method since points to /assignatures-detail (where the alumnes list is located)
		this.subAvaluacions = this._assignatures.get(this.assignaturaId).subscribe(data => {
			// console.log(data);
			this.avaluacionsSelected = data.assignatura_avaluacions;
			console.log(this.avaluacionsSelected);
		});
	};

	newAvaluacio() {
		let avaluacio: Avaluacio = this.avaluacio;
		console.log(this.avaluacio);
		// this._avaluacions.add(avaluacio)
		// 	.subscribe(
		// 		response => {
		// 			console.log(response);
		// 			this._router.navigate(['/home']);
		// 		});
	}

	ngOnDestroy() {
		this.subCursos.unsubscribe();
 		this.subAssignatures.unsubscribe();
 	}

}
