import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SlicePipe } from '@angular/common';

// Services
import { CursosService } from '../../services/cursos.service';
import { AssignaturesService } from '../../services/assignatures.service';

// Interfaces
import { Curs } from '../../interfaces/curs.interfaces';
import { Alumne } from '../../interfaces/alumne.interfaces';
import { Assignatura } from '../../interfaces/assignatura.interfaces';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-assignatures-detail',
  templateUrl: './assignatures-detail.component.html',
  styleUrls: ['./assignatures-detail.component.css'],
})

export class AssignaturesDetailComponent implements OnInit, OnDestroy {

	// CREATE A NEW COMPONENT FOR THE LINECHART

	private subRoute: any;
	private subAssignatura: any;
	private subCurs: any;

	private assignatura: Assignatura;
	private assignaturaId: string;
	private curs: Curs;
	private proves: any[]=[];
	private alumnes: any[];

	constructor(
		public _route: ActivatedRoute,
		public _router: Router,
		public _cursos: CursosService,
		public _assignatures: AssignaturesService) {
		this.subRoute = this._route.params.subscribe(params => {
			this.assignaturaId = params['id'];
			this.subAssignatura = this._assignatures.get(this.assignaturaId)
				.subscribe(
					data => {
						// sorting avaluacions
						data.assignatura_avaluacions.sort(this.compareValues('id'));
						// sorting proves
						for (let avaluacio of data.assignatura_avaluacions) {
							avaluacio.proves_avaluacio.sort(this.compareValues('id'));
						}
						// sorting alumnes
						data.alumne_assignatures.sort(this.compareValues('nom'));
						this.assignatura = data;
						this.alumnes = data.alumne_assignatures;
						this.subCurs = this._cursos.get(data.curs)
										.subscribe(
											curs => {
												this.assignatura.curs = curs.nom;
											}
										)

						console.log(data);
						// console.log(this.assignatura);
						// console.log(this.proves);
						// console.log(this.alumnes);
					},
					error => {
						console.error('error')
						// this routing should be based off of the error-status
						// possibly incorporated within the _service
						this._router.navigate(['login'])
					});
		});
	
	};


	// function for dynamic sorting
	compareValues(key, order='asc') {
		return (a, b) {
			if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
				// property doesn't exist on either object
				return 0; 
			}

			const varA = (typeof a[key] === 'string') ? 
			a[key].toUpperCase() : a[key];
			const varB = (typeof b[key] === 'string') ? 
			b[key].toUpperCase() : b[key];

			let comparison = 0;
			if (varA > varB) {
				comparison = 1;
			} else if (varA < varB) {
				comparison = -1;
			}
			return (
				(order == 'desc') ? (comparison * -1) : comparison
			);
		};
	};

	onChangeAvaluacio(event) {
		let avaluacioId = event.target.id;
		let avaluacio = this.assignatura.assignatura_avaluacions
						.filter((avaluacio) => avaluacio.id == avaluacioId);
		this.proves = avaluacio[0].proves_avaluacio;
		console.log(this.proves);

	};

	// important to unsubscribe (destroy) after using subscribe ...
	ngOnDestroy() {
		this.subRoute.unsubscribe();
		this.subCurs.unsubscribe();
		this.subAssignatura.unsubscribe();
	};
}



// // Select distinct de alumnes
// // ----------------------------------------------
// var select_distinct = function(array) {
// var flags = [], output = [];
// for (var i = 0; i < array.length; i++) {
// 	if (flags[array[i].id]) continue;
// 	flags[array[i].id] = true;
// 	output.push(array[i]);
// }
// return output;
// };

// this.alumnes = select_distinct(alumnes);
// //console.log(this.alumnes);
