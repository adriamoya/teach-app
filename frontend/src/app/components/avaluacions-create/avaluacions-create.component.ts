import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

// Services
import { AvaluacionsService } from '../../services/avaluacions.service';

// Interfaces
import { Avaluacio } from '../../interfaces/avaluacio.interface';
import { Assignatura } from '../../interfaces/assignatura.interface';

@Component({
  selector: 'app-avaluacions-create',
  templateUrl: './avaluacions-create.component.html'
})
export class AvaluacionsCreateComponent implements OnDestroy {

	private subAvaluacions: any;
	private subAssignatures: any;
	private assignaturaId: number;
	private assignatures: Assignatura[];
	private avaluacio: Avaluacio = {
		nom: "",
		assignatura: null,
	}

	constructor(
		private _router: Router,
		private _avaluacions: AvaluacionsService) {
		this.subAssignatures = this._assignatures.list().subscribe(data => {
			this.assignatures = data;
		});
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
			// console.log(this.alumnesSelected);
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
 		this.subAssignatures.unsubscribe();
 	}

}
