import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SlicePipe } from '@angular/common';

import { AssignaturesService } from '../../services/assignatures.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-assignatures-detail',
  templateUrl: './assignatures-detail.component.html',
  styleUrls: ['./assignatures-detail.component.css'],
  providers: [AssignaturesService]
})

export class AssignaturesDetailComponent implements OnInit, OnDestroy {

	// CREATE A NEW COMPONENT FOR THE LINECHART

	public routeSub: any;
	public reqAssignatures: any;
	assignatura: any;
	id: string;

	public proves: any;
	public alumnes: any;

	constructor(
		public _route: ActivatedRoute,
		public _router: Router,
		public _assignatures: AssignaturesService) {
	};

	ngOnInit() {

		this.routeSub = this._route.params.subscribe(params => {
			this.id = params['id'];
			this.reqAssignatures = this._assignatures.get(this.id)
				.subscribe(
					data => {
						this.assignatura = data;

						// Nota mitja de cada prova (do this in backend)
						// ----------------------------------------------
						let alumnes = [];
						let proves = [];

						for (var i in data.proves_assignatura) {

							var puntuacions = [];
							var prova = data.proves_assignatura[i];
							for (var j in prova.notes_prova) {

								var puntuacio = prova.notes_prova[j]
								puntuacions.push(puntuacio.nota)
								alumnes.push({
									"id": puntuacio.alumne.id,
									"nom": puntuacio.alumne.nom + " " + puntuacio.alumne.primer_cognom + " " + puntuacio.alumne.segon_cognom,
									"url": puntuacio.alumne.url_detail,
									"puntuacio": puntuacio.nota
								});
							}
							// Calcul nota promig
							var avg: any;
							if (puntuacions.length >0) {
								var sum = 0;
								for (var k = 0; k < puntuacions.length; k++) {
									sum += puntuacions[k];
								}
								avg = sum/puntuacions.length;
							} else {
								avg = null;
							}
							proves.push({
								"id": prova.id,
								"nom": prova.nom,
								"data": prova.data,
								"puntuacio_promig": avg,
								"puntuacio_total": prova.nota_total
							})
						}
						this.proves = proves;

						// Select distinct de alumnes
						// ----------------------------------------------
						var select_distinct = function(array) {
							var flags = [], output = [];
							for (var i = 0; i < array.length; i++) {
								if (flags[array[i].id]) continue;
								flags[array[i].id] = true;
								output.push(array[i]);
							}
							return output;
						};

						this.alumnes = select_distinct(alumnes);
						//console.log(this.alumnes);

					},
					error => {
						// this routing should be based off of the error-status
						// possibly incorporated within the _service
						this._router.navigate(['login'])
					});
		});
	};

	// important to unsubscribe (destroy) after using subscribe ...
	ngOnDestroy() {
		this.routeSub.unsubscribe();
		this.reqAssignatures.unsubscribe();
	};
}
