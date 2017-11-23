import { Component, OnInit } from '@angular/core';
import { AssignaturesService } from '../../services/assignatures.service';

@Component({
  selector: 'app-proves-create',
  templateUrl: './proves-create.component.html',
  styleUrls: ['./proves-create.component.css'],
  providers: [AssignaturesService]
})
export class ProvesCreateComponent implements OnInit {

	prova: any;
	req: any;
	req_alumnes: any;
	assignatures: [any];
	assignaturaId: number;
	assignaturaSelected: any;
	alumnesSelected: [any];
	puntuacioMax: number = 10;
	continguts_avaluats: string;

	constructor(private _assignatures: AssignaturesService) { }

	ngOnInit() {

		this.req = this._assignatures.list().subscribe(data => {
			this.assignatures = data;
		});
	};

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
				// console.log(item);
				this.assignaturaSelected = item;
			};
		});

		// use AssignaturesServer to retrieve the alumnes list corresponding to the assignatura
		// we need to use the get method since points to /assignatures-detail (where the alumnes list is located)
		this.req_alumnes = this._assignatures.get(this.assignaturaId).subscribe(data => {
			this.alumnesSelected = data.alumnes;
			// console.log(this.alumnesSelected);
		});
	};

	ngOnDestroy() {
		this.req.unsubscribe()
		// this.req_alumnes.unsubscribe();
	};

}
