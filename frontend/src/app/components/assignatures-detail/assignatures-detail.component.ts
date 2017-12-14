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

	private subRoute: any;
	private subAssignatura: any;
	private subCurs: any;

	private assignatura: any;
	private assignaturaId: string;
	private curs: Curs;
	private classes: any[];
	private proves: any[]=[];
	private prova_avaluacio: any = {};
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
						// sorting proves
						for (let avaluacio of data.assignatura_avaluacions) {
							avaluacio.proves_avaluacio.sort(compareValues('id'));
						}
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
							let proves = avaluacio[0].proves_avaluacio;

							let proves_avaluacio: any[] = [];

							for (let prova of proves) {
								if (prova.nom == "Total avaluacio") {
									this.prova_avaluacio = prova;
								} else {
									proves_avaluacio.push(prova);
								}
							}
							this.proves = proves_avaluacio;
						}


						console.log(this.assignatura);
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

	onChangeAvaluacio(event) {
		let avaluacioId = event.target.id;
		let avaluacio = this.assignatura.assignatura_avaluacions
						.filter((avaluacio) => avaluacio.id == avaluacioId);

		let proves = avaluacio[0].proves_avaluacio;
		console.log(proves);

		let proves_avaluacio: any[] = [];

		for (let prova of proves) {
			if (prova.nom == "Total avaluacio") {
				this.prova_avaluacio = prova;
			} else {
				proves_avaluacio.push(prova);
			}
		}
		this.proves = proves_avaluacio;

	};

	// important to unsubscribe (destroy) after using subscribe ...
	ngOnDestroy() {
		this.subRoute.unsubscribe();
		this.subCurs.unsubscribe();
		this.subAssignatura.unsubscribe();
	};
}