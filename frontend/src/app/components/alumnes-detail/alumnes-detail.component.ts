import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

// services
import { AlumnesService } from '../../services/alumnes.service';
import { AssignaturesService } from '../../services/assignatures.service';

@Component({
  selector: 'app-alumnes-detail',
  templateUrl: './alumnes-detail.component.html'
})
export class AlumnesDetailComponent implements OnInit {

	private routeSub: any;
	private req: any;
	private alumne: any;
	private id: string;
	private ready: boolean = false;

	constructor(
		private _alumnes: AlumnesService,
		private _assignatures: AssignaturesService,
		private _route: ActivatedRoute, 
		private _http: Http) { }

	

	ngOnInit() {
		this.routeSub = this._route.params.subscribe(params => {
			this.id = params['id'];
		});

		if (this.id) {
			this._alumnes.get(this.id).subscribe(alumne => {
				console.log(alumne);
				this.alumne = alumne;

				for (let assignatura of alumne.assignatures) {
					console.log(assignatura);
					let assign = this.getAssignatures(assignatura);
					console.log(assign);
				}

				// let assignatures = this.getAssignatures(alumne);
			})
		};	
	};

	getAssignatures(assignaturaId: string) {
		let pes_total: number = 0;
		let nota_total: number = 0;
		this._assignatures.get(assignaturaId).subscribe(assignatura => {
			console.log(assignatura);

			for (let prova of assignatura.proves_assignatura) {
				pes_total += prova.pes_total;
				for (let nota of prova.notes_prova) {
					if (nota.alumne.id == this.alumne.id) {
						nota_total += prova.pes_total*nota.nota/prova.nota_total;
					} else {
						prova.notes_prova.pop(nota);
					}
				}
			}

			nota_total = nota_total/pes_total*10;
			assignatura.nota_total = nota_total;
			assignatura.pes_total = pes_total;
			console.log(assignatura);

			return assignatura;
		});
	};

		/*
			this._http.get('assets/json/alumnes-detail.json').subscribe(data => {
				data.json().filter(item => {
					// console.log(item);
					if (item.id == this.id) {
						// console.log(item);
						this.alumne = item;

						// Counting the # of proves per assignatura
						for (var i in this.alumne.assignatures) {
							this.alumne.assignatures[i].proves.count = this.alumne.assignatures[i].proves.length;
						}

						// Calculating the final puntuacio
						for (var i in this.alumne.assignatures) {

							this.alumne.assignatures[i].pes_total = 0;
							for (var j in this.alumne.assignatures[i].proves) {
								if (j < this.alumne.assignatures[i].proves.length) { // until n-1
									var prova = this.alumne.assignatures[i].proves[j]
									this.alumne.assignatures[i].pes_total += prova.pes_nota;
								}
							}

							this.alumne.assignatures[i].nota_total_temp = 0;
							for (var j in this.alumne.assignatures[i].proves) {
								if (j < this.alumne.assignatures[i].proves.length) { // until n-1
									var prova = this.alumne.assignatures[i].proves[j]
									this.alumne.assignatures[i].nota_total_temp += prova.pes_nota*prova.puntuacio/prova.puntuacio_total;
								}
							}
							
							this.alumne.assignatures[i].nota_total = this.alumne.assignatures[i].nota_total_temp/this.alumne.assignatures[i].pes_total*10;
							delete this.alumne.assignatures[i].nota_total_temp;
						}
						
						// ready to render
						this.ready = true;
					}
				})
			})
		})
		*/

	ngOnDestroy() {
		this.routeSub.unsubscribe();
		// this.req.unsubscribe();
	};

}

