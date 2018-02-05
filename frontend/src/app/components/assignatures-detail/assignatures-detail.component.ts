import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SlicePipe } from '@angular/common';

// Services
import { CursosService } from '../../services/cursos.service';
import { AssignaturesService } from '../../services/assignatures.service';

// Interfaces
import { Curs } from '../../interfaces/curs.interface';
import { Alumne } from '../../interfaces/alumne.interface';
import { Assignatura } from '../../interfaces/assignatura.interface';

// Shared
import compareValues from '../../shared/compare-values';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-assignatures-detail',
  templateUrl: './assignatures-detail.component.html',
  styleUrls: ['./assignatures-detail.component.css'],
})

export class AssignaturesDetailComponent implements OnDestroy {

	// CREATE A NEW COMPONENT FOR THE LINECHART
	private i: number;
	private subRoute: any;
	private subAssignatura: any;
	private subCurs: any;

	private assignatura: any;
	private assignaturaId: string;
	private curs: Curs;
	private classes: any[];
	private dimensions: any[]=[];
	private dimensio_avaluacio: any = {};
	private dimensioSelected: any = {};
	private alumnes: any[];

	private html: string = `<span>El conjunt de les proves d'aquesta avaluació <strong>no</strong> suma 100%</span>`;

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
						data.assignatura_avaluacions.sort(compareValues('id'));

						// sorting alumnes
						data.alumne_assignatures.sort(compareValues('nom'));
						this.assignatura = data;
						this.alumnes = data.alumne_assignatures;
						this.subCurs = this._cursos.get(data.curs)
							.subscribe(
								curs => {
									curs.curs_classes.sort(compareValues('nom'));
									for (let classe of curs.curs_classes) {
										classe.alumne_classe.sort(compareValues('nom'))
									}
									this.assignatura.curs = curs.nom;
									
									// discard alumnes not included in assignatura
									let classes = curs.curs_classes;
									for (let classe of classes) {
										for (let alumne of classe.alumne_classe) {
											let filteredAlumne = this.assignatura.alumne_assignatures.filter((alumne_assignatura) => alumne_assignatura.id == alumne.id)
											if (filteredAlumne.length==0) {
												// Exclude alumne
												let index = classe.alumne_classe.indexOf(alumne);
												classe.alumne_classe.splice(index, 1);
											}
										}
									}
									this.classes = classes;
								}
							)

						// initiate proves and alumnes for first avaluacio

						if (this.assignatura.assignatura_avaluacions.length > 0 ) {
							let avaluacio = this.assignatura.assignatura_avaluacions

							let dimensions = avaluacio[0].dimensions_avaluacio;

							let dimensions_avaluacio: any[] = [];

							for (let dimensio of dimensions) {
								if (dimensio.nom == "Total avaluacio") {
									this.dimensio_avaluacio = dimensio;
								} else {
									dimensions_avaluacio.push(dimensio);
								}
							}
							this.dimensions = dimensions_avaluacio;
						}

						// create ordering among sub and subsubdimensions
						this.dimensions.sort(compareValues('id'));
						this.i = 0;
						for (let dimensio of this.dimensions){
							if (dimensio.subdimensions) {
								dimensio.subdimensions.sort(compareValues('id'))
								for (let subdimensio of dimensio.subdimensions) {
									if (subdimensio.subdimensions) {
										subdimensio.subdimensions.sort(compareValues('id'))
										for (let subsubdimensio of subdimensio.subdimensions) {
											this.i = this.i + 1;
											subsubdimensio.order = this.i;
											subsubdimensio.toggle = true;
											subsubdimensio.collapsed = true;
										}
									}
									this.i = this.i + 1;
									subdimensio.order = this.i;
									subdimensio.toggle = true;
									subdimensio.collapsed = true;
								}
							}
							this.i = this.i + 1;
							dimensio.order = this.i;
							dimensio.toggle = true;
							dimensio.collapsed = true;
						}


						console.log(this.assignatura);
						// console.log(this.proves);
						console.log(this.dimensions);
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

	clickDimensio(event) {
		// console.log(event);
		// console.log(event.target.id);
		// console.log(this.dimensioSelected);
		let subdimensioSelected = this.dimensioSelected.subdimensions.filter((subdimensio) => subdimensio.id == event.target.id)[0];

		if (subdimensioSelected.collapsed == true) {
			subdimensioSelected.collapsed = false
			// Show
			if (subdimensioSelected.subdimensions) {
				for (let subsubdimensio of subdimensioSelected.subdimensions) {
					subsubdimensio.toggle = false;
					this.dimensioSelected.subdimensions.push(subsubdimensio)
				}
			}

		} else {
			subdimensioSelected.collapsed = true
			// Hide
			if (subdimensioSelected.subdimensions) {
				for (let subsubdimensio of subdimensioSelected.subdimensions) {
					let index = this.dimensioSelected.subdimensions.indexOf(subsubdimensio);
					this.dimensioSelected.subdimensions.splice(index, 1)
				}
			}

		}

		this.dimensioSelected.subdimensions.sort(compareValues('order'))
		// console.log(this.dimensioSelected.subdimensions);

	}


	isCollapsed: boolean = false;

	collapsed(event: any): void {
		console.log(event);
	}

	expanded(event: any): void {
		console.log(event);
	}

	toggle(event) {
		console.log(event);
		// $('#col_total').toggleClass('col-0 col-6');
		// $('#col_content').toggleClass('col-10 col-6');
	}

	onChangeDimensio(event) {
		let assignatura = this.dimensions.filter((dimensio) => dimensio.id == event.id)[0];
		this.dimensioSelected = Object.assign({}, this.dimensioSelected , assignatura );
		// this.dimensioSelected.subdimensions.sort(compareValues('id'));
		// this.dimensioSelected = this.dimensions.filter((dimensio) => dimensio.id == event.id)[0];
		console.log(this.dimensioSelected);
		console.log(this.classes);
	}

	onChangeAvaluacio(event) {

		let avaluacioId = event.target.selectedOptions["0"].id;
		let avaluacio = this.assignatura.assignatura_avaluacions
						.filter((avaluacio) => avaluacio.id == avaluacioId);


		let dimensions = avaluacio[0].dimensions_avaluacio;
		console.log(dimensions);

		let dimensions_avaluacio: any[] = [];

		for (let dimensio of dimensions) {
			if (dimensio.nom == "Total avaluacio") {
				this.dimensio_avaluacio = dimensio;
			} else {
				dimensions_avaluacio.push(dimensio);
			}
		}
		this.dimensions = dimensions_avaluacio;
		console.log(this.dimensions);

	};

	// important to unsubscribe (destroy) after using subscribe ...
	ngOnDestroy() {
		this.subRoute.unsubscribe();
		this.subCurs.unsubscribe();
		this.subAssignatura.unsubscribe();
	};
}