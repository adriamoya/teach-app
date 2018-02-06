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

import * as _ from "lodash";

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
	private dimensions_list: any[]=[];
	private dimensio_avaluacio: any = {};
	private dimensioSelected: any = {};
	private alumnes: any[];

	private oneAtATime: boolean = true;
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
									classes[0].open=true;
									this.classes = classes;
								}
							)

						// initiate proves and alumnes for first avaluacio

						if (this.assignatura.assignatura_avaluacions.length > 0 ) {
							let avaluacio = this.assignatura.assignatura_avaluacions

							let dimensions = avaluacio[0].dimensions_avaluacio;
							let dimensions_avaluacio: any[] = [];


							// Dimensio Total Avaluacio
							for (let dimensio of dimensions) {
								if (dimensio.nom == "Total") {

									// deep copy of dimensio total to assign subdimensions to dimensions_avaluacio obj
									// we want to have independence in terms of collapsing dimensions between the Total and other dimensions
									let newDimensio= _.cloneDeep(dimensio);
									if (newDimensio.subdimensions) {
										for (let subdimensio of newDimensio.subdimensions) {
											dimensions_avaluacio.push(subdimensio);
										}
									}

									// create ordering in subdimensions of Total Avaluacio
									this.dimensio_avaluacio = dimensio;
									this.dimensio_avaluacio.order = 1;
									this.dimensio_avaluacio.toggle = true;
									this.dimensio_avaluacio.collapsed = true;
									this.i = 1;
									if (this.dimensio_avaluacio.subdimensions) {
										this.dimensio_avaluacio.subdimensions.sort(compareValues('id'))
										for (let subdimensio of this.dimensio_avaluacio.subdimensions) {
											if (subdimensio.subdimensions) {
												subdimensio.subdimensions.sort(compareValues('id'))
												for (let subsubdimensio of subdimensio.subdimensions) {
													this.i = this.i + 1;
													subsubdimensio.subdimensions = [];	// delete third level subdimensions in Total Avaluacio detail
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
								}
							}
							this.dimensions = dimensions_avaluacio;
						};

						// create ordering among sub and subsubdimensions
						this.dimensions.sort(compareValues('id'));
						this.i = 1;
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
						};

						// create a list with all dimensions and subdimensions (info table)
						for (let dimensio of this.dimensions) {
							dimensio.level = 1;
							this.dimensions_list.push(dimensio);
							if (dimensio.subdimensions) {
								for (let subdimensio of dimensio.subdimensions) {
									subdimensio.level = 2;
									this.dimensions_list.push(subdimensio);
									if (subdimensio.subdimensions) {
										for (let subsubdimensio of subdimensio.subdimensions) {
											subsubdimensio.level = 3;
											this.dimensions_list.push(subsubdimensio);
										}
									}
								}
							}
						}

						this.dimensio_avaluacio.level = 1;
						this.dimensions_list.push(this.dimensio_avaluacio);

						console.log(this.dimensions_list);

						// initiate chart with total avaluacio
						this.dimensioSelected = this.dimensio_avaluacio;
	
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
		// When a dimensio is clicked, if it has subdimensions, they are added to or removed from the table

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

	onChangeDimensio(event) {
		// When clicking in dimensions tabs
		this.dimensioSelected = {};
		if (event.heading == 'Total') {

			this.dimensioSelected = this.dimensio_avaluacio;

		} else {
			let assignatura = this.dimensions.filter((dimensio) => dimensio.id == event.id)[0];
			this.dimensioSelected = Object.assign({}, assignatura);
			
		}
		// console.log(this.dimensioSelected);
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
		// console.log(this.dimensions);

	};

	// important to unsubscribe (destroy) after using subscribe ...
	ngOnDestroy() {
		this.subRoute.unsubscribe();
		this.subCurs.unsubscribe();
		this.subAssignatura.unsubscribe();
	};
}