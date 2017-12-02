import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

// Services
import { ProvesService } from '../../services/proves.service';
import { AssignaturesService } from '../../services/assignatures.service';

// Interfaces
import { Prova } from '../../interfaces/prova.interface';

@Component({
  selector: 'app-proves-create',
  templateUrl: './proves-create.component.html',
  styleUrls: ['./proves-create.component.css'],
  providers: [AssignaturesService]
})
export class ProvesCreateComponent implements OnDestroy {

	private prova: Prova = {
		nom: '',
		continguts: ['Prova'],
		data: '',
		nota_total: 10,
		pes_total: null,
		assignatura: ''
	};
	private req: any;
	private req_alumnes: any;
	private assignatures: [any];
	private assignaturaId: number;
	private assignaturaSelected: any;
	private alumnesSelected: [any];
	private continguts_avaluats: string;
	private cursos: string[] = ['2017', '2018', '2019', '2020', '2021'];

	constructor(
		private _proves: ProvesService,
		private _assignatures: AssignaturesService) {
		this.req = this._assignatures.list().subscribe(data => {
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
		this.req_alumnes = this._assignatures.get(this.assignaturaId).subscribe(data => {
			console.log(data);
			this.alumnesSelected = data.alumne_assignatures;
			// console.log(this.alumnesSelected);
		});
	};

	newProva(){
		console.log(this.prova);
		// this._proves.add(this.prova)
		// 	.subscribe(
		// 		response => {
		// 			console.log(response);
		// 		}
		// 	)
	}

	ngOnDestroy() {
		this.req.unsubscribe()
		// this.req_alumnes.unsubscribe();
	};

}
